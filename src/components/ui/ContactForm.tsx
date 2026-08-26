"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";

import { contact } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "That doesn't look like an email address — check for a typo.";
  if (values.message.trim().length < 10)
    errors.message = "A sentence or two about the role would help.";
  return errors;
}

/**
 * Composes the message into the sender's own mail client rather than posting
 * to a server.
 *
 * That is a deliberate choice, not a shortcut: a hosted form needs an API key
 * in the deployment, a spam story, and a place for messages to be silently
 * lost when the key rotates. Handing a fully-drafted email to the sender's own
 * client means the message lands in their Sent folder, Jatin can reply from
 * his real inbox, and there is no credential to leak. The UI says exactly what
 * will happen before it happens.
 */
export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const set = (field: keyof typeof values) => (value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: keyof typeof values) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(found).length > 0) {
      // Move the user to the first thing that needs fixing.
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.focus();
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 max-w-xl">
      <Field
        id="contact-name"
        label="Your name"
        value={values.name}
        onChange={set("name")}
        onBlur={blur("name")}
        error={touched.name ? errors.name : undefined}
        autoComplete="name"
      />
      <Field
        id="contact-email"
        label="Your email"
        type="email"
        inputMode="email"
        value={values.email}
        onChange={set("email")}
        onBlur={blur("email")}
        error={touched.email ? errors.email : undefined}
        autoComplete="email"
      />
      <Field
        id="contact-message"
        label="What's the role, or the question?"
        value={values.message}
        onChange={set("message")}
        onBlur={blur("message")}
        error={touched.message ? errors.message : undefined}
        multiline
        help="Enough detail that the first reply can be useful."
      />

      <button
        type="submit"
        className="mt-7 inline-flex min-h-[52px] items-center gap-2.5 rounded-card bg-accent-solid px-7 text-base font-medium text-accent-on transition-opacity hover:opacity-90"
      >
        {sent ? "Opened in your mail app" : "Compose the email"}
        <Send aria-hidden size={16} strokeWidth={1.8} />
      </button>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        This opens your own email client with the message drafted — nothing is
        sent through this site, and nothing is stored here.
      </p>

      <p ref={statusRef} aria-live="polite" className="sr-only">
        {sent ? "Your email client has been opened with the message drafted." : ""}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  multiline,
  help,
  type = "text",
  inputMode,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  multiline?: boolean;
  help?: string;
  type?: string;
  inputMode?: "email" | "text";
  autoComplete?: string;
}) {
  const describedBy =
    [error ? `${id}-error` : null, help ? `${id}-help` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const shared = {
    id,
    value,
    onBlur,
    "aria-invalid": Boolean(error),
    "data-invalid": Boolean(error),
    "aria-describedby": describedBy,
    autoComplete,
    className: cn(
      "mt-2 w-full rounded-card border bg-ground px-4 py-3 text-base text-text",
      "placeholder:text-muted focus-visible:border-accent",
      error ? "border-signature/70" : "border-edge",
    ),
  };

  return (
    <div className="mt-6 first:mt-0">
      <label htmlFor={id} className="u-mono text-2xs uppercase tracking-[0.24em] text-muted">
        {label}
      </label>

      {multiline ? (
        <textarea
          {...shared}
          rows={5}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          {...shared}
          type={type}
          inputMode={inputMode}
          onChange={(event) => onChange(event.target.value)}
        />
      )}

      {help && !error && (
        <p id={`${id}-help`} className="mt-2 text-xs text-muted">
          {help}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-text">
          {error}
        </p>
      )}
    </div>
  );
}

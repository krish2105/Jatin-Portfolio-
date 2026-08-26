import { Nav } from "@/components/ui/Nav";
import { SkipLink } from "@/components/ui/SkipLink";
import { Footer } from "@/components/ui/Footer";

import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { TwoStacks } from "@/components/sections/TwoStacks";
import { Ledger } from "@/components/sections/Ledger";
import { Builds } from "@/components/sections/Builds";
import { Record } from "@/components/sections/Record";
import { Now } from "@/components/sections/Now";
import { Contact } from "@/components/sections/Contact";

/* The sequence is the argument: who he is, what he uses, the duality that is
   his actual differentiator, the record behind it, then how to reach him. */
export default function Page() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main">
        <Hero />
        <Ticker />
        <TwoStacks />
        <Ledger />
        <Builds />
        <Record />
        <Now />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

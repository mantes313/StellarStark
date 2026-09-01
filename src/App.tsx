import { useState } from "react";
import "./styles/global.css";
import { LanguageProvider } from "./i18n/LanguageContext";
import { useDeploySweep } from "./hooks/useDeploySweep";
import { DeployBar } from "./components/DeployBar";
import { LangToggle } from "./components/LangToggle";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Demo } from "./components/Demo";
import { Work } from "./components/Work";
import { Care } from "./components/Care";
import { Contact, type BuilderHandoff } from "./components/Contact";
import { Footer } from "./components/Footer";

function Page() {
  const { deployBarRef, triggerDeploySweep } = useDeploySweep();
  const [builderHandoff, setBuilderHandoff] = useState<BuilderHandoff | null>(null);

  return (
    <>
      <DeployBar deployBarRef={deployBarRef} />
      <LangToggle />
      <Nav />
      <Hero />
      <Services onDeploy={triggerDeploySweep} onBuilderSubmit={setBuilderHandoff} />
      <Demo onDeploy={triggerDeploySweep} />
      <Work />
      <Care />
      <Contact handoff={builderHandoff} />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}

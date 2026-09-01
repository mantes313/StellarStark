import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { translations, type Dictionary, type Language } from "./translations";

const STORAGE_KEY = "ss-lang";

function readStoredLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "lt" ? "lt" : "en";
  } catch {
    return "en";
  }
}

interface LanguageContextValue {
  lang: Language;
  t: Dictionary;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    const dict = translations[lang];
    document.documentElement.lang = lang;
    document.title = dict.pageTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", dict.metaDesc);

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // storage unavailable, ignore
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: translations[lang],
      toggleLanguage: () => setLang((current) => (current === "en" ? "lt" : "en"))
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

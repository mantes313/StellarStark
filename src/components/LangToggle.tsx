import "./LangToggle.css";
import { useLanguage } from "../i18n/LanguageContext";

export function LangToggle() {
  const { lang, t, toggleLanguage } = useLanguage();
  const targetLang = lang === "en" ? "lt" : "en";

  return (
    <button
      className="lang-toggle"
      type="button"
      onClick={toggleLanguage}
      aria-label={t.langToggleAria}
      title={targetLang === "lt" ? "Lietuvių" : "English"}
    >
      <span>{targetLang.toUpperCase()}</span>
    </button>
  );
}

import { useLocale, type Language } from "../i18n";

export function LanguageSwitch() {
  const { language, setLanguage, copy } = useLocale();

  return (
    <div className="language-switch" role="group" aria-label={copy.languageLabel}>
      {(["en", "ru"] as Language[]).map((option) => (
        <button
          className={language === option ? "is-active" : ""}
          type="button"
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
          key={option}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

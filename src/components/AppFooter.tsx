import { useLocale } from "../i18n";

type AppFooterProps = {
  safetyNote?: string;
};

export function AppFooter({ safetyNote }: AppFooterProps) {
  const { copy } = useLocale();

  return (
    <footer className="app-footer">
      {safetyNote && <p>{safetyNote}</p>}
      <div className="app-footer__links">
        <a href="/privacy">{copy.privacyLink}</a>
        <a href="https://tinygods.dev/" target="_blank" rel="noreferrer">
          {copy.createdBy} Tiny Gods
        </a>
      </div>
    </footer>
  );
}

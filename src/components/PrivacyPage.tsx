import { useLocale } from "../i18n";
import { GitHubIcon } from "./Icons";
import { LanguageSwitch } from "./LanguageSwitch";
import "./privacy.css";

export function PrivacyPage() {
  const { copy } = useLocale();

  return (
    <main className="privacy-page">
      <header className="privacy-header">
        <a
          className="brand privacy-brand"
          href="/"
          aria-label={copy.landingHomeAria}
        >
          <span className="brand__mark">7</span>
          <span>{copy.brandMinutes}</span>
        </a>
        <div className="privacy-header__actions">
          <LanguageSwitch />
          <a href="/app">{copy.privacyOpenApp}</a>
        </div>
      </header>

      <article className="privacy-document">
        <a className="privacy-back" href="/">
          ← {copy.privacyBackHome}
        </a>
        <p className="privacy-kicker">{copy.privacyKicker}</p>
        <h1>{copy.privacyTitle}</h1>
        <p className="privacy-updated">{copy.privacyUpdated}</p>
        <p className="privacy-intro">{copy.privacyIntro}</p>

        <div className="privacy-sections">
          <section>
            <h2>{copy.privacyLocalTitle}</h2>
            <p>{copy.privacyLocalBody}</p>
          </section>

          <section>
            <h2>{copy.privacyAnalyticsTitle}</h2>
            <p>{copy.privacyAnalyticsBody}</p>
          </section>

          <section>
            <h2>{copy.privacyHostingTitle}</h2>
            <p>{copy.privacyHostingBody}</p>
            <a
              href="https://railway.com/legal/privacy"
              target="_blank"
              rel="noreferrer"
            >
              {copy.privacyRailwayLink} ↗
            </a>
          </section>

          <section>
            <h2>{copy.privacyLinksTitle}</h2>
            <p>{copy.privacyLinksBody}</p>
          </section>

          <section>
            <h2>{copy.privacyControlTitle}</h2>
            <p>{copy.privacyControlBody}</p>
          </section>

          <section>
            <h2>{copy.privacyChangesTitle}</h2>
            <p>{copy.privacyChangesBody}</p>
          </section>

          <section>
            <h2>{copy.privacyContactTitle}</h2>
            <p>{copy.privacyContactBody}</p>
            <a
              href="https://tally.so/r/9q6l0Y"
              target="_blank"
              rel="noreferrer"
            >
              {copy.privacyContactLink} ↗
            </a>
          </section>
        </div>
      </article>

      <footer className="privacy-footer">
        <span>{copy.landingFooter}</span>
        <div className="privacy-footer__links">
          <a href="https://tinygods.dev/" target="_blank" rel="noreferrer">
            Tiny Gods
          </a>
          <a
            className="privacy-footer__github"
            href="https://github.com/tinygodsdev/7min"
            target="_blank"
            rel="noreferrer"
            aria-label={copy.repositoryLinkLabel}
            title={copy.repositoryLinkLabel}
          >
            <GitHubIcon size={18} />
          </a>
        </div>
      </footer>
    </main>
  );
}

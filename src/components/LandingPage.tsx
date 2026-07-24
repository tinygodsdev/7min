import { useState } from "react";
import { exerciseById, getExerciseText } from "../data/exercises";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import { useLocale } from "../i18n";
import { ExerciseArt } from "./ExerciseArt";
import { GitHubIcon, GripIcon, SoundIcon } from "./Icons";
import { LanguageSwitch } from "./LanguageSwitch";
import { ProgressRing } from "./ProgressRing";
import "./landing.css";

const previewExercises = [
  exerciseById.get("jumping-jacks")!,
  exerciseById.get("wall-sit")!,
  exerciseById.get("push-ups")!,
  exerciseById.get("plank")!,
];

function InstallButton({
  className = "",
  label,
  onClick,
}: {
  className?: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`landing-install-button ${className}`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export function LandingPage() {
  const { language, copy } = useLocale();
  const heroExercise = previewExercises[0];
  const heroExerciseText = getExerciseText(heroExercise, language);
  const { canInstall, installed, install } = useInstallPrompt();
  const [showInstructions, setShowInstructions] = useState(false);
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const installLabel = installed ? copy.landingOpenApp : copy.landingInstall;

  const handleInstall = async () => {
    if (installed) {
      window.location.assign("/app");
      return;
    }
    if (canInstall) {
      await install();
      return;
    }
    setShowInstructions(true);
  };

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <header className="landing-header">
          <a className="brand landing-brand" href="/" aria-label={copy.landingHomeAria}>
            <span className="brand__mark">7</span>
            <span>{copy.brandMinutes}</span>
          </a>
          <div className="landing-header__actions">
            <LanguageSwitch />
            <a className="landing-header__app-link" href="/app">
              {copy.landingOpenApp}
            </a>
          </div>
        </header>

        <div className="landing-hero__content">
          <div className="landing-hero__copy">
            <p className="landing-kicker">{copy.landingFree}</p>
            <h1>{copy.landingHeroTitleLineOne}<br />{copy.landingHeroTitleLineTwo}</h1>
            <p className="landing-hero__lead">{copy.landingHeroLead}</p>
            <div className="landing-actions">
              <InstallButton label={installLabel} onClick={() => void handleInstall()} />
              <a className="landing-text-link" href="/app">
                {copy.landingGoToWorkout}
              </a>
            </div>
            <p className="landing-private-note">{copy.landingPrivate}</p>
          </div>

          <div className="landing-visual" aria-label={copy.landingWorkoutScreen}>
            <div className="landing-orbit landing-orbit--one" />
            <div className="landing-orbit landing-orbit--two" />
            <article className="landing-phone">
              <div className="landing-phone__top">
                <span>{copy.landingOneOfTwelve}</span>
                <span className="landing-phone__sound"><SoundIcon size={16} /></span>
              </div>
              <div className="landing-phone__progress"><span /></div>
              <ExerciseArt exercise={heroExercise} className="landing-phone__art" />
              <div className="landing-phone__bottom">
                <div>
                  <p>{copy.workoutNow}</p>
                  <h2>{heroExerciseText.shortName}</h2>
                </div>
                <ProgressRing progress={0.2}>
                  <strong>24</strong>
                  <span>{copy.workoutSeconds}</span>
                </ProgressRing>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="landing-details">
        <div className="landing-section-heading">
          <p className="landing-kicker">{copy.landingDuring}</p>
          <h2>{copy.landingVisibleTitle}</h2>
          <p>{copy.landingVisibleBody}</p>
        </div>

        <div className="landing-feature-grid">
          <article className="landing-feature landing-feature--sound">
            <div className="landing-sound-visual" aria-hidden="true">
              <span className="landing-sound-visual__circle"><SoundIcon size={28} /></span>
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div>
              <p className="landing-kicker">{copy.landingSignals}</p>
              <h3>{copy.landingSignalsTitle}</h3>
              <p>{copy.landingSignalsBody}</p>
            </div>
          </article>

          <article className="landing-feature landing-feature--history">
            <div className="landing-history-visual" aria-label={copy.landingHistoryAria}>
              {Array.from({ length: 30 }, (_, index) => (
                <span
                  className={[3, 8, 14, 20, 25, 29].includes(index) ? "is-complete" : ""}
                  key={index}
                />
              ))}
            </div>
            <div>
              <p className="landing-kicker">{copy.landingHistory}</p>
              <h3>{copy.landingHistoryTitle}</h3>
              <p>{copy.landingHistoryBody}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="landing-concept">
        <div className="landing-concept__method">
          <p className="landing-kicker">{copy.landingConceptKicker}</p>
          <h2>{copy.landingConceptTitle}</h2>
          <p>{copy.landingConceptBody}</p>
          <p>{copy.landingConceptTiming}</p>
          <p className="landing-concept__safety">{copy.landingConceptSafety}</p>
        </div>
        <article className="landing-evidence">
          <p className="landing-kicker">{copy.landingEvidenceKicker}</p>
          <h3>{copy.landingEvidenceTitle}</h3>
          <p>{copy.landingEvidenceBody}</p>
          <p className="landing-evidence__scope">{copy.landingEvidenceScope}</p>
          <div className="landing-evidence__links">
            <a
              href="https://doi.org/10.1249/FIT.0b013e31828cb1e8"
              target="_blank"
              rel="noreferrer"
            >
              {copy.landingOriginalStudy}
            </a>
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9367756/"
              target="_blank"
              rel="noreferrer"
            >
              {copy.landingMetaAnalysis}
            </a>
          </div>
        </article>
      </section>

      <section className="landing-program">
        <div className="landing-program__preview" aria-label={copy.landingProgramAria}>
          {previewExercises.map((exercise, index) => {
            const exerciseText = getExerciseText(exercise, language);
            return (
              <div className="landing-program-row" key={exercise.id}>
                <span className="landing-program-row__grip"><GripIcon /></span>
                <ExerciseArt exercise={exercise} />
                <strong>{exerciseText.shortName}</strong>
                <span className={`landing-switch ${index === 2 ? "" : "is-on"}`} />
              </div>
            );
          })}
        </div>
        <div className="landing-program__copy">
          <p className="landing-kicker">{copy.landingSequence}</p>
          <h2>{copy.landingSequenceTitle}</h2>
          <p>{copy.landingSequenceBody}</p>
          <a className="landing-text-link" href="/app">
            {copy.landingConfigure}
          </a>
        </div>
      </section>

      <section className="landing-final">
        <div>
          <p className="landing-kicker">{copy.landingFinalMeta}</p>
          <h2>{copy.landingFinalTitle}</h2>
          <p>{copy.landingFinalBody}</p>
        </div>
        <div className="landing-final__actions">
          <InstallButton
            className="landing-install-button--light"
            label={installLabel}
            onClick={() => void handleInstall()}
          />
          <a className="landing-final__app-link" href="/app">{copy.landingOpenApp}</a>
        </div>
      </section>

      <footer className="landing-footer">
        <a className="brand landing-brand" href="/">
          <span className="brand__mark">7</span>
          <span>{copy.brandMinutes}</span>
        </a>
        <div className="landing-footer__meta">
          <p>{copy.landingFooter}</p>
          <a href="/privacy">{copy.privacyLink}</a>
          <a href="https://tinygods.dev/" target="_blank" rel="noreferrer">
            Tiny Gods
          </a>
          <a
            className="landing-footer__github"
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

      {showInstructions && (
        <div
          className="install-dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowInstructions(false);
          }}
        >
          <section
            className="install-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-dialog-title"
          >
            <button
              className="install-dialog__close"
              type="button"
              onClick={() => setShowInstructions(false)}
              aria-label={copy.commonClose}
            >
              ×
            </button>
            <span className="brand__mark" aria-hidden="true">7</span>
            <h2 id="install-dialog-title">{copy.landingInstallTitle}</h2>
            <p>
              {isIOS
                ? copy.landingInstallIOS
                : copy.landingInstallOther}
            </p>
            <a className="landing-link-button" href="/app">
              {copy.landingOpenWithoutInstall}
            </a>
          </section>
        </div>
      )}
    </main>
  );
}

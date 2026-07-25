import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import {
  exerciseById,
  exercises,
  getExerciseText,
  type Exercise,
} from "../data/exercises";
import type { SoundLevel } from "../hooks/useWorkoutAudio";
import { useLocale } from "../i18n";
import { GripIcon, SoundIcon } from "./Icons";
import { AppFooter } from "./AppFooter";
import { ExerciseArt } from "./ExerciseArt";

export type ProgramItem = {
  id: string;
  enabled: boolean;
};

type ProgramEditorProps = {
  program: ProgramItem[];
  onChange: (program: ProgramItem[]) => void;
  onReset: () => void;
  onClose: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  soundLevel: SoundLevel;
  onSoundLevelChange: (level: SoundLevel) => void;
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
  voiceLevel: SoundLevel;
  onVoiceLevelChange: (level: SoundLevel) => void;
  onPreviewSound: () => void;
  onPreviewVoice: () => void;
};

export function ProgramEditor({
  program,
  onChange,
  onReset,
  onClose,
  soundEnabled,
  onSoundToggle,
  soundLevel,
  onSoundLevelChange,
  voiceEnabled,
  onVoiceToggle,
  voiceLevel,
  onVoiceLevelChange,
  onPreviewSound,
  onPreviewVoice,
}: ProgramEditorProps) {
  const { language, copy } = useLocale();
  const draggingIdRef = useRef<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const includedIds = new Set(program.map((item) => item.id));
  const availableExtras = exercises.filter(
    (exercise) => exercise.extra && !includedIds.has(exercise.id),
  );

  const move = (index: number, offset: -1 | 1) => {
    const destination = index + offset;
    if (destination < 0 || destination >= program.length) return;
    const nextProgram = [...program];
    [nextProgram[index], nextProgram[destination]] = [
      nextProgram[destination],
      nextProgram[index],
    ];
    onChange(nextProgram);
  };

  const moveTo = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    const sourceIndex = program.findIndex((item) => item.id === sourceId);
    const targetIndex = program.findIndex((item) => item.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;

    const nextProgram = [...program];
    const [movedItem] = nextProgram.splice(sourceIndex, 1);
    nextProgram.splice(targetIndex, 0, movedItem);
    onChange(nextProgram);
  };

  const startDragging = (event: PointerEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingIdRef.current = id;
    setDraggingId(id);
  };

  const continueDragging = (event: PointerEvent<HTMLButtonElement>) => {
    const sourceId = draggingIdRef.current;
    if (!sourceId) return;
    event.preventDefault();

    if (event.clientY < 80) {
      window.scrollBy({ top: -12 });
    } else if (event.clientY > window.innerHeight - 80) {
      window.scrollBy({ top: 12 });
    }

    const target = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLElement>("[data-program-id]");
    const targetId = target?.dataset.programId;
    if (targetId) moveTo(sourceId, targetId);
  };

  const stopDragging = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    draggingIdRef.current = null;
    setDraggingId(null);
  };

  const moveWithKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      move(index, -1);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(index, 1);
    }
  };

  const toggle = (id: string) => {
    onChange(
      program.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const add = (exercise: Exercise) => {
    onChange([...program, { id: exercise.id, enabled: true }]);
  };

  const removeExtra = (id: string) => {
    onChange(program.filter((item) => item.id !== id));
  };

  return (
    <main className="editor-page">
      <header className="page-header">
        <button className="text-button" type="button" onClick={onClose}>
          {copy.editorDone}
        </button>
        <div>
          <p className="eyebrow">{copy.editorSetup}</p>
          <h1>{copy.editorProgram}</h1>
        </div>
        <button className="text-button text-button--muted" type="button" onClick={onReset}>
          {copy.editorReset}
        </button>
      </header>

      <section className="editor-section audio-settings" aria-labelledby="audio-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.editorAudio}</p>
            <h2 id="audio-heading">{copy.editorAudioTitle}</h2>
            <p>{copy.editorAudioHelp}</p>
          </div>
        </div>

        <div className="audio-settings__card">
          <div className="audio-setting-row">
            <div>
              <strong>{copy.editorSoundEnabled}</strong>
              <span>{copy.editorSoundEnabledHelp}</span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={onSoundToggle}
                aria-label={copy.editorSoundEnabled}
              />
              <span className="switch__track" />
            </label>
          </div>

          <div className="audio-setting-row audio-setting-row--volume">
            <div>
              <strong>{copy.editorSignalVolume}</strong>
              <span>{copy.editorSignalVolumeHelp}</span>
            </div>
            <div className="volume-options" role="group" aria-label={copy.editorSignalVolume}>
              {(
                [
                  ["normal", copy.editorVolumeNormal],
                  ["loud", copy.editorVolumeLoud],
                  ["extra-loud", copy.editorVolumeExtraLoud],
                ] as const
              ).map(([level, label]) => (
                <button
                  className={soundLevel === level ? "is-active" : ""}
                  type="button"
                  key={level}
                  onClick={() => onSoundLevelChange(level)}
                  aria-pressed={soundLevel === level}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="audio-setting-row">
            <div>
              <strong>{copy.editorVoiceEnabled}</strong>
              <span>{copy.editorVoiceEnabledHelp}</span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={voiceEnabled}
                onChange={onVoiceToggle}
                aria-label={copy.editorVoiceEnabled}
              />
              <span className="switch__track" />
            </label>
          </div>

          <div className="audio-setting-row audio-setting-row--volume">
            <div>
              <strong>{copy.editorVoiceVolume}</strong>
              <span>{copy.editorVoiceVolumeHelp}</span>
            </div>
            <div className="volume-options" role="group" aria-label={copy.editorVoiceVolume}>
              {(
                [
                  ["normal", copy.editorVolumeNormal],
                  ["loud", copy.editorVolumeLoud],
                  ["extra-loud", copy.editorVolumeExtraLoud],
                ] as const
              ).map(([level, label]) => (
                <button
                  className={voiceLevel === level ? "is-active" : ""}
                  type="button"
                  key={level}
                  onClick={() => onVoiceLevelChange(level)}
                  aria-pressed={voiceLevel === level}
                  disabled={!soundEnabled || !voiceEnabled}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="audio-preview-actions">
            <button
              className="audio-preview-button"
              type="button"
              onClick={onPreviewSound}
              disabled={!soundEnabled}
            >
              <SoundIcon size={18} />
              {copy.editorPreviewSound}
            </button>
            <button
              className="audio-preview-button"
              type="button"
              onClick={onPreviewVoice}
              disabled={!soundEnabled || !voiceEnabled}
            >
              <SoundIcon size={18} />
              {copy.editorPreviewVoice}
            </button>
          </div>
        </div>
      </section>

      <section className="editor-section" aria-labelledby="program-heading">
        <div className="section-heading">
          <div>
            <h2 id="program-heading">{copy.editorOrder}</h2>
            <p>{copy.editorOrderHelp}</p>
          </div>
        </div>

        <ol className="exercise-list">
          {program.map((item, index) => {
            const exercise = exerciseById.get(item.id);
            if (!exercise) return null;
            const exerciseText = getExerciseText(exercise, language);

            return (
              <li
                className={`exercise-row ${item.enabled ? "" : "exercise-row--disabled"} ${draggingId === item.id ? "exercise-row--dragging" : ""}`}
                data-program-id={item.id}
                key={item.id}
              >
                <button
                  type="button"
                  className="drag-handle"
                  aria-label={`${exerciseText.name}. ${copy.editorMoveHint}`}
                  onPointerDown={(event) => startDragging(event, item.id)}
                  onPointerMove={continueDragging}
                  onPointerUp={stopDragging}
                  onPointerCancel={stopDragging}
                  onKeyDown={(event) => moveWithKeyboard(event, index)}
                >
                  <GripIcon />
                </button>
                <ExerciseArt exercise={exercise} className="exercise-row__art" />
                <div className="exercise-row__body">
                  <strong>{exerciseText.shortName}</strong>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={item.enabled} onChange={() => toggle(item.id)} aria-label={`${copy.editorInclude}: ${exerciseText.name}`} />
                  <span className="switch__track" />
                </label>
                {exercise.extra && (
                  <button className="remove-button" type="button" onClick={() => removeExtra(item.id)} aria-label={`${copy.editorRemove}: ${exerciseText.name}`}>
                    ×
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {availableExtras.length > 0 && (
        <section className="editor-section library" aria-labelledby="library-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{copy.editorAdditional}</p>
              <h2 id="library-heading">{copy.editorLibrary}</h2>
            </div>
          </div>
          <div className="library-grid">
            {availableExtras.map((exercise) => {
              const exerciseText = getExerciseText(exercise, language);
              return (
                <article className="library-card" key={exercise.id}>
                  <ExerciseArt exercise={exercise} className="library-card__art" />
                  <div>
                    <h3>{exerciseText.shortName}</h3>
                    <p>{exerciseText.cue}</p>
                  </div>
                  <button type="button" className="secondary-button" onClick={() => add(exercise)}>
                    {copy.editorAdd}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <AppFooter />
    </main>
  );
}

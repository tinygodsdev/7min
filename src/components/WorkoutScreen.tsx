import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getExerciseText, type Exercise } from "../data/exercises";
import { buildWorkout, getIntervalAtElapsed } from "../lib/workout";
import { useWakeLock } from "../hooks/useWakeLock";
import { formatExerciseCount, useLocale } from "../i18n";
import { ExerciseArt } from "./ExerciseArt";
import { PauseIcon, PlayIcon, SkipIcon } from "./Icons";
import { ProgressRing } from "./ProgressRing";
import { SoundButton } from "./SoundButton";

type WorkoutStatus = "running" | "paused" | "complete";

type WorkoutScreenProps = {
  exercises: Exercise[];
  soundEnabled: boolean;
  onSoundToggle: () => void;
  prepareAudio: (exerciseIds?: string[]) => Promise<void>;
  playAudio: (cue: "prepare" | "exercise" | "rest" | "tick" | "complete") => void;
  playVoice: (exerciseId: string, delaySeconds?: number) => void;
  onFinish: (durationSeconds: number) => void;
  onExit: () => void;
};

export function WorkoutScreen({
  exercises,
  soundEnabled,
  onSoundToggle,
  prepareAudio,
  playAudio,
  playVoice,
  onFinish,
  onExit,
}: WorkoutScreenProps) {
  const { language, copy } = useLocale();
  const intervals = useMemo(() => buildWorkout(exercises), [exercises]);
  const totalDurationMs = useMemo(
    () => intervals.reduce((sum, interval) => sum + interval.durationMs, 0),
    [intervals],
  );
  const [status, setStatus] = useState<WorkoutStatus>("running");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  const [pausedDurationMs, setPausedDurationMs] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const completedRef = useRef(false);
  const lastIntervalCueRef = useRef(-1);
  const lastTickRef = useRef("");
  const lastVoiceRef = useRef("");

  useWakeLock(status === "running");

  useEffect(() => {
    if (status !== "running") return;
    const timer = window.setInterval(() => setNow(Date.now()), 100);
    return () => window.clearInterval(timer);
  }, [status]);

  const effectiveNow = status === "paused" && pausedAt !== null ? pausedAt : now;
  const elapsedMs = Math.min(
    totalDurationMs,
    Math.max(0, effectiveNow - startedAt - pausedDurationMs),
  );
  const { intervalIndex, intervalElapsedMs, intervalStartMs } = getIntervalAtElapsed(
    intervals,
    elapsedMs,
  );
  const interval = intervals[intervalIndex];
  const remainingMs = Math.max(0, interval.durationMs - intervalElapsedMs);
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const intervalProgress = intervalElapsedMs / interval.durationMs;
  const overallProgress = totalDurationMs === 0 ? 0 : elapsedMs / totalDurationMs;
  const exerciseNumber = intervals
    .slice(0, intervalIndex + 1)
    .filter((candidate) => candidate.type === "exercise").length;

  useEffect(() => {
    if (status !== "running") return;
    if (lastIntervalCueRef.current === intervalIndex) return;
    lastIntervalCueRef.current = intervalIndex;
    playAudio(interval.type);
  }, [interval.type, intervalIndex, playAudio, status]);

  useEffect(() => {
    const tickThreshold = interval.type === "prepare" ? 2 : 3;
    if (
      status !== "running" ||
      remainingSeconds > tickThreshold ||
      remainingSeconds < 1
    ) {
      return;
    }
    const tickKey = `${intervalIndex}-${remainingSeconds}`;
    if (lastTickRef.current === tickKey) return;
    lastTickRef.current = tickKey;
    playAudio("tick");
  }, [interval.type, intervalIndex, playAudio, remainingSeconds, status]);

  useEffect(() => {
    if (status !== "running") return;
    const shouldAnnounce =
      (interval.type === "prepare" && remainingSeconds === 5) ||
      (interval.type === "rest" && remainingSeconds === 5);
    const nextExercise =
      interval.type === "prepare" ? interval.exercise : interval.nextExercise;
    if (!shouldAnnounce || !nextExercise) return;
    const voiceKey = `${intervalIndex}-${nextExercise.id}`;
    if (lastVoiceRef.current === voiceKey) return;
    lastVoiceRef.current = voiceKey;
    playVoice(nextExercise.id, interval.type === "prepare" ? 0.52 : 0);
  }, [interval, intervalIndex, playVoice, remainingSeconds, status]);

  useEffect(() => {
    if (elapsedMs < totalDurationMs || completedRef.current) return;
    completedRef.current = true;
    setStatus("complete");
    playAudio("complete");
    onFinish(Math.round(totalDurationMs / 1000));
  }, [elapsedMs, onFinish, playAudio, totalDurationMs]);

  const togglePause = async () => {
    if (status === "running") {
      const pauseTime = Date.now();
      setNow(pauseTime);
      setPausedAt(pauseTime);
      setStatus("paused");
      return;
    }

    if (status === "paused" && pausedAt !== null) {
      await prepareAudio();
      const resumeTime = Date.now();
      setPausedDurationMs((duration) => duration + resumeTime - pausedAt);
      setPausedAt(null);
      setNow(resumeTime);
      setStatus("running");
    }
  };

  const skip = useCallback(() => {
    const nextIntervalStartMs = intervalStartMs + interval.durationMs;
    const shiftMs = nextIntervalStartMs - elapsedMs;
    setStartedAt((value) => value - shiftMs);
    setNow(Date.now());
  }, [elapsedMs, interval.durationMs, intervalStartMs]);

  if (status === "complete") {
    return (
      <main className="complete-page">
        <div className="complete-mark" aria-hidden="true">✓</div>
        <p className="eyebrow">{copy.workoutComplete}</p>
        <h1>{formatExerciseCount(exercises.length, language)}</h1>
        <p>{copy.workoutSaved}</p>
        <button className="primary-button" type="button" onClick={onExit}>
          {copy.workoutHome}
        </button>
      </main>
    );
  }

  const shownExercise =
    interval.type === "exercise" ? interval.exercise : interval.nextExercise;
  const shownExerciseText = shownExercise
    ? getExerciseText(shownExercise, language)
    : undefined;

  return (
    <main className={`workout-page workout-page--${interval.type}`}>
      <header className="workout-header">
        <button className="text-button text-button--muted" type="button" onClick={onExit}>
          {copy.workoutClose}
        </button>
        <div className="overall-progress" aria-label={`${copy.workoutOverallProgress} ${Math.round(overallProgress * 100)}%`}>
          <span style={{ width: `${overallProgress * 100}%` }} />
        </div>
        <SoundButton compact enabled={soundEnabled} onToggle={onSoundToggle} />
      </header>

      <section className="workout-stage">
        <div className="workout-stage__meta">
          <span>
            {interval.type === "exercise"
              ? `${copy.workoutExercise} ${exerciseNumber} ${copy.workoutOf} ${exercises.length}`
              : interval.type === "prepare"
                ? copy.workoutPrepare
                : copy.workoutBreak}
          </span>
          <span>{Math.round(overallProgress * 100)}%</span>
        </div>

        {shownExercise && (
          <ExerciseArt exercise={shownExercise} className={interval.type === "rest" ? "workout-art workout-art--rest" : "workout-art"} />
        )}

        <div className="workout-title" aria-live="polite">
          <p className="eyebrow">
            {interval.type === "exercise"
              ? copy.workoutNow
              : interval.type === "prepare"
                ? copy.workoutFirst
                : copy.workoutNext}
          </p>
          <h1>{shownExerciseText?.name}</h1>
          <p>
            {interval.type === "exercise"
              ? shownExerciseText?.cue
              : interval.type === "prepare"
                ? copy.workoutStartingSoon
                : copy.workoutGetReady}
          </p>
        </div>

        <ProgressRing progress={intervalProgress}>
          <strong>{remainingSeconds}</strong>
          <span>{copy.workoutSeconds}</span>
        </ProgressRing>
      </section>

      <footer className="workout-controls">
        <button className="control-button control-button--main" type="button" onClick={togglePause}>
          {status === "running" ? <PauseIcon /> : <PlayIcon />}
          <span>{status === "running" ? copy.workoutPause : copy.workoutContinue}</span>
        </button>
        <button className="control-button" type="button" onClick={skip}>
          <SkipIcon />
          <span>{copy.workoutSkip}</span>
        </button>
      </footer>
    </main>
  );
}

import { useMemo } from "react";
import { formatDuration, getWorkoutDurationSeconds } from "../lib/workout";
import { getExerciseText, type Exercise } from "../data/exercises";
import type { WorkoutHistoryItem } from "../App";
import {
  formatExerciseCount,
  formatWorkoutCount,
  useLocale,
} from "../i18n";
import { ExerciseArt } from "./ExerciseArt";
import { AppFooter } from "./AppFooter";
import { LanguageSwitch } from "./LanguageSwitch";
import { SoundButton } from "./SoundButton";

type HomeScreenProps = {
  activeExercises: Exercise[];
  soundEnabled: boolean;
  onSoundToggle: () => void;
  onStart: () => void;
  onEdit: () => void;
  history: WorkoutHistoryItem[];
};

type HistoryDay = {
  key: string;
  date: Date;
  workouts: WorkoutHistoryItem[];
};

function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function HomeScreen({
  activeExercises,
  soundEnabled,
  onSoundToggle,
  onStart,
  onEdit,
  history,
}: HomeScreenProps) {
  const { language, copy } = useLocale();
  const duration = getWorkoutDurationSeconds(activeExercises.length);
  const historyDays = useMemo<HistoryDay[]>(() => {
    const workoutsByDay = new Map<string, WorkoutHistoryItem[]>();
    history.forEach((item) => {
      const key = toLocalDateKey(new Date(item.completedAt));
      const workouts = workoutsByDay.get(key) ?? [];
      workouts.push(item);
      workoutsByDay.set(key, workouts);
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: 30 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (29 - index));
      const key = toLocalDateKey(date);
      return { key, date, workouts: workoutsByDay.get(key) ?? [] };
    });
  }, [history]);
  const recentWorkoutCount = historyDays.reduce(
    (count, day) => count + day.workouts.length,
    0,
  );
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(language, {
        weekday: "short",
        day: "numeric",
        month: "long",
      }),
    [language],
  );

  return (
    <main className="home-page">
      <header className="app-header">
        <div className="brand">
          <span className="brand__mark">7</span>
          <span>{copy.brandMinutes}</span>
        </div>
        <div className="app-header__actions">
          <LanguageSwitch />
          <SoundButton enabled={soundEnabled} onToggle={onSoundToggle} />
        </div>
      </header>

      <section className="start-card">
        <div className="start-card__copy">
          <p className="eyebrow">{copy.homeToday}</p>
          <h1>
            {activeExercises.length > 0
              ? formatExerciseCount(activeExercises.length, language)
              : copy.homeEmptyTitle}
          </h1>
          <p>
            {activeExercises.length > 0
              ? `${formatDuration(duration)} · ${copy.homeMeta}`
              : copy.homeEmptyText}
          </p>
        </div>
        <button
          className="start-button"
          type="button"
          onClick={onStart}
          disabled={activeExercises.length === 0}
        >
          <span>{copy.homeStart}</span>
          <small>{copy.homeWorkout}</small>
        </button>
      </section>

      <section className="content-section" aria-labelledby="workout-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.homeCurrentProgram}</p>
            <h2 id="workout-heading">{copy.homeExercises}</h2>
          </div>
          <button className="text-button" type="button" onClick={onEdit}>
            {copy.homeEdit}
          </button>
        </div>
        <div className="exercise-strip">
          {activeExercises.slice(0, 6).map((exercise, index) => {
            const exerciseText = getExerciseText(exercise, language);
            return (
              <article className="exercise-preview" key={exercise.id}>
                <div className="exercise-preview__index">{index + 1}</div>
                <ExerciseArt exercise={exercise} />
                <span>{exerciseText.shortName}</span>
              </article>
            );
          })}
          {activeExercises.length > 6 && (
            <button className="exercise-preview exercise-preview--more" type="button" onClick={onEdit}>
              <strong>+{activeExercises.length - 6}</strong>
              <span>{copy.homeShowAll}</span>
            </button>
          )}
        </div>
      </section>

      <section className="content-section history-section" aria-labelledby="history-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.homeRecent}</p>
            <h2 id="history-heading">{copy.homeHistory}</h2>
          </div>
          <span className="history-summary">
            {recentWorkoutCount > 0
              ? language === "en"
                ? `${formatWorkoutCount(recentWorkoutCount, language)} in 30 days`
                : `${formatWorkoutCount(recentWorkoutCount, language)} за 30 дней`
              : copy.homeThirtyDays}
          </span>
        </div>
        <div className="history-calendar" aria-label={copy.homeHistoryAria}>
          {historyDays.map((day) => {
            const completed = day.workouts.length > 0;
            const tooltip = completed
              ? `${dateFormatter.format(day.date)} · ${formatWorkoutCount(day.workouts.length, language)}`
              : `${dateFormatter.format(day.date)} · ${copy.homeNoWorkout}`;
            return (
              <button
                className={`history-day ${completed ? "history-day--completed" : ""}`}
                type="button"
                key={day.key}
                data-tooltip={tooltip}
                aria-label={tooltip}
              >
                <span>{day.date.getDate()}</span>
              </button>
            );
          })}
        </div>
      </section>

      <AppFooter safetyNote={copy.homeSafety} />
    </main>
  );
}

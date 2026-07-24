import type { Exercise } from "../data/exercises";

export const EXERCISE_SECONDS = 30;
export const REST_SECONDS = 10;

export type WorkoutInterval = {
  type: "exercise" | "rest";
  durationMs: number;
  exercise: Exercise;
  nextExercise?: Exercise;
};

export function buildWorkout(exercises: Exercise[]): WorkoutInterval[] {
  return exercises.flatMap((exercise, index) => {
    const exerciseInterval: WorkoutInterval = {
      type: "exercise",
      durationMs: EXERCISE_SECONDS * 1000,
      exercise,
    };

    if (index === exercises.length - 1) {
      return [exerciseInterval];
    }

    return [
      exerciseInterval,
      {
        type: "rest",
        durationMs: REST_SECONDS * 1000,
        exercise,
        nextExercise: exercises[index + 1],
      },
    ];
  });
}

export function getWorkoutDurationSeconds(exerciseCount: number): number {
  if (exerciseCount === 0) return 0;
  return exerciseCount * EXERCISE_SECONDS + (exerciseCount - 1) * REST_SECONDS;
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function getIntervalAtElapsed(
  intervals: WorkoutInterval[],
  elapsedMs: number,
): { intervalIndex: number; intervalElapsedMs: number; intervalStartMs: number } {
  let intervalStartMs = 0;

  for (let intervalIndex = 0; intervalIndex < intervals.length; intervalIndex += 1) {
    const interval = intervals[intervalIndex];
    const intervalEndMs = intervalStartMs + interval.durationMs;
    if (elapsedMs < intervalEndMs) {
      return {
        intervalIndex,
        intervalElapsedMs: Math.max(0, elapsedMs - intervalStartMs),
        intervalStartMs,
      };
    }
    intervalStartMs = intervalEndMs;
  }

  return {
    intervalIndex: intervals.length - 1,
    intervalElapsedMs: intervals.at(-1)?.durationMs ?? 0,
    intervalStartMs: Math.max(0, intervalStartMs - (intervals.at(-1)?.durationMs ?? 0)),
  };
}

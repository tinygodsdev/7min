import type { Exercise } from "../data/exercises";

export const EXERCISE_SECONDS = 30;
export const REST_SECONDS = 10;
export const PREPARE_SECONDS = 5;

export type WorkoutInterval = {
  type: "prepare" | "exercise" | "rest";
  durationMs: number;
  exercise: Exercise;
  nextExercise?: Exercise;
};

export function buildWorkout(exercises: Exercise[]): WorkoutInterval[] {
  if (exercises.length === 0) return [];

  const exerciseIntervals = exercises.flatMap<WorkoutInterval>((exercise, index) => {
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

  return [
    {
      type: "prepare",
      durationMs: PREPARE_SECONDS * 1000,
      exercise: exercises[0],
      nextExercise: exercises[0],
    },
    ...exerciseIntervals,
  ];
}

export function getWorkoutDurationSeconds(exerciseCount: number): number {
  if (exerciseCount === 0) return 0;
  return (
    PREPARE_SECONDS +
    exerciseCount * EXERCISE_SECONDS +
    (exerciseCount - 1) * REST_SECONDS
  );
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

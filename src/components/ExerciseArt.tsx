import { getExerciseText, type Exercise } from "../data/exercises";
import { useLocale } from "../i18n";

type ExerciseArtProps = {
  exercise: Exercise;
  className?: string;
};

export function ExerciseArt({ exercise, className = "" }: ExerciseArtProps) {
  const { language, copy } = useLocale();
  const exerciseText = getExerciseText(exercise, language);
  const column = exercise.spriteIndex % 4;
  const row = Math.floor(exercise.spriteIndex / 4);
  const spriteScale = 4.08;
  const scaledCell = spriteScale / 4;
  const crop = (scaledCell - 1) / 2;
  const positionForCell = (cell: number) =>
    ((cell * scaledCell + crop) / (spriteScale - 1)) * 100;

  return (
    <div
      className={`exercise-art ${className}`}
      role="img"
      aria-label={`${copy.exerciseIllustration} “${exerciseText.name}”`}
      style={{
        backgroundPosition: `${positionForCell(column)}% ${positionForCell(row)}%`,
      }}
    />
  );
}

export type Exercise = {
  id: string;
  name: string;
  shortName: string;
  cue: string;
  english: {
    name: string;
    shortName: string;
    cue: string;
  };
  spriteIndex: number;
  extra?: boolean;
};

export const exercises: Exercise[] = [
  {
    id: "jumping-jacks",
    name: "Прыжки с разведением рук и ног",
    shortName: "Прыжки",
    cue: "Двигайтесь в удобном темпе и мягко приземляйтесь.",
    english: {
      name: "Jumping jacks",
      shortName: "Jumping jacks",
      cue: "Move at a comfortable pace and land softly.",
    },
    spriteIndex: 0,
  },
  {
    id: "wall-sit",
    name: "Стульчик у стены",
    shortName: "Стульчик",
    cue: "Прижмите спину к стене, колени держите над стопами.",
    english: {
      name: "Wall sit",
      shortName: "Wall sit",
      cue: "Keep your back against the wall and your knees above your feet.",
    },
    spriteIndex: 1,
  },
  {
    id: "push-ups",
    name: "Отжимания",
    shortName: "Отжимания",
    cue: "Сохраняйте прямую линию корпуса. Можно опереться на колени.",
    english: {
      name: "Push-ups",
      shortName: "Push-ups",
      cue: "Keep your body in a straight line. Lower your knees if needed.",
    },
    spriteIndex: 2,
  },
  {
    id: "crunches",
    name: "Скручивания",
    shortName: "Скручивания",
    cue: "Поднимайте плечи без рывка и не тяните голову руками.",
    english: {
      name: "Abdominal crunches",
      shortName: "Crunches",
      cue: "Lift your shoulders without jerking or pulling on your head.",
    },
    spriteIndex: 3,
  },
  {
    id: "step-ups",
    name: "Шаги на стул",
    shortName: "Шаги на стул",
    cue: "Используйте устойчивый стул и полностью ставьте стопу на сиденье.",
    english: {
      name: "Step-ups onto a chair",
      shortName: "Step-ups",
      cue: "Use a stable chair and place your whole foot on the seat.",
    },
    spriteIndex: 4,
  },
  {
    id: "squats",
    name: "Приседания",
    shortName: "Приседания",
    cue: "Отводите таз назад, колени направляйте по линии стоп.",
    english: {
      name: "Bodyweight squats",
      shortName: "Squats",
      cue: "Send your hips back and keep your knees in line with your feet.",
    },
    spriteIndex: 5,
  },
  {
    id: "chair-dips",
    name: "Обратные отжимания от стула",
    shortName: "Отжимания от стула",
    cue: "Держите плечи опущенными, а стул поставьте у стены.",
    english: {
      name: "Triceps dips on a chair",
      shortName: "Chair dips",
      cue: "Keep your shoulders down and place the chair against a wall.",
    },
    spriteIndex: 6,
  },
  {
    id: "plank",
    name: "Планка",
    shortName: "Планка",
    cue: "Держите корпус ровно и продолжайте спокойно дышать.",
    english: {
      name: "Forearm plank",
      shortName: "Plank",
      cue: "Keep your body straight and continue to breathe steadily.",
    },
    spriteIndex: 7,
  },
  {
    id: "high-knees",
    name: "Бег на месте с высокими коленями",
    shortName: "Высокие колени",
    cue: "Поднимайте колени до комфортной высоты и легко ставьте стопы.",
    english: {
      name: "High knees running in place",
      shortName: "High knees",
      cue: "Lift your knees to a comfortable height and land lightly.",
    },
    spriteIndex: 8,
  },
  {
    id: "lunges",
    name: "Выпады",
    shortName: "Выпады",
    cue: "Шагайте достаточно широко и удерживайте корпус вертикально.",
    english: {
      name: "Forward lunges",
      shortName: "Lunges",
      cue: "Take a long enough step and keep your torso upright.",
    },
    spriteIndex: 9,
  },
  {
    id: "push-up-rotation",
    name: "Отжимания с поворотом",
    shortName: "Отжимания с поворотом",
    cue: "После отжимания разверните корпус и поднимите одну руку.",
    english: {
      name: "Push-up with rotation",
      shortName: "Push-up rotation",
      cue: "After each push-up, rotate your torso and raise one arm.",
    },
    spriteIndex: 10,
  },
  {
    id: "side-plank",
    name: "Боковая планка",
    shortName: "Боковая планка",
    cue: "Вытяните корпус в одну линию. Можно опереться на колено.",
    english: {
      name: "Side plank",
      shortName: "Side plank",
      cue: "Keep your body in one line. Lower your knee if needed.",
    },
    spriteIndex: 11,
  },
  {
    id: "glute-bridge",
    name: "Ягодичный мост",
    shortName: "Ягодичный мост",
    cue: "Поднимайте таз до прямой линии корпуса без прогиба в пояснице.",
    english: {
      name: "Glute bridge",
      shortName: "Glute bridge",
      cue: "Lift your hips into a straight line without arching your lower back.",
    },
    spriteIndex: 12,
    extra: true,
  },
  {
    id: "bird-dog",
    name: "Диагональное вытягивание",
    shortName: "Вытягивание",
    cue: "Из положения на четвереньках вытяните противоположные руку и ногу.",
    english: {
      name: "Bird dog",
      shortName: "Bird dog",
      cue: "From all fours, extend the opposite arm and leg.",
    },
    spriteIndex: 13,
    extra: true,
  },
  {
    id: "mountain-climbers",
    name: "Альпинист",
    shortName: "Альпинист",
    cue: "Подтягивайте колени по очереди, сохраняя опору на ладонях.",
    english: {
      name: "Mountain climbers",
      shortName: "Mountain climbers",
      cue: "Draw your knees in one at a time while pressing through your hands.",
    },
    spriteIndex: 14,
    extra: true,
  },
  {
    id: "dead-bug",
    name: "Мёртвый жук",
    shortName: "Мёртвый жук",
    cue: "Опускайте противоположные руку и ногу, удерживая поясницу на полу.",
    english: {
      name: "Dead bug",
      shortName: "Dead bug",
      cue: "Lower the opposite arm and leg while keeping your lower back down.",
    },
    spriteIndex: 15,
    extra: true,
  },
];

export const canonicalExerciseIds = exercises
  .filter((exercise) => !exercise.extra)
  .map((exercise) => exercise.id);

export const exerciseById = new Map(exercises.map((exercise) => [exercise.id, exercise]));

export function getExerciseText(exercise: Exercise, language: "en" | "ru") {
  return language === "en"
    ? exercise.english
    : {
        name: exercise.name,
        shortName: exercise.shortName,
        cue: exercise.cue,
      };
}

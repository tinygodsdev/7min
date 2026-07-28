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
  spriteSheet?: 1 | 2;
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
  {
    id: "burpees",
    name: "Бёрпи",
    shortName: "Бёрпи",
    cue: "Поставьте ладони на пол, шагните или отпрыгните в планку, затем вернитесь в стойку.",
    english: {
      name: "Burpees",
      shortName: "Burpees",
      cue: "Place your hands down, step or jump back to plank, then return to standing.",
    },
    spriteIndex: 0,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "downward-facing-dog",
    name: "Собака мордой вниз",
    shortName: "Собака мордой вниз",
    cue: "Упритесь ладонями и стопами в пол, направляя таз вверх и назад.",
    english: {
      name: "Downward-facing dog",
      shortName: "Downward-facing dog",
      cue: "Press through your hands and feet while sending your hips up and back.",
    },
    spriteIndex: 1,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "inverted-flyers",
    name: "Наклоны «самолёт»",
    shortName: "Наклоны «самолёт»",
    cue: "Наклоняйтесь на опорной ноге, вытягивая другую ногу назад. Чередуйте стороны.",
    english: {
      name: "Inverted flyers",
      shortName: "Inverted flyers",
      cue: "Hinge over the standing leg and extend the other leg back. Alternate sides.",
    },
    spriteIndex: 2,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "bear-crawl",
    name: "Медвежья походка",
    shortName: "Медвежья походка",
    cue: "Держите колени над полом и двигайте вперёд противоположные руку и ногу.",
    english: {
      name: "Bear crawl",
      shortName: "Bear crawl",
      cue: "Keep your knees hovering and move the opposite hand and foot forward.",
    },
    spriteIndex: 3,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "single-leg-deadlift",
    name: "Тяга на одной ноге",
    shortName: "Тяга на одной ноге",
    cue: "Отводите свободную ногу назад, сохраняя длинную спину и ровное положение таза.",
    english: {
      name: "Bodyweight single-leg deadlift",
      shortName: "Single-leg deadlift",
      cue: "Reach the free leg back while keeping your spine long and hips level.",
    },
    spriteIndex: 4,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "parallel-bar-dips",
    name: "Отжимания на брусьях",
    shortName: "Отжимания на брусьях",
    cue: "Используйте устойчивые брусья, держите плечи опущенными и работайте в удобной амплитуде.",
    english: {
      name: "Parallel-bar dips",
      shortName: "Parallel-bar dips",
      cue: "Use stable bars, keep your shoulders down and work through a comfortable range.",
    },
    spriteIndex: 5,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "good-mornings",
    name: "Наклоны «доброе утро»",
    shortName: "Доброе утро",
    cue: "Слегка согните колени, отведите таз назад и сохраняйте спину ровной.",
    english: {
      name: "Good mornings",
      shortName: "Good mornings",
      cue: "Soften your knees, send your hips back and keep your spine neutral.",
    },
    spriteIndex: 6,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "skater-steps",
    name: "Шаги конькобежца",
    shortName: "Шаги конькобежца",
    cue: "Переносите вес из стороны в сторону, мягко ставя стопу и удерживая равновесие.",
    english: {
      name: "Skater steps",
      shortName: "Skater steps",
      cue: "Shift your weight from side to side, landing softly and staying balanced.",
    },
    spriteIndex: 7,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "sumo-squats",
    name: "Сумо-приседания",
    shortName: "Сумо-приседания",
    cue: "Поставьте стопы широко, разверните носки и направляйте колени по линии стоп.",
    english: {
      name: "Sumo squats",
      shortName: "Sumo squats",
      cue: "Take a wide stance, turn your toes out and track your knees over your feet.",
    },
    spriteIndex: 8,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "sprinter-stretch-rotation",
    name: "Растяжка спринтера с поворотом",
    shortName: "Растяжка спринтера",
    cue: "Поставьте ладонь рядом с передней стопой и разверните корпус, вытягивая другую руку вверх.",
    english: {
      name: "Sprinter stretch with rotation",
      shortName: "Sprinter stretch",
      cue: "Plant one hand beside the front foot and rotate your torso as the other arm reaches up.",
    },
    spriteIndex: 9,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "kettlebell-swings",
    name: "Махи гирей",
    shortName: "Махи гирей",
    cue: "Разгоняйте гирю движением таза, сохраняя длинную спину и свободные руки.",
    english: {
      name: "Kettlebell swings",
      shortName: "Kettlebell swings",
      cue: "Drive the kettlebell with your hips while keeping your spine long and arms relaxed.",
    },
    spriteIndex: 10,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "forward-fold-overhead-reach",
    name: "Наклон и вытягивание вверх",
    shortName: "Наклон и вытягивание",
    cue: "Наклонитесь к полу, затем выпрямитесь и вытяните обе руки вверх.",
    english: {
      name: "Forward fold to overhead reach",
      shortName: "Fold and reach",
      cue: "Fold toward the floor, then stand tall and reach both arms overhead.",
    },
    spriteIndex: 11,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "swimmers",
    name: "Пловцы",
    shortName: "Пловцы",
    cue: "Лёжа на животе, поочерёдно поднимайте противоположные руку и ногу.",
    english: {
      name: "Swimmers",
      shortName: "Swimmers",
      cue: "Lie face down and alternately lift the opposite arm and leg.",
    },
    spriteIndex: 12,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "easy-bridge",
    name: "Обратный мост",
    shortName: "Обратный мост",
    cue: "Упритесь ладонями и стопами в пол, поднимите таз и сохраняйте шею нейтральной.",
    english: {
      name: "Easy bridge",
      shortName: "Easy bridge",
      cue: "Press through your hands and feet, lift your hips and keep your neck neutral.",
    },
    spriteIndex: 13,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "side-lunges",
    name: "Боковые выпады",
    shortName: "Боковые выпады",
    cue: "Отводите таз назад над согнутой ногой, оставляя другую ногу прямой.",
    english: {
      name: "Side lunges",
      shortName: "Side lunges",
      cue: "Send your hips back over the bent leg while keeping the other leg straight.",
    },
    spriteIndex: 14,
    spriteSheet: 2,
    extra: true,
  },
  {
    id: "reverse-snow-angels",
    name: "Обратные снежные ангелы",
    shortName: "Снежные ангелы",
    cue: "Лёжа на животе, слегка поднимите грудь и плавно проведите прямыми руками вдоль пола.",
    english: {
      name: "Reverse snow angels",
      shortName: "Reverse snow angels",
      cue: "Lie face down, lift your chest slightly and sweep your straight arms along the floor.",
    },
    spriteIndex: 15,
    spriteSheet: 2,
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

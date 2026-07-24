import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "ru";

const english = {
  brandMinutes: "minutes",
  languageLabel: "Language",
  soundDisable: "Turn sound off",
  soundEnable: "Turn sound on",
  soundOn: "Sound on",
  soundOff: "Sound off",
  exerciseIllustration: "Illustration of",
  homeToday: "Today",
  homeEmptyTitle: "Your program is empty",
  homeMeta: "30 seconds work · 10 seconds rest",
  homeEmptyText: "Enable at least one exercise in the program settings.",
  homeStart: "Start",
  homeWorkout: "workout",
  homeCurrentProgram: "Current program",
  homeExercises: "Exercises",
  homeEdit: "Edit",
  homeShowAll: "Show all",
  homeRecent: "Recent sessions",
  homeHistory: "History",
  homeThirtyDays: "30 days",
  homeHistoryAria: "Workouts during the last 30 days",
  homeNoWorkout: "no workout",
  homeSafety: "Stop if you feel pain or dizziness.",
  editorDone: "Done",
  editorSetup: "Settings",
  editorProgram: "Program",
  editorReset: "Reset",
  editorOrder: "Exercise order",
  editorOrderHelp: "Drag the dotted handle to reorder. Disabled exercises are skipped.",
  editorMoveHint: "Move. Use the up and down arrow keys with a keyboard.",
  editorInclude: "Include in workout",
  editorRemove: "Remove from program",
  editorAdditional: "More exercises",
  editorLibrary: "Library",
  editorAdd: "Add",
  workoutComplete: "Workout complete",
  workoutSaved: "Saved to your history.",
  workoutHome: "Home",
  workoutClose: "Close",
  workoutOverallProgress: "Overall progress",
  workoutExercise: "Exercise",
  workoutOf: "of",
  workoutBreak: "Break",
  workoutNow: "Now",
  workoutNext: "Next",
  workoutGetReady: "Get ready for the next exercise.",
  workoutSeconds: "sec",
  workoutPause: "Pause",
  workoutContinue: "Continue",
  workoutSkip: "Skip",
  landingHomeAria: "7 Minutes, home",
  landingOpenApp: "Open app",
  landingFree: "Free and no account",
  landingHeroTitleLineOne: "Seven minutes.",
  landingHeroTitleLineTwo: "Your order.",
  landingHeroLead: "Start with one button. Change the exercises and their order, while the app keeps time and saves your history.",
  landingGoToWorkout: "Go to workout",
  landingPrivate: "Settings stay on your device. After the first visit, the app works offline.",
  landingWorkoutScreen: "Workout screen",
  landingOneOfTwelve: "1 of 12",
  landingDuring: "During the workout",
  landingVisibleTitle: "Everything you need stays in view",
  landingVisibleBody: "See the current exercise, interval time and overall progress. Pause or skip with one tap.",
  landingSignals: "Signals",
  landingSignalsTitle: "Hear each interval change",
  landingSignalsBody: "Exercise and rest use different calm sounds. Sound can be turned off.",
  landingHistory: "History",
  landingHistoryTitle: "The last 30 days",
  landingHistoryBody: "Completed workouts stay in the browser and appear on a simple calendar.",
  landingHistoryAria: "Example workout history",
  landingProgramAria: "Exercise order settings",
  landingSequence: "Your sequence",
  landingSequenceTitle: "Keep the exercises that suit you",
  landingSequenceBody: "The canonical program is ready. Disable exercises, reorder them or choose replacements from a small library.",
  landingConfigure: "Configure program",
  landingConceptKicker: "The method",
  landingConceptTitle: "A whole-body circuit with short intervals",
  landingConceptBody: "The routine was described in 2013 as a bodyweight high-intensity circuit. It alternates movements for different muscle groups so one area can recover while another works.",
  landingConceptTiming: "Each exercise lasts 30 seconds, followed by a 10-second transition. Twelve exercises with eleven transitions take 7 minutes 50 seconds.",
  landingConceptSafety: "Use an intensity that matches your current ability. Stop if you feel pain or dizziness.",
  landingEvidenceKicker: "Evidence",
  landingEvidenceTitle: "What the research supports",
  landingEvidenceBody: "A 2022 systematic review and meta-analysis found that whole-body HIIT improved cardiorespiratory and musculoskeletal fitness compared with no exercise.",
  landingEvidenceScope: "The review covered a range of whole-body interval protocols. It did not test this exact seven-minute sequence.",
  landingOriginalStudy: "Original 2013 protocol",
  landingMetaAnalysis: "2022 systematic review and meta-analysis",
  landingFinalMeta: "12 exercises · 7 minutes 50 seconds",
  landingFinalTitle: "The canonical program is ready",
  landingFinalBody: "Open it in the browser or install it on your phone’s home screen.",
  landingFooter: "A configurable seven-minute workout.",
  landingInstall: "Install app",
  landingInstallTitle: "Install on your phone",
  landingInstallIOS: "Open the Share menu and choose “Add to Home Screen”.",
  landingInstallOther: "Open the browser menu and choose the option to install or add the app to your home screen.",
  landingOpenWithoutInstall: "Open without installing",
  privacyLink: "Privacy policy",
  privacyKicker: "Privacy",
  privacyTitle: "Privacy policy",
  privacyUpdated: "Last updated: July 25, 2026",
  privacyIntro: "7 Minutes works without an account. The app does not send your workout history or settings to Tiny Gods.",
  privacyLocalTitle: "Data stored on your device",
  privacyLocalBody: "Your exercise order, enabled exercises, sound preference, language and workout history are stored in your browser. The browser also caches app files so the workout can work offline.",
  privacyAnalyticsTitle: "Analytics",
  privacyAnalyticsBody: "We do not use Google Analytics or any third-party advertising and analytics tools.",
  privacyHostingTitle: "Hosting data",
  privacyHostingBody: "The site is hosted by Railway. Railway may process technical request data, including your IP address, browser or device information, requested page and request time, to deliver and protect the service.",
  privacyRailwayLink: "Railway privacy policy",
  privacyLinksTitle: "External links",
  privacyLinksBody: "Links to research papers and Tiny Gods open other websites. Their own privacy policies apply when you visit them.",
  privacyControlTitle: "Removing your data",
  privacyControlBody: "Clear the site data for 7 Minutes in your browser settings to remove saved preferences, workout history and offline files.",
  privacyChangesTitle: "Changes to this policy",
  privacyChangesBody: "This page will be updated if the app starts handling data differently.",
  privacyContactTitle: "Contact",
  privacyContactBody: "Questions about this policy can be sent through the Tiny Gods contact page.",
  privacyContactLink: "Contact Tiny Gods",
  privacyBackHome: "Back to home",
  privacyOpenApp: "Open app",
  privacyMetaDescription: "Privacy policy for the 7 Minutes workout app",
  commonClose: "Close",
} as const;

type Copy = { [Key in keyof typeof english]: string };

const russian: Copy = {
  brandMinutes: "минут",
  languageLabel: "Язык",
  soundDisable: "Выключить звук",
  soundEnable: "Включить звук",
  soundOn: "Звук включён",
  soundOff: "Без звука",
  exerciseIllustration: "Иллюстрация упражнения",
  homeToday: "Сегодня",
  homeEmptyTitle: "Программа пуста",
  homeMeta: "30 секунд работы · 10 секунд отдыха",
  homeEmptyText: "Включите хотя бы одно упражнение в настройках.",
  homeStart: "Начать",
  homeWorkout: "тренировку",
  homeCurrentProgram: "Текущая программа",
  homeExercises: "Упражнения",
  homeEdit: "Изменить",
  homeShowAll: "Посмотреть все",
  homeRecent: "Последние занятия",
  homeHistory: "История",
  homeThirtyDays: "30 дней",
  homeHistoryAria: "Тренировки за последние 30 дней",
  homeNoWorkout: "без тренировки",
  homeSafety: "Остановитесь, если почувствуете боль или головокружение.",
  editorDone: "Готово",
  editorSetup: "Настройка",
  editorProgram: "Программа",
  editorReset: "Сбросить",
  editorOrder: "Порядок упражнений",
  editorOrderHelp: "Потяните за точки, чтобы изменить порядок. Выключенные упражнения пропускаются.",
  editorMoveHint: "Переместить. Используйте стрелки вверх и вниз с клавиатуры.",
  editorInclude: "Добавить в тренировку",
  editorRemove: "Убрать из программы",
  editorAdditional: "Дополнительно",
  editorLibrary: "Библиотека",
  editorAdd: "Добавить",
  workoutComplete: "Тренировка завершена",
  workoutSaved: "Результат сохранён в истории.",
  workoutHome: "На главный экран",
  workoutClose: "Закрыть",
  workoutOverallProgress: "Общий прогресс",
  workoutExercise: "Упражнение",
  workoutOf: "из",
  workoutBreak: "Перерыв",
  workoutNow: "Сейчас",
  workoutNext: "Дальше",
  workoutGetReady: "Приготовьтесь к следующему упражнению.",
  workoutSeconds: "сек",
  workoutPause: "Пауза",
  workoutContinue: "Продолжить",
  workoutSkip: "Пропустить",
  landingHomeAria: "7 минут, главная",
  landingOpenApp: "Открыть приложение",
  landingFree: "Бесплатно и без аккаунта",
  landingHeroTitleLineOne: "Семь минут.",
  landingHeroTitleLineTwo: "В своём порядке.",
  landingHeroLead: "Запускайте тренировку одной кнопкой. Меняйте упражнения и их порядок, а приложение отсчитает интервалы и сохранит историю.",
  landingGoToWorkout: "Перейти к тренировке",
  landingPrivate: "Настройки остаются на вашем устройстве. После первого запуска приложение работает офлайн.",
  landingWorkoutScreen: "Экран тренировки",
  landingOneOfTwelve: "1 из 12",
  landingDuring: "Во время тренировки",
  landingVisibleTitle: "Всё нужное остаётся перед глазами",
  landingVisibleBody: "Экран показывает текущее упражнение, время интервала и общий прогресс. Пауза и пропуск доступны одним нажатием.",
  landingSignals: "Сигналы",
  landingSignalsTitle: "Начало и конец интервала слышны",
  landingSignalsBody: "У упражнений и отдыха разные спокойные звуки. Их можно выключить.",
  landingHistory: "История",
  landingHistoryTitle: "Последние 30 дней",
  landingHistoryBody: "Завершённые тренировки сохраняются в браузере и отмечаются в календаре.",
  landingHistoryAria: "Пример истории тренировок",
  landingProgramAria: "Настройка порядка упражнений",
  landingSequence: "Своя последовательность",
  landingSequenceTitle: "Оставьте подходящие упражнения",
  landingSequenceBody: "Каноническая программа уже настроена. Упражнения можно выключать, переставлять и заменять вариантами из небольшой библиотеки.",
  landingConfigure: "Настроить программу",
  landingConceptKicker: "Метод",
  landingConceptTitle: "Круговая тренировка с короткими интервалами",
  landingConceptBody: "Программу описали в 2013 году как высокоинтенсивную круговую тренировку с весом собственного тела. Упражнения для разных групп мышц чередуются, поэтому одна область отдыхает, пока работает другая.",
  landingConceptTiming: "Каждое упражнение длится 30 секунд, затем даётся 10 секунд на переход. Двенадцать упражнений и одиннадцать переходов занимают 7 минут 50 секунд.",
  landingConceptSafety: "Подбирайте интенсивность под свою текущую подготовку. Остановитесь, если почувствуете боль или головокружение.",
  landingEvidenceKicker: "Исследования",
  landingEvidenceTitle: "Что подтверждают данные",
  landingEvidenceBody: "Систематический обзор и метаанализ 2022 года показал, что интервальные тренировки всего тела улучшали кардиореспираторную и мышечную подготовку по сравнению с отсутствием упражнений.",
  landingEvidenceScope: "Обзор охватывал разные протоколы интервальных тренировок всего тела. Точная семиминутная последовательность в нём не проверялась.",
  landingOriginalStudy: "Исходный протокол 2013 года",
  landingMetaAnalysis: "Систематический обзор и метаанализ 2022 года",
  landingFinalMeta: "12 упражнений · 7 минут 50 секунд",
  landingFinalTitle: "Каноническая программа готова",
  landingFinalBody: "Откройте её в браузере или установите на главный экран телефона.",
  landingFooter: "Настраиваемая семиминутная тренировка.",
  landingInstall: "Установить приложение",
  landingInstallTitle: "Установка на телефон",
  landingInstallIOS: "Откройте меню «Поделиться» и выберите «На экран Домой».",
  landingInstallOther: "Откройте меню браузера и выберите пункт установки или добавления на главный экран.",
  landingOpenWithoutInstall: "Открыть без установки",
  privacyLink: "Политика приватности",
  privacyKicker: "Приватность",
  privacyTitle: "Политика приватности",
  privacyUpdated: "Обновлено: 25 июля 2026 года",
  privacyIntro: "7 минут работает без аккаунта. Приложение не отправляет историю тренировок и настройки в Tiny Gods.",
  privacyLocalTitle: "Данные на вашем устройстве",
  privacyLocalBody: "Порядок упражнений, включённые упражнения, настройка звука, язык и история тренировок хранятся в браузере. Браузер также сохраняет файлы приложения, чтобы тренировка работала офлайн.",
  privacyAnalyticsTitle: "Аналитика",
  privacyAnalyticsBody: "Мы не используем Google Analytics и другие сторонние инструменты рекламы и аналитики.",
  privacyHostingTitle: "Данные хостинга",
  privacyHostingBody: "Сайт размещён на Railway. Railway может обрабатывать технические данные запроса, включая IP-адрес, сведения о браузере или устройстве, запрошенную страницу и время запроса, чтобы передать содержимое сайта и защитить сервис.",
  privacyRailwayLink: "Политика приватности Railway",
  privacyLinksTitle: "Внешние ссылки",
  privacyLinksBody: "Ссылки на исследования и Tiny Gods открывают другие сайты. При их посещении действуют политики приватности этих сайтов.",
  privacyControlTitle: "Удаление данных",
  privacyControlBody: "Очистите данные сайта 7 минут в настройках браузера, чтобы удалить сохранённые настройки, историю тренировок и офлайн-файлы.",
  privacyChangesTitle: "Изменения политики",
  privacyChangesBody: "Эта страница будет обновлена, если приложение начнёт иначе работать с данными.",
  privacyContactTitle: "Связь",
  privacyContactBody: "Вопросы о политике можно отправить через страницу контактов Tiny Gods.",
  privacyContactLink: "Написать Tiny Gods",
  privacyBackHome: "На главную",
  privacyOpenApp: "Открыть приложение",
  privacyMetaDescription: "Политика приватности приложения для тренировок «7 минут»",
  commonClose: "Закрыть",
};

const copyByLanguage: Record<Language, Copy> = {
  en: english,
  ru: russian,
};

type LocaleContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  copy: Copy;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const LANGUAGE_STORAGE_KEY = "seven-minutes-language";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLanguage === "ru" || savedLanguage === "en" ? savedLanguage : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
    const isPrivacyPage = window.location.pathname.startsWith("/privacy");
    document.title = isPrivacyPage
      ? language === "en"
        ? "Privacy policy · 7 Minutes"
        : "Политика приватности · 7 минут"
      : language === "en"
        ? "7 Minutes"
        : "7 минут";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = isPrivacyPage
        ? copyByLanguage[language].privacyMetaDescription
        : language === "en"
          ? "A configurable seven-minute workout"
          : "Настраиваемая семиминутная тренировка";
    }
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, copy: copyByLanguage[language] }),
    [language],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}

export function formatExerciseCount(count: number, language: Language) {
  if (language === "en") return `${count} ${count === 1 ? "exercise" : "exercises"}`;
  const mod10 = count % 10;
  const mod100 = count % 100;
  const word =
    mod10 === 1 && mod100 !== 11
      ? "упражнение"
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
        ? "упражнения"
        : "упражнений";
  return `${count} ${word}`;
}

export function formatWorkoutCount(count: number, language: Language) {
  if (language === "en") return `${count} ${count === 1 ? "workout" : "workouts"}`;
  const mod10 = count % 10;
  const mod100 = count % 100;
  const word =
    mod10 === 1 && mod100 !== 11
      ? "тренировка"
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
        ? "тренировки"
        : "тренировок";
  return `${count} ${word}`;
}

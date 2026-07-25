import { useCallback, useMemo, useState } from "react";
import { canonicalExerciseIds, exerciseById } from "./data/exercises";
import { HomeScreen } from "./components/HomeScreen";
import { ProgramEditor, type ProgramItem } from "./components/ProgramEditor";
import { WorkoutScreen } from "./components/WorkoutScreen";
import { LandingPage } from "./components/LandingPage";
import { PrivacyPage } from "./components/PrivacyPage";
import { usePersistentState } from "./hooks/usePersistentState";
import {
  useWorkoutAudio,
  type SoundLevel,
} from "./hooks/useWorkoutAudio";

type AppScreen = "home" | "editor" | "workout";

export type WorkoutHistoryItem = {
  id: string;
  completedAt: string;
  durationSeconds: number;
  exerciseCount: number;
};

const canonicalProgram = (): ProgramItem[] =>
  canonicalExerciseIds.map((id) => ({ id, enabled: true }));

function WorkoutApp() {
  const [screen, setScreen] = useState<AppScreen>("home");
  const [program, setProgram] = usePersistentState<ProgramItem[]>(
    "seven-minutes-program",
    canonicalProgram,
  );
  const [history, setHistory] = usePersistentState<WorkoutHistoryItem[]>(
    "seven-minutes-history",
    [],
  );
  const [soundEnabled, setSoundEnabled] = usePersistentState(
    "seven-minutes-sound",
    true,
  );
  const [soundLevel, setSoundLevel] = usePersistentState<SoundLevel>(
    "seven-minutes-sound-level",
    "loud",
  );
  const [voiceEnabled, setVoiceEnabled] = usePersistentState(
    "seven-minutes-voice",
    true,
  );
  const {
    prepare: prepareAudio,
    play: playAudio,
    playVoice,
  } = useWorkoutAudio({
    enabled: soundEnabled,
    level: soundLevel,
    voiceEnabled,
  });

  const activeExercises = useMemo(
    () =>
      program
        .filter((item) => item.enabled)
        .map((item) => exerciseById.get(item.id))
        .filter((exercise) => exercise !== undefined),
    [program],
  );

  const finishWorkout = useCallback(
    (durationSeconds: number) => {
      const historyItem: WorkoutHistoryItem = {
        id: crypto.randomUUID(),
        completedAt: new Date().toISOString(),
        durationSeconds,
        exerciseCount: activeExercises.length,
      };
      setHistory((items) => [historyItem, ...items].slice(0, 100));
    },
    [activeExercises.length, setHistory],
  );

  const toggleSound = useCallback(() => {
    if (!soundEnabled) {
      void prepareAudio(activeExercises.map((exercise) => exercise.id));
    }
    setSoundEnabled((enabled) => !enabled);
  }, [activeExercises, prepareAudio, setSoundEnabled, soundEnabled]);

  if (screen === "editor") {
    return (
      <ProgramEditor
        program={program}
        onChange={setProgram}
        onReset={() => setProgram(canonicalProgram())}
        onClose={() => setScreen("home")}
        soundEnabled={soundEnabled}
        onSoundToggle={toggleSound}
        soundLevel={soundLevel}
        onSoundLevelChange={setSoundLevel}
        voiceEnabled={voiceEnabled}
        onVoiceToggle={() => setVoiceEnabled((enabled) => !enabled)}
        onPreviewSound={() => {
          void prepareAudio().then(() => playAudio("exercise"));
        }}
      />
    );
  }

  if (screen === "workout") {
    return (
      <WorkoutScreen
        exercises={activeExercises}
        soundEnabled={soundEnabled}
        onSoundToggle={toggleSound}
        prepareAudio={prepareAudio}
        playAudio={playAudio}
        playVoice={playVoice}
        onFinish={finishWorkout}
        onExit={() => setScreen("home")}
      />
    );
  }

  return (
    <HomeScreen
      activeExercises={activeExercises}
      soundEnabled={soundEnabled}
      onSoundToggle={toggleSound}
      onStart={() => {
        void prepareAudio(activeExercises.map((exercise) => exercise.id)).then(() =>
          setScreen("workout"),
        );
      }}
      onEdit={() => setScreen("editor")}
      history={history}
    />
  );
}

function App() {
  if (window.location.pathname.startsWith("/privacy")) {
    return <PrivacyPage />;
  }

  if (!window.location.pathname.startsWith("/app")) {
    return <LandingPage />;
  }

  return <WorkoutApp />;
}

export default App;

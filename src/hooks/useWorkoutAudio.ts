import { useCallback, useEffect, useRef } from "react";

export type SoundLevel = "normal" | "loud" | "extra-loud";

type Cue = "prepare" | "exercise" | "rest" | "tick" | "complete";

type CueNote = {
  frequency: number;
  delay: number;
  duration: number;
  volume: number;
  wave: OscillatorType;
};

type WorkoutAudioOptions = {
  enabled: boolean;
  level: SoundLevel;
  voiceEnabled: boolean;
};

const levelGain: Record<SoundLevel, number> = {
  normal: 0.78,
  loud: 1.08,
  "extra-loud": 1.38,
};

const cueNotes: Record<Cue, CueNote[]> = {
  prepare: [
    { frequency: 659.25, delay: 0, duration: 0.16, volume: 0.24, wave: "triangle" },
    { frequency: 880, delay: 0.17, duration: 0.3, volume: 0.28, wave: "triangle" },
  ],
  exercise: [
    { frequency: 783.99, delay: 0, duration: 0.14, volume: 0.27, wave: "triangle" },
    { frequency: 1174.66, delay: 0.15, duration: 0.3, volume: 0.31, wave: "triangle" },
  ],
  rest: [
    { frequency: 698.46, delay: 0, duration: 0.15, volume: 0.27, wave: "triangle" },
    { frequency: 493.88, delay: 0.16, duration: 0.32, volume: 0.3, wave: "sine" },
  ],
  tick: [
    { frequency: 880, delay: 0, duration: 0.09, volume: 0.2, wave: "triangle" },
  ],
  complete: [
    { frequency: 659.25, delay: 0, duration: 0.15, volume: 0.25, wave: "triangle" },
    { frequency: 880, delay: 0.16, duration: 0.15, volume: 0.28, wave: "triangle" },
    { frequency: 1174.66, delay: 0.32, duration: 0.38, volume: 0.31, wave: "triangle" },
  ],
};

export function useWorkoutAudio({
  enabled,
  level,
  voiceEnabled,
}: WorkoutAudioOptions) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const voiceBuffersRef = useRef(new Map<string, Promise<AudioBuffer>>());

  const getAudioContext = useCallback(() => {
    const context = audioContextRef.current ?? new AudioContext();
    audioContextRef.current = context;
    return context;
  }, []);

  const loadVoice = useCallback(
    (exerciseId: string) => {
      const existingBuffer = voiceBuffersRef.current.get(exerciseId);
      if (existingBuffer) return existingBuffer;

      const context = getAudioContext();
      const bufferPromise = fetch(`/audio/voice/en/${exerciseId}.mp3`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Voice prompt request failed with ${response.status}`);
          }
          return response.arrayBuffer();
        })
        .then((arrayBuffer) => context.decodeAudioData(arrayBuffer));

      voiceBuffersRef.current.set(exerciseId, bufferPromise);
      return bufferPromise;
    },
    [getAudioContext],
  );

  const prepare = useCallback(
    async (exerciseIds: string[] = []) => {
      const context = getAudioContext();
      if (context.state === "suspended") {
        await context.resume();
      }

      if (voiceEnabled) {
        exerciseIds.forEach((exerciseId) => {
          void loadVoice(exerciseId).catch((error: unknown) => {
            console.error(`Unable to preload voice prompt for ${exerciseId}`, error);
          });
        });
      }
    },
    [getAudioContext, loadVoice, voiceEnabled],
  );

  const play = useCallback(
    (cue: Cue) => {
      if (!enabled) return;
      const context = audioContextRef.current;
      if (!context || context.state !== "running") return;

      const startAt = context.currentTime + 0.015;
      cueNotes[cue].forEach(({ frequency, delay, duration, volume, wave }) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const noteStart = startAt + delay;
        const noteEnd = noteStart + duration;

        oscillator.type = wave;
        oscillator.frequency.setValueAtTime(frequency, noteStart);
        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.exponentialRampToValueAtTime(
          volume * levelGain[level],
          noteStart + 0.012,
        );
        gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(noteStart);
        oscillator.stop(noteEnd + 0.02);
      });
    },
    [enabled, level],
  );

  const playVoice = useCallback(
    (exerciseId: string, delaySeconds = 0) => {
      if (!enabled || !voiceEnabled) return;

      void loadVoice(exerciseId)
        .then((buffer) => {
          const context = audioContextRef.current;
          if (!context || context.state !== "running") return;
          const source = context.createBufferSource();
          const gain = context.createGain();
          source.buffer = buffer;
          gain.gain.value = Math.min(1.25, levelGain[level] * 0.95);
          source.connect(gain);
          gain.connect(context.destination);
          source.start(context.currentTime + delaySeconds);
        })
        .catch((error: unknown) => {
          console.error(`Unable to play voice prompt for ${exerciseId}`, error);
        });
    },
    [enabled, level, loadVoice, voiceEnabled],
  );

  useEffect(
    () => () => {
      const context = audioContextRef.current;
      audioContextRef.current = null;
      voiceBuffersRef.current.clear();
      void context?.close();
    },
    [],
  );

  return { prepare, play, playVoice };
}

import { useCallback, useEffect, useRef } from "react";

type Cue = "exercise" | "rest" | "tick" | "complete";

type CueNote = {
  frequency: number;
  delay: number;
  duration: number;
  volume: number;
  wave: OscillatorType;
};

const cueNotes: Record<Cue, CueNote[]> = {
  exercise: [
    { frequency: 587.33, delay: 0, duration: 0.13, volume: 0.1, wave: "sine" },
    { frequency: 783.99, delay: 0.14, duration: 0.24, volume: 0.12, wave: "sine" },
  ],
  rest: [
    { frequency: 659.25, delay: 0, duration: 0.14, volume: 0.11, wave: "triangle" },
    { frequency: 493.88, delay: 0.15, duration: 0.28, volume: 0.12, wave: "sine" },
  ],
  tick: [
    { frequency: 440, delay: 0, duration: 0.065, volume: 0.055, wave: "triangle" },
  ],
  complete: [
    { frequency: 523.25, delay: 0, duration: 0.14, volume: 0.1, wave: "sine" },
    { frequency: 659.25, delay: 0.16, duration: 0.14, volume: 0.11, wave: "sine" },
    { frequency: 783.99, delay: 0.32, duration: 0.32, volume: 0.12, wave: "sine" },
  ],
};

export function useWorkoutAudio(enabled: boolean) {
  const audioContextRef = useRef<AudioContext | null>(null);

  const prepare = useCallback(async () => {
    if (!enabled) return;
    const context = audioContextRef.current ?? new AudioContext();
    audioContextRef.current = context;
    if (context.state === "suspended") {
      await context.resume();
    }
  }, [enabled]);

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
        gain.gain.exponentialRampToValueAtTime(volume, noteStart + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(noteStart);
        oscillator.stop(noteEnd + 0.02);
      });
    },
    [enabled],
  );

  useEffect(
    () => () => {
      const context = audioContextRef.current;
      audioContextRef.current = null;
      void context?.close();
    },
    [],
  );

  return { prepare, play };
}

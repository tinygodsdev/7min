# Voice prompts

The English exercise prompts were generated locally with Voicebox 0.5.0 using
the Kokoro 82M `af_heart` preset. Each file says “Next, [exercise name].”

The generated WAV files were normalized to -15 LUFS and encoded as mono MP3 at
24 kHz and 64 kbps. The app decodes them through the Web Audio API and includes
them in the PWA precache.

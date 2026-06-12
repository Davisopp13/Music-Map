"use client";

import { useEffect, useRef, useState } from "react";

const CRACKLE_VOLUME = 0.08;

// Ambient turntable: an opt-in garnish. Tap to spin the record and fade in
// a quiet vinyl-crackle loop. Hard rules, in order of importance:
//   - never autoplays (the AudioContext is only ever created in the tap
//     handler — a user gesture — so the browser allows it)
//   - ducks to silence while a Spotify embed is sounding, and while the
//     open card is a silence-as-curation pin (`silenced` prop)
//   - stops on navigation away (unmount closes the context)
//   - nothing persists across sessions — it's an invitation each time
//
// The crackle itself is synthesized: a whisper of filtered surface noise
// plus random pops, looped. No asset to download or license.
export default function Turntable({ silenced }: { silenced: boolean }) {
  const [spinning, setSpinning] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const rampTo = (target: number) => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setTargetAtTime(target, ctx.currentTime, 0.5);
  };

  const toggle = () => {
    if (!spinning && !ctxRef.current) {
      // first tap: build the whole audio chain inside the user gesture
      try {
        const ctx = new AudioContext();
        const source = ctx.createBufferSource();
        source.buffer = makeCrackleBuffer(ctx);
        source.loop = true;
        const warmth = ctx.createBiquadFilter();
        warmth.type = "lowpass";
        warmth.frequency.value = 3200;
        const gain = ctx.createGain();
        gain.gain.value = 0;
        source.connect(warmth).connect(gain).connect(ctx.destination);
        source.start();
        ctxRef.current = ctx;
        gainRef.current = gain;
      } catch {
        // no audio output available — the record still gets to spin
      }
    }
    setSpinning((s) => !s);
  };

  useEffect(() => {
    rampTo(spinning && !silenced ? CRACKLE_VOLUME : 0);
  }, [spinning, silenced]);

  // navigation away = needle up
  useEffect(
    () => () => {
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
      gainRef.current = null;
    },
    []
  );

  return (
    <button
      onClick={toggle}
      aria-pressed={spinning}
      aria-label={spinning ? "Stop ambient crackle" : "Play ambient crackle"}
      title="Ambient crackle"
      className={`pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border bg-paper shadow-[0_3px_12px_rgba(43,38,32,0.3)] transition-all ${
        spinning
          ? "border-foreground/60 opacity-100"
          : "border-paper-edge opacity-80 hover:opacity-100"
      }`}
    >
      <span
        className={`vinyl relative block h-8 w-8 rounded-full ${
          spinning ? "motion-safe:animate-[spin_2.8s_linear_infinite]" : ""
        }`}
        aria-hidden
      >
        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
        <span className="absolute left-1/2 top-[3px] h-1 w-1 -translate-x-1/2 rounded-full bg-paper/30" />
      </span>
    </button>
  );
}

function makeCrackleBuffer(ctx: AudioContext): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = Math.floor(sr * 4);
  const buf = ctx.createBuffer(1, len, sr);
  const d = buf.getChannelData(0);

  // surface noise: one-pole lowpassed white noise, very quiet
  let lp = 0;
  for (let i = 0; i < len; i++) {
    lp += 0.04 * (Math.random() * 2 - 1 - lp);
    d[i] = lp * 0.5;
  }

  // dust: short exponential pops scattered through the loop
  for (let p = 0; p < 28; p++) {
    const at = Math.floor(Math.random() * (len - 600));
    const amp = 0.25 + Math.random() * 0.55;
    const decay = 25 + Math.random() * 220;
    for (let i = 0; i < 600; i++) {
      d[at + i] += (Math.random() * 2 - 1) * amp * Math.exp(-i / decay);
    }
  }
  return buf;
}

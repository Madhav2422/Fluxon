"use client";

import { useEffect, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

interface Char {
  ch: string;
  scrambled: boolean;
}

interface ScrambleTextProps {
  /** Words to cycle through. Pass a stable (module-level) array. */
  words: readonly string[];
  /** Time each word stays on screen, in ms. */
  interval?: number;
  /** Delay before the first "decode" plays, in ms. */
  startDelay?: number;
  className?: string;
}

const toChars = (s: string): Char[] => s.split("").map((ch) => ({ ch, scrambled: false }));

/** Cycles through words with a "decoding" glitch transition between them. */
export default function ScrambleText({
  words,
  interval = 3000,
  startDelay = 1200,
  className = "",
}: ScrambleTextProps) {
  const [chars, setChars] = useState<Char[]>(() => toChars(words[0]));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    let index = 0;
    let current = words[0];

    const scrambleTo = (next: string) => {
      const length = Math.max(current.length, next.length);
      const queue = Array.from({ length }, (_, i) => {
        const start = Math.floor(Math.random() * 18);
        return {
          from: current[i] ?? "",
          to: next[i] ?? "",
          start,
          end: start + 10 + Math.floor(Math.random() * 22),
          glyph: "",
        };
      });

      let frame = 0;
      const tick = () => {
        let done = 0;
        const out: Char[] = [];
        for (const q of queue) {
          if (frame >= q.end) {
            done++;
            if (q.to) out.push({ ch: q.to, scrambled: false });
          } else if (frame >= q.start) {
            if (!q.glyph || Math.random() < 0.3) {
              q.glyph = GLYPHS[(Math.random() * GLYPHS.length) | 0];
            }
            out.push({ ch: q.to === " " ? " " : q.glyph, scrambled: true });
          } else if (q.from) {
            out.push({ ch: q.from, scrambled: false });
          }
        }
        setChars(out);

        if (done === queue.length) {
          current = next;
          timer = setTimeout(nextWord, interval);
        } else {
          frame++;
          raf = requestAnimationFrame(tick);
        }
      };
      tick();
    };

    const nextWord = () => {
      index = (index + 1) % words.length;
      scrambleTo(words[index]);
    };

    // Play a "decode" of the first word, then start cycling.
    timer = setTimeout(() => scrambleTo(words[0]), startDelay);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [words, interval, startDelay]);

  // The longest word holds the width open. Without it, the headline resized on every frame of
  // the glitch (dozens of tiny layout shifts, which Google counts against the page), and the
  // browser had to re-lay-out the heading each time.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), words[0]);

  return (
    <span className="fx-scramble">
      <span aria-hidden="true" className="fx-scramble-size">
        {longest}
      </span>
      {/* The caller's styling (the gradient fill) goes on the text itself: a gradient painted on
          the wrapper would not reach this layer, and the word would come out invisible. */}
      <span className={`${className} fx-scramble-text`}>
        {chars.map((c, i) => (
          <span key={i} className={c.scrambled ? "fx-glyph" : undefined}>
            {c.ch}
          </span>
        ))}
      </span>
    </span>
  );
}

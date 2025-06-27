import clsx from 'clsx';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

type TypingTextProps = {
  /** The string to type */
  text: string;
  /** Milliseconds per character */
  speed?: number;
  /** Milliseconds to wait before starting each cycle */
  delay?: number;
  /** If true, when typing finishes it'll clear and start over */
  autoplay?: boolean;
  /** Called each time a typing cycle completes */
  onComplete?: () => void;

  className?: string;
};

const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 100,
  delay = 0,
  autoplay = false,
  onComplete,
  className
}) => {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const start = () => {
    // prevent double-start
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setDisplayed((d) => d + text[indexRef.current]);
      indexRef.current++;

      if (indexRef.current >= text.length) {
        clearInterval(intervalRef.current!);
        intervalRef.current = undefined;
        onComplete?.();

        if (autoplay) {
          // reset state then wait `delay` before next cycle
          indexRef.current = 0;
          setDisplayed('');
          timeoutRef.current = setTimeout(start, delay);
        }
      }
    }, speed);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // kick off first cycle after `delay`
    timeoutRef.current = setTimeout(start, delay);

    return () => {
      clearTimeout(timeoutRef.current!);
      clearInterval(intervalRef.current!);
    };
  // note: onComplete is intentionally omitted to avoid restarting on callback change
  }, [text, speed, delay, autoplay]);

  return <p className={clsx(className || "")}>{displayed}</p>;
};

export default TypingText;

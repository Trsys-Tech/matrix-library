"use client";

import * as React from "react";

import { cn } from "../../lib/utils";
import { useVoiceDictation, VoiceDictationButton } from "../voice-dictation/VoiceDictationButton";

const useLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Show a dictation button when the browser supports speech recognition. */
  voiceMode?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, style, voiceMode, disabled, readOnly, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const buttonProps = useVoiceDictation(voiceMode, disabled || readOnly, textareaRef);
  const showDictation = buttonProps !== null;
  const setTextareaRef = React.useCallback(
    (textarea: HTMLTextAreaElement | null) => {
      textareaRef.current = textarea;
      if (typeof ref === "function") return ref(textarea);
      if (ref) ref.current = textarea;
    },
    [ref],
  );

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    const wrapper = textarea?.parentElement;
    if (!showDictation || !textarea || !wrapper) return;

    const positionButton = () => {
      wrapper.style.setProperty("--mtx-textarea-right", `${textarea.offsetLeft + textarea.offsetWidth}px`);
      wrapper.style.setProperty("--mtx-textarea-top", `${textarea.offsetTop}px`);
    };

    positionButton();
    const observer = new ResizeObserver(positionButton);
    observer.observe(textarea, { box: "border-box" });
    observer.observe(wrapper, { box: "border-box" });
    return () => observer.disconnect();
  }, [showDictation, className, style]);

  return (
    <div className={showDictation ? "mtx-relative mtx-w-full" : "mtx-contents"}>
      <textarea
        className={cn(
          "mtx-flex mtx-min-h-[60px] mtx-w-full mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-px-3 mtx-py-2 mtx-text-xs mtx-font-medium mtx-text-text",
          "placeholder:mtx-text-text-300 focus-visible:mtx-outline-none focus-visible:mtx-border-primary disabled:mtx-opacity-50 disabled:mtx-text-text-300 disabled:mtx-bg-gray-100 disabled:mtx-border-gray-100",
          className,
          showDictation && "mtx-pr-8",
        )}
        style={style}
        ref={setTextareaRef}
        disabled={disabled}
        readOnly={readOnly}
        {...props}
      />
      {buttonProps && (
        <VoiceDictationButton
          {...buttonProps}
          className="mtx-absolute mtx-left-[var(--mtx-textarea-right)] mtx-top-[var(--mtx-textarea-top)] -mtx-ml-1.5 mtx-mt-1 -mtx-translate-x-full"
        />
      )}
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };

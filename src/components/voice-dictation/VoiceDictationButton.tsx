"use client";

import * as React from "react";

import { IconButton } from "../icon-botton/IconButton";

interface SpeechRecognition {
  continuous: boolean;
  lang: string;
  onresult: ((event: { resultIndex: number; results: SpeechRecognitionResultList }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  onspeechend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognition;

function getSpeechRecognition() {
  const { SpeechRecognition, webkitSpeechRecognition } = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };

  if (typeof SpeechRecognition === "function") return SpeechRecognition;
  if (typeof webkitSpeechRecognition === "function") return webkitSpeechRecognition;
}

// Browser support is fixed for the lifetime of the page.
const subscribeToSpeechRecognition = () => () => {};
const getServerSpeechRecognition = () => undefined;

type DictationControl = HTMLInputElement | HTMLTextAreaElement;

function isDictationInputType(type?: string) {
  return ["text", "search", "tel", "url"].includes(type?.toLowerCase() || "text");
}

function canDictateInto(control: DictationControl) {
  return !control.matches(":disabled, [readonly]") && (!(control instanceof HTMLInputElement) || isDictationInputType(control.type));
}

function appendTranscript(control: DictationControl, transcript: string) {
  const { value, maxLength } = control;
  const text = transcript.trim();
  if (!text) return;

  const separator = value && !/\s$/.test(value) ? " " : "";
  const availableLength = maxLength < 0 ? Infinity : Math.max(0, maxLength - value.length - separator.length);
  const addition = text
    .slice(0, availableLength)
    .replace(/[\uD800-\uDBFF]$/, "")
    .trimEnd();
  if (!addition) return;

  // Use native DOM methods so React detects the change when the input event bubbles.
  control.setRangeText(separator + addition, value.length, value.length);
  control.dispatchEvent(new Event("input", { bubbles: true }));
}

function useVoiceDictation(enabled: boolean | undefined, disabled: boolean | undefined, controlRef: React.RefObject<DictationControl | null>) {
  const Recognition = React.useSyncExternalStore(subscribeToSpeechRecognition, getSpeechRecognition, getServerSpeechRecognition);
  const sessionRef = React.useRef<{ recognition: SpeechRecognition; cancel: () => void } | null>(null);
  const [dictationState, setDictationState] = React.useState<"idle" | "listening" | "stopping">("idle");
  const isListening = dictationState !== "idle";
  const isStopping = dictationState === "stopping";
  const showDictation = Boolean(enabled && Recognition);
  const canDictate = showDictation && !disabled;

  React.useEffect(() => {
    if (!canDictate) return;

    return () => sessionRef.current?.cancel();
  }, [canDictate]);

  const stopDictation = (recognition: SpeechRecognition) => {
    if (sessionRef.current?.recognition !== recognition) return;
    recognition.onspeechend = null;
    setDictationState("stopping");
    recognition.stop();
  };

  const handleDictation = () => {
    const control = controlRef.current;
    if (!Recognition || !canDictate || !control || !canDictateInto(control) || isStopping) return;

    const currentRecognition = sessionRef.current?.recognition;
    if (currentRecognition) {
      stopDictation(currentRecognition);
      return;
    }

    try {
      const recognition = new Recognition();
      recognition.continuous = false;
      const lang = control.closest("[lang]")?.getAttribute("lang");
      if (lang) recognition.lang = lang;

      const finish = () => {
        if (sessionRef.current?.recognition !== recognition) return;
        sessionRef.current = null;
        observer.disconnect();
        setDictationState("idle");
      };

      const cancel = () => {
        if (sessionRef.current?.recognition !== recognition) return;
        finish();
        recognition.abort();
      };

      const observer = new MutationObserver(() => {
        if (!canDictateInto(control)) cancel();
      });

      recognition.onend = finish;
      recognition.onerror = finish;
      recognition.onspeechend = () => stopDictation(recognition);
      recognition.onresult = ({ resultIndex, results }) => {
        if (sessionRef.current?.recognition !== recognition) return;
        if (!control.isConnected || !canDictateInto(control)) {
          cancel();
          return;
        }

        let transcript = "";
        for (let index = resultIndex; index < results.length; index++) {
          const result = results[index];
          if (result.isFinal) transcript += result[0].transcript;
        }
        appendTranscript(control, transcript);
      };

      sessionRef.current = { recognition, cancel };
      observer.observe(control, { attributeFilter: ["disabled", "readonly", "type"] });
      for (let ancestor = control.parentElement; ancestor; ancestor = ancestor.parentElement) {
        if (ancestor.tagName === "FIELDSET") observer.observe(ancestor, { attributeFilter: ["disabled"] });
      }
      setDictationState("listening");
      recognition.start();
    } catch {
      sessionRef.current?.cancel();
    }
  };

  return showDictation ? { isListening, isStopping, disabled: !canDictate, onClick: handleDictation } : null;
}

interface VoiceDictationButtonProps {
  isListening: boolean;
  isStopping: boolean;
  disabled: boolean;
  className?: string;
  onClick: () => void;
}

function VoiceDictationButton({ isListening, isStopping, disabled, className, onClick }: VoiceDictationButtonProps) {
  return (
    <IconButton
      type="button"
      size="sm"
      variant={isListening ? "danger" : "table"}
      aria-label="Voice dictation"
      aria-pressed={isListening}
      title={isListening ? "Stop dictation" : "Start dictation"}
      disabled={disabled}
      aria-disabled={isStopping || undefined}
      className={className}
      onClick={onClick}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {isListening ? (
          <rect x="6" y="6" width="12" height="12" rx="2" />
        ) : (
          <>
            <rect x="9" y="3" width="6" height="12" rx="3" />
            <path d="M5 11v1a7 7 0 0 0 14 0v-1M12 19v3" />
          </>
        )}
      </svg>
    </IconButton>
  );
}

export { isDictationInputType, useVoiceDictation, VoiceDictationButton };

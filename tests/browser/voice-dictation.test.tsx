import React from "react";
import { createRoot } from "react-dom/client";
import { useForm } from "react-hook-form";
import { afterEach, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { Form } from "../../src/components/form/Form";
import { FormInput } from "../../src/components/form-input/FormInput";
import { FormTextarea } from "../../src/components/form-textarea/FormTextarea";
import { TextField } from "../../src/components/text-field/TextField";
import { Textarea } from "../../src/components/textarea/Textarea";

class MockSpeechRecognition {
  static current: MockSpeechRecognition;

  continuous = true;
  lang = "";
  start = vi.fn();
  stop = vi.fn();
  abort = vi.fn();
  onend?: () => void;
  onerror?: () => void;
  onspeechend?: (() => void) | null;
  onresult?: (event: { resultIndex: number; results: { 0: { transcript: string }; isFinal: boolean }[] }) => void;

  constructor() {
    MockSpeechRecognition.current = this;
  }

  report(resultIndex: number, ...results: { transcript: string; isFinal: boolean }[]) {
    this.onresult?.({
      resultIndex,
      results: results.map(({ transcript, isFinal }) => ({ 0: { transcript }, isFinal })),
    });
  }

  finish(transcript: string) {
    this.onspeechend?.();
    this.report(0, { transcript, isFinal: true });
    this.onend?.();
  }
}

let root: ReturnType<typeof createRoot> | undefined;
let container: HTMLDivElement | undefined;

afterEach(() => {
  root?.unmount();
  container?.remove();
  vi.unstubAllGlobals();
});

function mount(content: React.ReactNode) {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  root.render(content);
  return root;
}

const dictationButton = page.getByRole("button", { name: "Voice dictation" });

test("dictation is opt-in and requires a recognition constructor", async () => {
  vi.stubGlobal("SpeechRecognition", undefined);
  vi.stubGlobal("webkitSpeechRecognition", undefined);
  const mounted = mount(<Textarea voiceMode aria-label="Note" />);
  await expect.element(page.getByRole("textbox", { name: "Note" })).toBeVisible();
  await expect.element(dictationButton).not.toBeInTheDocument();

  vi.stubGlobal("SpeechRecognition", MockSpeechRecognition);
  mounted.render(<Textarea aria-label="Draft" />);
  await expect.element(page.getByRole("textbox", { name: "Draft" })).toBeVisible();
  await expect.element(dictationButton).not.toBeInTheDocument();
});

test("changing voiceMode preserves the textarea node, edits, focus and selection", async () => {
  vi.stubGlobal("SpeechRecognition", MockSpeechRecognition);
  const mounted = mount(<Textarea aria-label="Draft" defaultValue="Initial" />);
  const draft = page.getByRole("textbox", { name: "Draft" });
  await draft.fill("Edited draft");
  const textarea = (await draft.element()) as HTMLTextAreaElement;
  textarea.setSelectionRange(2, 6);

  for (const voiceMode of [true, false, true, undefined]) {
    mounted.render(<Textarea aria-label="Draft" defaultValue="Initial" voiceMode={voiceMode} />);
    if (voiceMode) {
      await expect.element(dictationButton).toBeVisible();
    } else {
      await expect.element(dictationButton).not.toBeInTheDocument();
    }
    expect(await draft.element()).toBe(textarea);
    await expect.element(draft).toHaveValue("Edited draft");
    await expect.element(draft).toHaveFocus();
    expect([textarea.selectionStart, textarea.selectionEnd]).toEqual([2, 6]);
  }
});

test("the microphone follows the textarea's class and inline widths", async () => {
  vi.stubGlobal("SpeechRecognition", MockSpeechRecognition);
  const note = (style?: React.CSSProperties) => (
    <div style={{ width: 600 }}>
      <Textarea aria-label="Note" voiceMode className="mtx-w-40 mtx-mx-auto" style={style} />
    </div>
  );
  const mounted = mount(note());
  const textarea = page.getByRole("textbox", { name: "Note" });
  await expect.element(textarea).toBeVisible();
  const field = await textarea.element();
  const mic = await dictationButton.element();
  const checkPosition = async (width: number) => {
    await expect.poll(() => field.getBoundingClientRect().width).toBe(width);
    await expect.poll(() => field.getBoundingClientRect().right - mic.getBoundingClientRect().right).toBeCloseTo(6);
    expect(mic.getBoundingClientRect().top - field.getBoundingClientRect().top).toBeCloseTo(4);
  };

  await checkPosition(160);
  mounted.render(note({ width: 120 }));
  await checkPosition(120);
});

test("disabling an enclosing fieldset aborts the session and discards late results", async () => {
  vi.stubGlobal("SpeechRecognition", MockSpeechRecognition);
  const example = (
    <fieldset>
      <fieldset>
        <Textarea voiceMode aria-label="Note" defaultValue="Draft" />
      </fieldset>
    </fieldset>
  );
  mount(example);
  await dictationButton.click();
  const recognition = MockSpeechRecognition.current;
  const textarea = page.getByRole("textbox", { name: "Note" });
  const fieldset = (await textarea.element()).closest("fieldset")!.parentElement as HTMLFieldSetElement;
  fieldset.disabled = true;
  await expect.element(dictationButton).toBeDisabled();
  await expect.poll(() => recognition.abort.mock.calls.length).toBe(1);

  fieldset.disabled = false;
  await expect.element(dictationButton).toHaveAttribute("aria-pressed", "false");
  recognition.finish("late result");
  await expect.element(textarea).toHaveValue("Draft");

  await dictationButton.click();
  expect(MockSpeechRecognition.current).not.toBe(recognition);
  MockSpeechRecognition.current.finish("new result");
  await expect.element(textarea).toHaveValue("Draft new result");
});

test("dictation uses the standard API and appends new final results through onChange", async () => {
  vi.stubGlobal("SpeechRecognition", MockSpeechRecognition);
  const onChange = vi.fn();
  const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
  const textareaRef = React.createRef<HTMLTextAreaElement>();

  function Example() {
    const [value, setValue] = React.useState("Typed");
    return (
      <form lang="en-GB" onSubmit={onSubmit}>
        <Textarea
          voiceMode
          aria-label="Note"
          ref={textareaRef}
          value={value}
          onChange={event => {
            onChange(event.currentTarget.value);
            setValue(event.currentTarget.value);
          }}
        />
      </form>
    );
  }

  mount(<Example />);
  const textarea = page.getByRole("textbox", { name: "Note" });
  await expect.element(textarea).toHaveValue("Typed");
  const textareaElement = await textarea.element();
  expect(textareaRef.current).toBe(textareaElement);
  const textareaBounds = textareaElement.getBoundingClientRect();
  const buttonBounds = (await dictationButton.element()).getBoundingClientRect();
  expect(buttonBounds.top - textareaBounds.top).toBeLessThanOrEqual(8);
  expect(textareaBounds.right - buttonBounds.right).toBeLessThanOrEqual(8);

  await textarea.click();
  await userEvent.tab();
  await expect.element(dictationButton).toHaveFocus();
  await userEvent.keyboard("{Enter}");
  await expect.element(dictationButton).toHaveAttribute("aria-pressed", "true");
  const recognition = MockSpeechRecognition.current;
  expect(recognition.start).toHaveBeenCalledOnce();
  expect(recognition.continuous).toBe(false);
  expect(recognition.lang).toBe("en-GB");
  expect(onSubmit).not.toHaveBeenCalled();

  await textarea.fill("Edited");
  await dictationButton.click();
  expect(recognition.stop).toHaveBeenCalledOnce();
  recognition.report(0, { transcript: "hello", isFinal: true });
  recognition.onend?.();

  await expect.element(textarea).toHaveValue("Edited hello");
  await expect.element(dictationButton).toHaveAttribute("aria-pressed", "false");
  expect(onChange.mock.calls).toEqual([["Edited"], ["Edited hello"]]);
});

test("dictation stops on speech end and keeps the final result", async () => {
  vi.stubGlobal("SpeechRecognition", MockSpeechRecognition);
  mount(<Textarea voiceMode aria-label="Note" />);

  await dictationButton.click();
  const recognition = MockSpeechRecognition.current;
  recognition.onspeechend?.();
  expect(recognition.stop).toHaveBeenCalledOnce();

  recognition.report(0, { transcript: "Finished speaking", isFinal: true });
  recognition.onend?.();

  await expect.element(page.getByRole("textbox", { name: "Note" })).toHaveValue("Finished speaking");
  await expect.element(dictationButton).toHaveAttribute("aria-pressed", "false");
});

test("the prefixed API handles errors and releases the microphone when dictation is disabled", async () => {
  vi.stubGlobal("SpeechRecognition", undefined);
  vi.stubGlobal("webkitSpeechRecognition", MockSpeechRecognition);
  const note = (options: { voiceMode?: boolean; disabled?: boolean; readOnly?: boolean } = {}) => (
    <Textarea voiceMode defaultValue="Note" maxLength={10} aria-label="Note" {...options} />
  );
  const mounted = mount(note({ readOnly: true }));
  await expect.element(dictationButton).toBeDisabled();

  mounted.render(note({ disabled: true }));
  await expect.element(page.getByRole("textbox", { name: "Note" })).toBeDisabled();
  await expect.element(dictationButton).toBeDisabled();
  mounted.render(note());
  await dictationButton.click();
  const failedRecognition = MockSpeechRecognition.current;
  failedRecognition.onerror?.();
  await expect.element(dictationButton).toHaveAttribute("aria-pressed", "false");

  await dictationButton.click();
  const recognition = MockSpeechRecognition.current;
  expect(recognition).not.toBe(failedRecognition);
  recognition.report(0, { transcript: "hello world", isFinal: true });
  const textarea = page.getByRole("textbox", { name: "Note" });
  await expect.element(textarea).toHaveValue("Note hello");

  mounted.render(note({ voiceMode: false }));
  await expect.element(dictationButton).not.toBeInTheDocument();
  await expect.poll(() => recognition.abort.mock.calls.length).toBe(1);
  await expect.element(textarea).toHaveValue("Note hello");
});

test("TextField uses the native input slot and only shows dictation for text-entry types", async () => {
  vi.stubGlobal("SpeechRecognition", MockSpeechRecognition);
  const inputRef = React.createRef<HTMLInputElement>();
  const onChange = vi.fn();
  const mounted = mount(
    <TextField
      voiceMode
      type="number"
      suffix="Search"
      slotProps={{
        inputProps: { type: "search", "aria-label": "Search query", ref: inputRef, onChange: event => onChange(event.currentTarget.value) },
      }}
    />,
  );

  const input = page.getByRole("searchbox", { name: "Search query" });
  await expect.element(input).toBeVisible();
  expect(inputRef.current).toBe(await input.element());
  await dictationButton.click();
  MockSpeechRecognition.current.finish("search query");
  await expect.element(input).toHaveValue("search query");
  expect(onChange).toHaveBeenCalledExactlyOnceWith("search query");

  mounted.render(<TextField voiceMode type="number" slotProps={{ inputProps: { "aria-label": "Quantity" } }} />);
  await expect.element(page.getByRole("spinbutton", { name: "Quantity" })).toBeVisible();
  await expect.element(dictationButton).not.toBeInTheDocument();
});

test.each([
  { type: "password", multiple: false },
  { type: "email", multiple: false },
  { type: "email", multiple: true },
])("dictation is unavailable for $type inputs (multiple: $multiple)", async inputProps => {
  vi.stubGlobal("SpeechRecognition", MockSpeechRecognition);
  mount(<TextField voiceMode slotProps={{ inputProps: { ...inputProps, "aria-label": "Restricted field" } }} />);
  await expect.element(page.getByLabelText("Restricted field")).toBeVisible();
  expect(dictationButton.query()).toBeNull();
});

test("direct voiceMode props dictate into both form values and override their slot defaults", async () => {
  vi.stubGlobal("SpeechRecognition", MockSpeechRecognition);
  const onSubmit = vi.fn();

  function Example({ voiceMode, readOnly, disabled }: { voiceMode: boolean; readOnly?: boolean; disabled?: boolean }) {
    const form = useForm({ defaultValues: { subject: "Subject", note: "Note" }, disabled });

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(data => onSubmit(data))}>
          <fieldset>
            <legend>Subject field</legend>
            <FormInput
              name="subject"
              label="Subject"
              control={form.control}
              voiceMode={voiceMode}
              readOnly={readOnly}
              slotProps={{ textFieldProps: { voiceMode: !voiceMode } }}
            />
          </fieldset>
          <fieldset>
            <legend>Note field</legend>
            <FormTextarea
              name="note"
              label="Note"
              control={form.control}
              disabled={false}
              voiceMode={voiceMode}
              readOnly={readOnly}
              slotProps={{ textareaProps: { voiceMode: !voiceMode } }}
            />
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </Form>
    );
  }

  const mounted = mount(<Example voiceMode />);
  const subjectButton = page.getByRole("group", { name: "Subject field" }).getByRole("button", { name: "Voice dictation" });
  const noteButton = page.getByRole("group", { name: "Note field" }).getByRole("button", { name: "Voice dictation" });
  await subjectButton.click();
  MockSpeechRecognition.current.finish("line");
  await noteButton.click();
  MockSpeechRecognition.current.finish("body");

  expect(onSubmit).not.toHaveBeenCalled();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect.poll(() => onSubmit.mock.calls).toEqual([[{ subject: "Subject line", note: "Note body" }]]);

  mounted.render(<Example voiceMode readOnly />);
  await expect.element(subjectButton).toBeDisabled();
  await expect.element(noteButton).toBeDisabled();

  mounted.render(<Example voiceMode disabled />);
  await expect.element(page.getByRole("textbox", { name: "Subject" })).toBeDisabled();
  await expect.element(page.getByRole("textbox", { name: "Note" })).toBeDisabled();
  await expect.element(subjectButton).toBeDisabled();
  await expect.element(noteButton).toBeDisabled();

  mounted.render(<Example voiceMode={false} />);
  await expect.element(subjectButton).not.toBeInTheDocument();
  await expect.element(noteButton).not.toBeInTheDocument();
});

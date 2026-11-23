import React from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { Combobox } from "../../src/components/combobox/Combobox";
import { MultiSelect } from "../../src/components/multi-select/MultiSelect";

let root: ReturnType<typeof createRoot>;
let container: HTMLDivElement;
afterEach(() => {
  root?.unmount();
  container?.remove();
});
function mount(content: React.ReactNode) {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  root.render(content);
}

const options = [{ label: "Apple", value: "Apple" }];

test("combobox creates and retains an option with the button", async () => {
  const onChange = vi.fn();
  function Example() {
    const [value, setValue] = React.useState<string>();
    return (
      <Combobox
        options={options}
        value={value}
        onValueChange={v => {
          onChange(v);
          setValue(v);
        }}
        addOptionOnSearchNotFound
      />
    );
  }
  mount(<Example />);
  await page.getByRole("combobox").click();
  const input = page.getByPlaceholder("Search...");
  await expect.element(page.getByRole("button", { name: "Add option" })).toBeDisabled();
  await input.fill("Apple");
  await expect.element(page.getByRole("button", { name: "Add option" })).toBeDisabled();
  await input.fill("   ");
  await expect.element(page.getByRole("button", { name: "Add option" })).toBeDisabled();
  await input.fill(" App ");
  await userEvent.tab();
  await expect.element(page.getByRole("button", { name: "Add option" })).toHaveFocus();
  await userEvent.keyboard("{Enter}");
  expect(onChange).toHaveBeenCalledWith("App");
  await expect.element(page.getByRole("combobox")).toHaveTextContent("App");
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "App", exact: true }).click();
  expect(onChange.mock.calls).toEqual([["App"], ["App"]]);
  await expect.element(page.getByRole("combobox")).toHaveTextContent("App");
});

test("combobox selects highlighted matches and resets the search on close", async () => {
  const onChange = vi.fn();
  mount(
    <Combobox
      aria-label="Choose an option"
      options={[{ label: "Tesla", value: "tesla" }, ...options]}
      onValueChange={onChange}
      addOptionOnSearchNotFound
    />,
  );
  const trigger = page.getByRole("combobox", { name: "Choose an option" });
  const input = page.getByPlaceholder("Search...");
  const addOption = page.getByRole("button", { name: "Add option" });
  await trigger.click();
  await input.fill(" Tesla ");
  await expect.element(addOption).toBeDisabled();
  await input.fill("Tes");
  await expect.element(addOption).toBeEnabled();
  await expect.element(page.getByRole("option", { name: "Tesla" })).toHaveAttribute("aria-selected", "true");
  await userEvent.keyboard("{Enter}");
  expect(onChange.mock.calls).toEqual([["tesla"]]);
  await trigger.click();
  await expect.element(input).toHaveValue("");
  await expect.element(page.getByRole("option", { name: "Apple" })).toBeInTheDocument();
  await input.fill("Pear");
  await expect.element(page.getByText("No results found")).toBeInTheDocument();
  await userEvent.keyboard("{Enter}");
  expect(onChange.mock.calls).toEqual([["tesla"], ["Pear"]]);
});

test("combobox waits for IME composition before creating an option with Enter", async () => {
  const onChange = vi.fn();
  mount(<Combobox options={options} onValueChange={onChange} addOptionOnSearchNotFound />);
  await page.getByRole("combobox").click();
  const input = page.getByPlaceholder("Search...");
  await input.fill("nihon");
  await expect.element(page.getByRole("button", { name: "Add option" })).toBeEnabled();
  const inputElement = await input.element();
  for (const composition of [{ isComposing: true }, { keyCode: 229 }]) {
    const composingEnter = new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true, ...composition });
    inputElement.dispatchEvent(composingEnter);
    expect(composingEnter.defaultPrevented).toBe(false);
  }
  expect(onChange).not.toHaveBeenCalled();
  await expect.element(input).toHaveValue("nihon");

  await input.fill("日本");
  await userEvent.keyboard("{Enter}");
  expect(onChange.mock.calls).toEqual([["日本"]]);
});

test("multi-select creates options by button and Enter", async () => {
  const onChange = vi.fn();
  mount(<MultiSelect options={options} onValueChange={onChange} addOptionOnSearchNotFound />);
  await page.getByRole("button", { name: /Select options/ }).click();
  const input = page.getByPlaceholder("Search...");
  await input.fill("Pear");
  await userEvent.tab();
  await expect.element(page.getByRole("button", { name: "Add option" })).toHaveFocus();
  await userEvent.keyboard("{Enter}");
  expect(onChange).toHaveBeenLastCalledWith(["Pear"]);
  await input.fill("Peach");
  await userEvent.keyboard("{Enter}");
  expect(onChange).toHaveBeenLastCalledWith(["Pear", "Peach"]);
  await userEvent.keyboard("{Enter}");
  expect(onChange.mock.calls).toEqual([[["Pear"]], [["Pear", "Peach"]]]);
  await expect.element(page.getByRole("option", { name: "Peach" })).toBeInTheDocument();
});

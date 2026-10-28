import React from "react";
import { createRoot } from "react-dom/client";
import { composeStories } from "@storybook/react-vite";
import { afterEach, expect, test } from "vitest";
import { page } from "vitest/browser";

import * as stories from "../../src/components/resource-scheduler/ResourceScheduler.stories";
import { toDateOnlyString } from "../../src/components/date-picker/dateValue";

const { TodayAndCellButtons } = composeStories(stories);

let root: ReturnType<typeof createRoot> | undefined;
let container: HTMLDivElement;
afterEach(() => {
  root?.unmount();
  container?.remove();
});

test("reveals the cell action on pointer hover", async () => {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  root.render(<TodayAndCellButtons />);

  const today = toDateOnlyString(new Date())!;
  const button = page.getByRole("button", { name: `Add delivery for greenview on ${today}` });
  const cell = page.getByRole("cell").filter({ has: button });
  await expect.element(button).toBeInTheDocument();
  await expect.poll(() => getComputedStyle(button.element().parentElement!).opacity).toBe("0");
  await cell.hover();
  await expect.poll(() => getComputedStyle(button.element().parentElement!).opacity).toBe("1");
  await cell.unhover();
  await expect.poll(() => getComputedStyle(button.element().parentElement!).opacity).toBe("0");
});

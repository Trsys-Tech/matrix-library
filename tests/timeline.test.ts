import { assert, test } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Timeline, type TimelineProps, type TimelineBranch, type TimelineItem } from "../src/components/timeline/Timeline";

const items: TimelineItem[] = [
  { id: "start", label: "Start", status: "completed" },
  { id: "review", label: "Review", status: "active", superTitle: "Priority", superSubtitle: "High", subData: "Team", footer: "Any string" },
  { id: "end", label: "End" },
];
const render = (props: Partial<TimelineProps> = {}) => renderToStaticMarkup(React.createElement(Timeline, { items, ...props }));

test("renders arbitrary content and accessible statuses without requiring branches", () => {
  const html = render({ title: "Workflow" });
  for (const text of ["Workflow", "Priority", "High", "Team", "Any string", "completed", "pending"]) assert.ok(html.includes(text));
  assert.match(html, /Priority<\/div><div class="mtx-font-semibold">High<\/div>/);
  assert.strictEqual((html.match(/aria-current="step"/g) ?? []).length, 1);
  assert.match(html, /class="mtx-font-medium mtx-text-text-400">End<\/div>/);
  assert.notMatch(html, /mtx-timeline-branch-path/);
});

test("branch activation and colors are controlled independently", () => {
  const branch: TimelineBranch = { id: "alternate", from: "start", label: "Alternate", status: "error", activeColor: "#123456" };
  const active = render({ branches: [{ ...branch, active: true }] });
  assert.match(active, /data-active="true"/);
  assert.match(active, /color:#123456/);
  const inactive = render({ branches: [{ ...branch, active: false }] });
  assert.notMatch(inactive, /#123456|data-active/);
  assert.match(inactive, /Branch from Start/);
});

test("empty and single-step timelines and invalid origins render safely", () => {
  assert.doesNotThrow(() => render({ items: [] }));
  const html = render({
    items: [items[0]],
    branches: [
      { id: "a", from: "missing", label: "Invalid" },
      { id: "b", from: "start", label: "No span" },
    ],
  });
  assert.notMatch(html, /mtx-timeline-branch-path|mtx-timeline-connector/);
});

test("explicit connector overrides and localized statuses survive rendering", () => {
  const html = render({
    items: [items[0], { ...items[1], connectorColor: "purple", statusLabel: "In Prüfung" }, { ...items[2], connectorColor: false }],
  });
  assert.match(html, /background-color:purple/);
  assert.match(html, /In Prüfung/);
  assert.strictEqual((html.match(/background-color:/g) ?? []).length, 1);
});

test("loading renders a structure-preserving skeleton from items and branches", () => {
  const html = render({
    loading: true,
    title: "Tender Timeline",
    branches: [
      { id: "alternate", from: "review", label: "Alternate" },
      { id: "invalid", from: "missing", label: "Invalid" },
    ],
  });
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /data-loading="true"/);
  assert.strictEqual((html.match(/data-slot="timeline-skeleton-item"/g) ?? []).length, items.length);
  assert.strictEqual((html.match(/data-slot="timeline-skeleton-branch"/g) ?? []).length, 1);
  assert.strictEqual((html.match(/mtx-animate-pulse/g) ?? []).length, items.length * 6 + (items.length - 1) + 4);
  assert.notMatch(html, /Start|Review|Alternate|Invalid/);
});

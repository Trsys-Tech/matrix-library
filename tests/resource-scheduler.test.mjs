import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ResourceScheduler } from "../dist/resourcescheduler.es.js";

const resources = [
  { id: "first", label: "First resource" },
  { id: "second", label: "Second resource" },
];
const item = {
  id: "delivery",
  resourceId: "first",
  date: "2026-09-14",
  content: React.createElement("button", { type: "button" }, "Custom card action"),
};
const render = props =>
  renderToStaticMarkup(React.createElement(ResourceScheduler, { resources, from: "2026-09-13", to: "2026-09-19", defaultItems: [item], ...props }));

test("highlights only today's local header and resource cells when the date is in range", () => {
  const now = new Date();
  const day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const html = render({ from: yesterday, to: tomorrow });
  assert.equal((html.match(/data-today="true"/g) ?? []).length, 3);
  assert.match(html, new RegExp(`role="columnheader" data-date="${day}" data-today="true" aria-current="date" class="[^"]*mtx-bg-primary-50`));
  assert.equal((html.match(/data-today="true"[^>]*class="[^"]*mtx-bg-gray-50/g) ?? []).length, 2);
  assert.doesNotMatch(render({ from: yesterday, to: yesterday }), /data-today|aria-current="date"/);
});

test("custom cell buttons receive resource, date and ordered items and can be omitted per cell", () => {
  const cells = [];
  const html = render({
    renderCellButton: cell => {
      cells.push(cell);
      return React.createElement("button", { type: "button" }, `Add ${cell.resource.id} ${cell.date}`);
    },
    showCellButton: ({ resource, date }) => resource.id === "first" && date === item.date,
  });
  assert.equal(cells.length, 1);
  assert.deepEqual(cells[0], { resource: resources[0], date: item.date, items: [item] });
  assert.match(html, /Add first 2026-09-14/);
  assert.doesNotMatch(html, /Add second/);
});

test("custom actions are optional, can be hidden globally and are hidden when disabled", () => {
  let calls = 0;
  const renderCellButton = () => {
    calls++;
    return React.createElement("button", { type: "button" }, "Cell action");
  };
  assert.doesNotMatch(render(), /Cell action/);
  assert.doesNotMatch(render({ renderCellButton, showCellButton: false }), /Cell action/);
  assert.doesNotMatch(render({ renderCellButton, disabled: true }), /Cell action/);
  assert.equal(calls, 0);
  assert.equal((render({ renderCellButton }).match(/Cell action/g) ?? []).length, 14);
  assert.doesNotMatch(render({ renderCellButton: () => null }), /mtx-bottom-1.5/);
});

test("renders an inclusive date range with empty resource rows and arbitrary card nodes", () => {
  const html = render();
  assert.equal((html.match(/role="columnheader"/g) ?? []).length, 8);
  assert.equal((html.match(/role="cell"/g) ?? []).length, 14);
  assert.match(html, /First resource/);
  assert.match(html, /Second resource/);
  assert.match(html, /<button type="button">Custom card action<\/button>/);
  assert.match(html, /data-date="2026-09-19"/);
});

test("uses local calendar days for native timestamps and date-only strings, including DST boundaries", () => {
  const previousTimezone = process.env.TZ;
  process.env.TZ = "America/New_York";
  try {
    const html = render({ from: "2026-03-07", to: "2026-03-09", items: [{ ...item, date: new Date(2026, 2, 8, 23, 30) }] });
    assert.equal((html.match(/role="cell"/g) ?? []).length, 6);
    assert.match(html, /data-date="2026-03-08"[^]*?data-item-id="delivery"/);
    assert.equal((html.match(/data-item-id="delivery"/g) ?? []).length, 1);
  } finally {
    if (previousTimezone === undefined) delete process.env.TZ;
    else process.env.TZ = previousTimezone;
  }
});

test("controlled empty items override defaults and invalid or outside-range items stay hidden", () => {
  assert.doesNotMatch(render({ items: [] }), /Custom card action/);
  const html = render({
    items: [
      { ...item, id: "outside", date: "2026-09-20" },
      { ...item, id: "invalid", date: "2026-02-30" },
      { ...item, id: "unknown", resourceId: "missing" },
    ],
  });
  assert.doesNotMatch(html, /data-item-id=/);
});

test("invalid and reversed ranges produce no day cells rather than looping or normalizing dates", () => {
  assert.doesNotMatch(render({ from: "2026-09-19", to: "2026-09-13" }), /role="cell"/);
  assert.doesNotMatch(render({ from: "2026-02-30" }), /role="cell"/);
  assert.equal((render({ from: "2026-09-14", to: "2026-09-14" }).match(/role="cell"/g) ?? []).length, 2);
});

test("global and item-level disabling prevents drag affordances while preserving content", () => {
  for (const html of [render({ disabled: true }), render({ items: [{ ...item, draggable: false }] })]) {
    assert.match(html, /draggable="false"/);
    assert.doesNotMatch(html, /tabindex="0"|mtx-cursor-grab/);
    assert.match(html, /Custom card action/);
  }
});

test("slot customization and root attributes coexist with required structure", () => {
  const html = render({
    "data-consumer": "calendar",
    slotProps: { card: { className: "custom-card", title: "Card details" }, cell: { className: "custom-cell" } },
  });
  assert.match(html, /data-consumer="calendar"/);
  assert.match(html, /title="Card details"/);
  assert.match(html, /custom-card/);
  assert.match(html, /custom-cell/);
  assert.match(html, /aria-describedby=/);
});

test("accepts numeric resource and item ids, including zero and distinct string ids", () => {
  const html = render({
    resources: [
      { id: 0, label: "Numeric resource" },
      { id: "0", label: "String resource" },
    ],
    items: [
      { ...item, id: 0, resourceId: 0 },
      { ...item, id: "0", resourceId: "0" },
    ],
  });
  assert.equal((html.match(/data-item-id="0"/g) ?? []).length, 2);
  assert.equal((html.match(/aria-label="0"/g) ?? []).length, 2);
});

test("formats each header with a function returning arbitrary React content", () => {
  const dates = [];
  const html = render({
    from: "2026-09-13",
    to: "2026-09-15",
    formatter: date => {
      dates.push(date.getDate());
      return React.createElement("b", null, `Day ${date.getDate()}`);
    },
  });
  assert.match(html, /<b>Day 13<\/b>/);
  assert.match(html, /<b>Day 14<\/b>/);
  assert.match(html, /<b>Day 15<\/b>/);
  assert.deepEqual(dates, [13, 14, 15]);
});

test("stacks cards by local time while preserving input order for equal times", () => {
  const html = render({
    items: [
      { ...item, id: "late", date: new Date(2026, 8, 14, 14) },
      { ...item, id: "early", date: new Date(2026, 8, 14, 9) },
      { ...item, id: "date-only" },
      { ...item, id: "same-time", date: new Date(2026, 8, 14, 14) },
    ],
  });
  assert.deepEqual(
    [...html.matchAll(/data-item-id="([^"]+)"/g)].map(match => match[1]),
    ["date-only", "early", "late", "same-time"],
  );
});

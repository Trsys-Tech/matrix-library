import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { toDate } from "../dist/gantt-chart.es.js";
import { GanttChart } from "../dist/ganttchart.es.js";

test("rejects invalid date-only values instead of normalizing them", () => {
  assert.equal(toDate("2026-02-30"), null);
  assert.equal(toDate("2026-13-01"), null);
  assert.equal(toDate("2025-02-29"), null);

  const leapDay = toDate("2024-02-29");

  assert.ok(leapDay);
  assert.deepEqual([leapDay.getFullYear(), leapDay.getMonth(), leapDay.getDate()], [2024, 1, 29]);
});

test("renders table headers inside rows", () => {
  const html = renderToStaticMarkup(
    React.createElement(GanttChart, {
      items: [{ id: "task", name: "Task", start: "2026-01-01", end: "2026-01-02" }],
      startDate: "2026-01-01",
      endDate: "2026-03-31",
      highlightedDate: null,
      showFullscreen: false,
    }),
  );

  assert.match(html, /role="rowgroup"><div[^>]*role="row"><div[^>]*role="columnheader"/);
  assert.doesNotMatch(html, /role="rowgroup"><div[^>]*role="columnheader"/);
});

test("does not render fullscreen controls without browser support", () => {
  const html = renderToStaticMarkup(
    React.createElement(GanttChart, {
      items: [],
      highlightedDate: null,
      showFullscreen: true,
    }),
  );

  assert.doesNotMatch(html, /aria-label="Toggle fullscreen"/);
});

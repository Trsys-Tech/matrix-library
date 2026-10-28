import { assert, test } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { toDate } from "../src/components/gantt-chart/gantt-chart.utils";
import { GanttChart } from "../src/components/gantt-chart/GanttChart";

test("rejects invalid date-only values instead of normalizing them", () => {
  assert.strictEqual(toDate("2026-02-30"), null);
  assert.strictEqual(toDate("2026-13-01"), null);
  assert.strictEqual(toDate("2025-02-29"), null);

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
  assert.notMatch(html, /role="rowgroup"><div[^>]*role="columnheader"/);
});

test("does not render fullscreen controls without browser support", () => {
  const html = renderToStaticMarkup(
    React.createElement(GanttChart, {
      items: [],
      highlightedDate: null,
      showFullscreen: true,
    }),
  );

  assert.notMatch(html, /aria-label="Toggle fullscreen"/);
});

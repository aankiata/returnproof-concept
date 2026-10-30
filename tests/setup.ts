import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Explicit cleanup: vitest globals are not enabled, so Testing Library cannot register its own.
afterEach(() => {
  cleanup();
});

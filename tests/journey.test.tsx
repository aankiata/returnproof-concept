import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConceptApp } from "../components/ConceptApp";
import { defaultSupportMessage } from "../data/scenario";

const ORDER_ID = "DEMO-OD-7Q2K-0001";

// Words a customer should never see in this prototype: engineering terms and unsupported conclusions.
const FORBIDDEN = /reconcil|payload|json|ingest|\bR0\d\b|\bevent\b|rule set|verified|failed|failure|fraud|fault|blame|guarantee|ticket number/i;

function allScreenText(): string {
  return document.body.textContent ?? "";
}

function messageBox(): HTMLTextAreaElement {
  return screen.getByLabelText(/Your message to support/) as HTMLTextAreaElement;
}

async function openHelp(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: "View return details" }));
  await user.click(screen.getByRole("button", { name: "Get help with this return" }));
}

describe("ReturnProof concept: the primary journey", () => {
  it("runs end to end with synthetic data, a review step, back navigation and no network calls", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    render(<ConceptApp />);

    // Order details
    expect(screen.getByRole("heading", { level: 1, name: "Order details" })).toBeTruthy();
    expect(screen.getByText("Printed Straight Kurti")).toBeTruthy();
    expect(screen.getByText(ORDER_ID)).toBeTruthy();
    expect(screen.getByText("Pickup pending")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "View return details" }));

    // Return details: the timeline
    expect(screen.getByRole("heading", { level: 1, name: "Return details" })).toBeTruthy();
    const progress = screen.getByRole("list", { name: "Return progress" });
    expect(within(progress).getByText("Pickup activity recorded")).toBeTruthy();
    expect(within(progress).getByText("Awaiting confirmation")).toBeTruthy();
    expect(within(progress).getByText("In progress", { exact: false })).toBeTruthy();

    // Pickup details: the explanation and the expandable section
    await user.click(screen.getByRole("button", { name: "Pickup details" }));
    expect(screen.getByRole("heading", { name: "Pickup status details" })).toBeTruthy();
    expect(screen.getByText("Your pickup status hasn't updated yet.")).toBeTruthy();
    expect(screen.getByText(/doesn't mean the pickup didn't happen/)).toBeTruthy();
    const toggle = screen.getByRole("button", { name: "Show pickup details" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Demo Logistics Partner (synthetic)")).toBeNull();
    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Demo Logistics Partner (synthetic)")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Hide pickup details" }));
    expect(screen.queryByText("Demo Logistics Partner (synthetic)")).toBeNull();

    await user.click(screen.getByRole("button", { name: "Back to timeline" }));
    await user.click(screen.getByRole("button", { name: "Get help with this return" }));

    // Help: details carried over, message prefilled and editable
    expect(screen.getByRole("heading", { level: 2, name: "Get help with this return" })).toBeTruthy();
    expect(screen.getByText(ORDER_ID)).toBeTruthy();
    expect(screen.getByText("Pickup scheduled")).toBeTruthy();
    expect(messageBox().value).toBe(defaultSupportMessage);
    await user.clear(messageBox());
    await user.type(messageBox(), "The rider took the parcel at the gate.");
    await user.click(screen.getByRole("button", { name: "Review summary" }));

    // Review: read-only, and nothing has been confirmed yet
    expect(screen.getByRole("heading", { level: 2, name: "Review your support request" })).toBeTruthy();
    expect(screen.getByText("The rider took the parcel at the gate.")).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Your return issue summary is ready." })).toBeNull();
    await user.click(screen.getByRole("button", { name: "Confirm and prepare summary" }));

    // Confirmation: explicit that this is a prototype and nothing was sent
    expect(screen.getByRole("heading", { level: 2, name: "Your return issue summary is ready." })).toBeTruthy();
    expect(screen.getByText(/nothing has been sent/)).toBeTruthy();
    expect(screen.getByText("The rider took the parcel at the gate.")).toBeTruthy();
    expect(screen.queryByText(/ticket|reference number|refund/i)).toBeNull();

    // Back navigation returns to the screen that was actually shown before
    await user.click(screen.getByRole("button", { name: "Go back" }));
    expect(screen.getByRole("heading", { level: 2, name: "Review your support request" })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Edit message" }));
    expect(messageBox().value).toBe("The rider took the parcel at the gate.");
    await user.click(screen.getByRole("button", { name: "Go back" }));
    expect(screen.getByRole("heading", { level: 1, name: "Return details" })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Go back" }));
    expect(screen.getByRole("heading", { level: 1, name: "Order details" })).toBeTruthy();

    // Nothing in this journey may reach the network
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("returns to the order screen and resets the message when the demo is restarted", async () => {
    const user = userEvent.setup();
    render(<ConceptApp />);
    await openHelp(user);
    await user.clear(messageBox());
    await user.type(messageBox(), "Some other text");

    await user.click(screen.getByRole("button", { name: "Restart demo" }));
    expect(screen.getByRole("heading", { level: 1, name: "Order details" })).toBeTruthy();

    await openHelp(user);
    expect(messageBox().value).toBe(defaultSupportMessage);
  });

  it("offers two ways back from the confirmation screen", async () => {
    const user = userEvent.setup();
    render(<ConceptApp />);
    await openHelp(user);
    await user.click(screen.getByRole("button", { name: "Review summary" }));
    await user.click(screen.getByRole("button", { name: "Confirm and prepare summary" }));

    await user.click(screen.getByRole("button", { name: "Back to return details" }));
    expect(screen.getByRole("heading", { level: 1, name: "Return details" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Get help with this return" }));
    await user.click(screen.getByRole("button", { name: "Review summary" }));
    await user.click(screen.getByRole("button", { name: "Confirm and prepare summary" }));
    await user.click(screen.getByRole("button", { name: "Back to order details" }));
    expect(screen.getByRole("heading", { level: 1, name: "Order details" })).toBeTruthy();
  });

  it("never shows engineering terms, unsupported conclusions, or external images", async () => {
    const user = userEvent.setup();
    render(<ConceptApp />);
    const texts: string[] = [allScreenText()];

    await user.click(screen.getByRole("button", { name: "View return details" }));
    texts.push(allScreenText());
    await user.click(screen.getByRole("button", { name: "Pickup details" }));
    await user.click(screen.getByRole("button", { name: "Show pickup details" }));
    texts.push(allScreenText());
    await user.click(screen.getByRole("button", { name: "Hide pickup details" }));
    await user.click(screen.getByRole("button", { name: "Back to timeline" }));
    await user.click(screen.getByRole("button", { name: "Get help with this return" }));
    texts.push(allScreenText());
    await user.click(screen.getByRole("button", { name: "Review summary" }));
    texts.push(allScreenText());
    await user.click(screen.getByRole("button", { name: "Confirm and prepare summary" }));
    texts.push(allScreenText());

    for (const text of texts) {
      expect(text).not.toMatch(FORBIDDEN);
    }
    expect(document.querySelectorAll("img").length).toBe(0);
    expect(document.querySelectorAll("[src], [href^='http']").length).toBe(0);
  });

  it("gives every interactive control a visible, meaningful name", async () => {
    render(<ConceptApp />);
    const buttons = screen.getAllByRole("button");
    for (const button of buttons) {
      expect((button.textContent ?? "").trim().length > 0 || button.getAttribute("aria-label")).toBeTruthy();
    }
  });
});

describe("support request and explanation", () => {
  it("explains the pickup in three parts, with the next step in the customer's own terms", async () => {
    const user = userEvent.setup();
    render(<ConceptApp />);
    await user.click(screen.getByRole("button", { name: "View return details" }));
    await user.click(screen.getByRole("button", { name: "Pickup details" }));

    expect(screen.getByRole("heading", { level: 3, name: "What we know" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 3, name: "What remains unconfirmed" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 3, name: "What you can do next" })).toBeTruthy();
    expect(screen.getByText(/Prepare a support request that explains the mismatch/)).toBeTruthy();
  });

  it("does not allow review of an empty message, and says what to do", async () => {
    const user = userEvent.setup();
    render(<ConceptApp />);
    await openHelp(user);

    await user.clear(messageBox());
    expect((screen.getByRole("button", { name: "Review summary" }) as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByText("Add a message to continue.")).toBeTruthy();

    await user.type(messageBox(), "Please help");
    expect((screen.getByRole("button", { name: "Review summary" }) as HTMLButtonElement).disabled).toBe(false);
    expect(screen.queryByText("Add a message to continue.")).toBeNull();
  });

  it("starts the support message with the suggested sentence", () => {
    expect(defaultSupportMessage).toBe(
      "I handed over my return, but my order still shows Pickup Pending. Please help me verify the pickup status.",
    );
  });
});

describe("keyboard access", () => {
  function focusables(): HTMLElement[] {
    return Array.from(document.querySelectorAll<HTMLElement>("button, textarea, input, a[href]")).filter(
      (el) => !el.hasAttribute("disabled"),
    );
  }

  async function tabThroughAll(user: ReturnType<typeof userEvent.setup>) {
    const expected = focusables();
    (document.activeElement as HTMLElement | null)?.blur();
    const visited: HTMLElement[] = [];
    for (let i = 0; i < expected.length; i++) {
      await user.tab();
      visited.push(document.activeElement as HTMLElement);
    }
    expect(visited.length).toBe(expected.length);
    visited.forEach((element, index) => expect(element).toBe(expected[index]));
  }

  it("reaches every control on each screen with Tab, in order, and Enter activates the next step", async () => {
    const user = userEvent.setup();
    render(<ConceptApp />);

    await tabThroughAll(user); // order screen
    screen.getByRole("button", { name: "View return details" }).focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("heading", { level: 1, name: "Return details" })).toBeTruthy();

    await tabThroughAll(user); // return screen
    screen.getByRole("button", { name: "Get help with this return" }).focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("heading", { level: 2, name: "Get help with this return" })).toBeTruthy();

    await tabThroughAll(user); // help screen, including the message field
  });
});

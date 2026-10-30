"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { defaultSupportMessage } from "../data/scenario";
import { ConfirmedScreen } from "./ConfirmedScreen";
import { HelpScreen } from "./HelpScreen";
import { OrderScreen } from "./OrderScreen";
import { ReturnScreen } from "./ReturnScreen";
import { ReviewScreen } from "./ReviewScreen";

type Screen = "order" | "return" | "help" | "review" | "confirmed";

/**
 * The whole prototype. Navigation is a small stack held in React state, so "back" always returns to the screen
 * that was actually shown before. Nothing is persisted, nothing is fetched, and "restart" clears every field.
 */
export function ConceptApp() {
  const [stack, setStack] = useState<Screen[]>(["order"]);
  const [message, setMessage] = useState(defaultSupportMessage);
  const current = stack[stack.length - 1];

  const push = (screen: Screen) => setStack((previous) => [...previous, screen]);
  const pop = () => setStack((previous) => (previous.length > 1 ? previous.slice(0, -1) : previous));
  const resetTo = (screens: Screen[]) => setStack(screens);
  const restart = () => {
    setMessage(defaultSupportMessage);
    setStack(["order"]);
  };

  let body: ReactElement;
  switch (current) {
    case "order":
      body = <OrderScreen onViewReturn={() => push("return")} />;
      break;
    case "return":
      body = <ReturnScreen onBack={pop} onGetHelp={() => push("help")} />;
      break;
    case "help":
      body = <HelpScreen message={message} onMessageChange={setMessage} onBack={pop} onReview={() => push("review")} />;
      break;
    case "review":
      body = <ReviewScreen message={message} onBack={pop} onEdit={pop} onConfirm={() => push("confirmed")} />;
      break;
    case "confirmed":
      body = (
        <ConfirmedScreen
          message={message}
          onBack={pop}
          onBackToOrder={() => resetTo(["order"])}
          onBackToReturn={() => resetTo(["order", "return"])}
        />
      );
      break;
  }

  return (
    <div className="page">
      <div className="concept-banner" role="note">
        <p>
          <strong>Concept prototype</strong> · Not affiliated with Meesho · Synthetic data only
        </p>
        <button type="button" className="link-button" onClick={restart}>
          Restart demo
        </button>
      </div>
      <div className="device" data-screen={current}>
        {body}
      </div>
    </div>
  );
}

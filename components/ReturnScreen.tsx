import { useState } from "react";
import { order, pickup, timeline } from "../data/scenario";
import { Button, StatusPill, Timeline, TopBar } from "./Ui";
import { PickupDetails } from "./PickupDetails";

type View = "timeline" | "details";

export function ReturnScreen({ onBack, onGetHelp }: { onBack: () => void; onGetHelp: () => void }) {
  const [view, setView] = useState<View>("timeline");

  return (
    <main className="screen">
      <TopBar title="Return details" onBack={onBack} />

      <section className="card">
        <p className="muted small">
          {order.productName} · Order {order.id}
        </p>
        <div className="card-head">
          <h2>Pickup pending</h2>
          <StatusPill tone="pending">Awaiting confirmation</StatusPill>
        </div>
        <p className="muted">
          Return requested on {pickup.requestedOn} because: {pickup.reason.toLowerCase()}.
        </p>
      </section>

      <div className="segmented" role="group" aria-label="Choose what to show">
        <button type="button" aria-pressed={view === "timeline"} onClick={() => setView("timeline")}>
          Timeline
        </button>
        <button type="button" aria-pressed={view === "details"} onClick={() => setView("details")}>
          Pickup details
        </button>
      </div>

      {view === "timeline" ? (
        <section className="card" aria-label="Return timeline">
          <Timeline steps={timeline} />
        </section>
      ) : (
        <PickupDetails />
      )}

      <div className="next-actions">
        <p className="muted small">What would you like to do next?</p>
        <div className="actions">
          {view === "timeline" ? (
            <Button fullWidth onClick={() => setView("details")}>
              View pickup details
            </Button>
          ) : (
            <Button fullWidth variant="secondary" onClick={() => setView("timeline")}>
              Back to timeline
            </Button>
          )}
          <Button fullWidth variant="secondary" onClick={onGetHelp}>
            Get help with this return
          </Button>
        </div>
      </div>
    </main>
  );
}

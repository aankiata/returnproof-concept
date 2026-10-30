import { pickup, pickupWindow } from "../data/scenario";
import { Disclosure, SummaryRows } from "./Ui";

export function PickupDetails() {
  return (
    <section className="card" aria-labelledby="pickup-details-title">
      <h2 id="pickup-details-title">Pickup status details</h2>
      <p className="lead">Your pickup status hasn't updated yet.</p>

      <div className="split">
        <h3>What we know</h3>
        <ul>
          <li>Your return pickup was scheduled for {pickupWindow()}.</li>
          <li>The status in this app still shows pickup pending.</li>
        </ul>

        <h3>What remains unconfirmed</h3>
        <ul>
          <li>The information available here does not independently confirm that the parcel was handed over successfully.</li>
          <li>No pickup activity from the pickup partner has been recorded yet.</li>
        </ul>
        <p className="muted small">
          A pending status doesn't mean the pickup didn't happen, and we can't confirm it yet either.
        </p>

        <h3>What you can do next</h3>
        <ul>
          <li>Review the pickup details below.</li>
          <li>Prepare a support request that explains the mismatch. Your order details are already filled in.</li>
        </ul>
      </div>

      <div className="details-block">
        <Disclosure closedLabel="Show pickup details" openLabel="Hide pickup details">
          <SummaryRows
            rows={[
              { label: "Pickup partner", value: pickup.partner },
              { label: "Pickup window", value: pickupWindow() },
              { label: "Your handover note", value: pickup.handoverNote },
              { label: "Pickup activity recorded", value: "Not yet" },
            ]}
          />
        </Disclosure>
      </div>
    </section>
  );
}

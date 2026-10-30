import { pickup, pickupWindow } from "../data/scenario";
import { Disclosure, SummaryRows } from "./Ui";

export function PickupDetails() {
  return (
    <section className="card" aria-labelledby="pickup-details-title">
      <h2 id="pickup-details-title">Pickup status details</h2>
      <p className="lead">Your pickup status hasn't updated yet.</p>
      <p>
        Your return pickup is still awaiting confirmation. The status update may take time to appear. You can review the
        pickup details below, or get help if the status stays unchanged.
      </p>

      <div className="split">
        <h3>What we have</h3>
        <ul>
          <li>Return requested on {pickup.requestedOn}</li>
          <li>Pickup scheduled for {pickupWindow()}</li>
          <li>Your handover note, added by you</li>
        </ul>
        <h3>Still awaiting confirmation</h3>
        <ul>
          <li>Pickup activity from the pickup partner</li>
          <li>The return status update</li>
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

      <div className="reassurance">
        <h3>What this does and doesn't tell us</h3>
        <p>
          A pending status means we haven't received the pickup confirmation yet. It doesn't mean the pickup didn't happen,
          and we can't confirm it yet either.
        </p>
        <h3>Your next step</h3>
        <p>No action is needed right now. If the status is still unchanged later, you can get help with this return.</p>
      </div>
    </section>
  );
}

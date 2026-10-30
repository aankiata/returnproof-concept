import { issueSummaryRows } from "../data/scenario";
import { Button, SummaryRows, TopBar } from "./Ui";

export function ConfirmedScreen({
  note,
  onBack,
  onBackToOrder,
  onBackToReturn,
}: {
  note: string;
  onBack: () => void;
  onBackToOrder: () => void;
  onBackToReturn: () => void;
}) {
  return (
    <main className="screen">
      <TopBar title="Summary" onBack={onBack} />

      <section className="card">
        <div className="success-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2>Your return issue summary is ready.</h2>
        <p>
          This prototype has prepared the details for a support conversation. Nothing has been sent, and no support request
          has been created.
        </p>
        <SummaryRows rows={[...issueSummaryRows(), { label: "Your note", value: note.trim() || "None added" }]} />
      </section>

      <div className="actions">
        <Button fullWidth onClick={onBackToOrder}>
          Back to order details
        </Button>
        <Button fullWidth variant="secondary" onClick={onBackToReturn}>
          Back to return details
        </Button>
      </div>
    </main>
  );
}

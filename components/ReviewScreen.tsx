import { issueSummaryRows } from "../data/scenario";
import { Button, SummaryRows, TopBar } from "./Ui";

export function ReviewScreen({
  message,
  onBack,
  onEdit,
  onConfirm,
}: {
  message: string;
  onBack: () => void;
  onEdit: () => void;
  onConfirm: () => void;
}) {
  return (
    <main className="screen">
      <TopBar title="Review" onBack={onBack} />

      <section className="card">
        <h2>Review your support request</h2>
        <p className="muted">
          Check the details below. This is a prototype, so confirming only prepares the summary. Nothing is sent.
        </p>
        <SummaryRows rows={issueSummaryRows()} />
      </section>

      <section className="card">
        <h3>Your message</h3>
        <p className="message-text">{message}</p>
      </section>

      <div className="actions">
        <Button fullWidth onClick={onConfirm}>
          Confirm and prepare summary
        </Button>
        <Button fullWidth variant="secondary" onClick={onEdit}>
          Edit message
        </Button>
      </div>
    </main>
  );
}

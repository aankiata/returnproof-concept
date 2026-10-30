import { issueSummaryRows } from "../data/scenario";
import { Button, SummaryRows, TopBar } from "./Ui";

const HELPER_ID = "support-message-helper";

export function HelpScreen({
  message,
  onMessageChange,
  onBack,
  onReview,
}: {
  message: string;
  onMessageChange: (value: string) => void;
  onBack: () => void;
  onReview: () => void;
}) {
  const canReview = message.trim().length > 0;

  return (
    <main className="screen">
      <TopBar title="Get help" onBack={onBack} />

      <section className="card">
        <h2>Get help with this return</h2>
        <p className="muted">
          We've filled in these details, so you don't need to type them again. Check them, and edit the message if you'd
          like to say something different.
        </p>
        <SummaryRows rows={issueSummaryRows()} />
      </section>

      <section className="card">
        <label htmlFor="support-message" className="field-label">
          Your message to support (you can edit it)
        </label>
        <textarea
          id="support-message"
          rows={4}
          maxLength={500}
          value={message}
          onChange={(event) => onMessageChange(event.target.value)}
          aria-describedby={canReview ? undefined : HELPER_ID}
        />
        {canReview ? null : (
          <p id={HELPER_ID} className="helper">
            Add a message to continue.
          </p>
        )}
      </section>

      <p className="muted small">This is a prototype. Reviewing the summary doesn't contact Meesho support.</p>

      <div className="actions">
        <Button fullWidth onClick={onReview} disabled={!canReview}>
          Review summary
        </Button>
        <Button fullWidth variant="secondary" onClick={onBack}>
          Back to return details
        </Button>
      </div>
    </main>
  );
}

import { issueSummaryRows } from "../data/scenario";
import { Button, SummaryRows, TopBar } from "./Ui";

export function HelpScreen({
  note,
  onNoteChange,
  onBack,
  onPrepare,
}: {
  note: string;
  onNoteChange: (value: string) => void;
  onBack: () => void;
  onPrepare: () => void;
}) {
  return (
    <main className="screen">
      <TopBar title="Get help" onBack={onBack} />

      <section className="card">
        <h2>Get help with this return</h2>
        <p className="muted">
          We've gathered these details, so you don't need to type them again. Check them, add anything else, then prepare
          the summary.
        </p>
        <SummaryRows rows={issueSummaryRows()} />
      </section>

      <section className="card">
        <label htmlFor="support-note" className="field-label">
          Anything else we should know? (optional)
        </label>
        <textarea
          id="support-note"
          rows={4}
          maxLength={500}
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder="For example, who you handed the parcel to."
        />
      </section>

      <p className="muted small">This is a prototype. Preparing the summary doesn't contact Meesho support.</p>

      <div className="actions">
        <Button fullWidth onClick={onPrepare}>
          Prepare issue summary
        </Button>
        <Button fullWidth variant="secondary" onClick={onBack}>
          Back to return details
        </Button>
      </div>
    </main>
  );
}

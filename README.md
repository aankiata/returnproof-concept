# ReturnProof concept prototype

A lightweight, clickable product concept for a proposed improvement to Meesho's return experience: clearer status explanation
when a pickup has been handed over but the app still shows it as pending.

- **Not a production application.** No backend, no database, no authentication, no real support channel, no real data.
- **Not affiliated with Meesho.** It makes no call to any Meesho system and uses no Meesho logo or photographs.
- **Synthetic data only.** Every order, person, partner and date is invented.

## What it demonstrates

**The customer problem.** After a parcel has been handed over for return, the app can still show the pickup as pending.
The customer may not know what has been recorded, what is still unconfirmed, or whether they need to act.

**What the prototype shows**

- **The existing status**, on the order and return screens, with a clear *View return details* action.
- **An honest explanation**, in three parts: what we know, what remains unconfirmed, and what you can do next.
- **A prefilled support request**, with the order details already filled in and an editable message, reviewed before it is
  confirmed.
- **A clear boundary**: the confirmation states that nothing has been sent. No support request is submitted.

**Synthetic data and status.** Every order, person, partner, date and pickup detail is invented. The pickup status is a fixed
scenario, not a real courier record.

**Not affiliated, not integrated.** This is an independent concept. It has no connection to Meesho's systems, courier
services, payments or support channels.

**Not validated.** The customer and business benefits of this explanation have not been tested with real users or data.

**Build and deploy.** `npm run build` makes the standard site. GitHub Pages publishes it from `.github/workflows/pages.yml`
on every push to `main`. See the guides in `docs/` for local setup and deployment.

Concept document, including what is simulated and what has not been built: [`docs/RETURNPROOF_CONCEPT.md`](docs/RETURNPROOF_CONCEPT.md).

## Start it

You need Node.js 20.9 or later (22 is what the existing project uses). No backend, database or environment variables are needed.

```bash
cd concept
npm install
npm audit                # should report: found 0 vulnerabilities
npm run dev          # http://localhost:3100
```

For a production build, which is closer to how a demonstration would run:

```bash
npm run build
npm run start        # http://localhost:3100
```

Run the checks:

```bash
npm run typecheck    # strict TypeScript
npm test             # 9 journey and support tests, jsdom, no browser needed
```

## Two-minute demo

1. Open the order. Tap **View return details**.
2. Point at the timeline and at *Awaiting confirmation*.
3. Tap **Pickup details**. Read the headline and the two lists.
4. Expand **Show pickup details**. Read "What this does and doesn't tell us".
5. Tap **Get help with this return**. Read the pre-filled message, edit it if you like, then tap **Review summary**.
6. Tap **Confirm and prepare summary**. Read the confirmation, which says nothing has been sent.
7. Tap **Back to order details**, then **Restart demo** in the top banner.

The full script, with what to say at each step, is in `docs/RETURNPROOF_CONCEPT.md`, section 9.

## Publish to GitHub Pages

The repository includes a GitHub Actions workflow (`.github/workflows/pages.yml`) that tests, builds and publishes the
prototype as a static website whenever you push to `main`. The local commands above are unaffected: the static export is
only produced when `GITHUB_PAGES=true` is set.

Full step-by-step instructions for VS Code, Git and GitHub Pages, including troubleshooting, are in
[`docs/GUIDE_VSCODE_AND_GITHUB.md`](docs/GUIDE_VSCODE_AND_GITHUB.md).

## Deploy on Vercel

See [`docs/GUIDE_VERCEL.md`](docs/GUIDE_VERCEL.md). The project needs no environment variables and deploys with Vercel's Next.js defaults.

## Accessibility

What was measured (contrast, keyboard access, touch targets) and what was not is in [`docs/ACCESSIBILITY_CHECK.md`](docs/ACCESSIBILITY_CHECK.md).

## Structure

```
app/            Next.js App Router entry, layout and global stylesheet
components/     ConceptApp (navigation stack), the four screens, pickup details, shared UI
data/           synthetic scenario (order, pickup, timeline, help summary)
tests/          journey test (real components, jsdom)
docs/           concept document
```

## Design choices

- The app uses the same Next.js, React and TypeScript versions as the existing project, so the two stay consistent.
- Styling is plain CSS in one file, not the existing project's Tailwind setup, to keep this prototype light and free of build configuration.
- The only dependencies added beyond the framework are the test tools (`vitest`, `jsdom`, Testing Library), which are development-only.
- Navigation is a small in-memory stack. Nothing is stored in the browser, so restart always starts clean.

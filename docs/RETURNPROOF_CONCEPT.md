# ReturnProof: product concept prototype

**Status:** a concept exploration and a clickable prototype. It is not a production application.
**Affiliation:** this is an independent concept. It is **not affiliated with, endorsed by, or integrated into Meesho**. It makes no call to any Meesho system, API, customer record or support channel.
**Data:** every order, product, person, partner, date and time in the prototype is invented and labelled synthetic.

---

## 1. Problem hypothesis

When a customer has physically handed a return to a pickup partner, but the app still shows pickup as pending, the customer
may not know what has been recorded, what is still waiting for confirmation, and whether they need to do anything.

**Hypothesis:** clearer, more honest status explanation inside the return journey, plus a help path that already contains
the relevant order details, could reduce that uncertainty.

This is a hypothesis to test. It is not a finding. The prototype does not show that the situation is common, that it causes
complaints, that existing Meesho experiences lack this, or that any measurable improvement would follow.

## 2. Proposed user experience

ReturnProof is not a new app or a new brand. It is a section inside the existing return details screen, titled **Pickup status
details**, that explains:

- what the app currently shows;
- what information has been recorded;
- what is still awaiting confirmation;
- whether the customer needs to act.

Language stays plain. The section avoids internal terms, identifiers, data structures and any conclusion the data cannot support.
It does not say the pickup partner failed, and it does not say the customer is right.

## 3. Primary user journey

1. **Order details.** The customer opens an order. The return is shown as in progress, with the pickup pending.
2. **Return details.** A timeline shows: return requested (done), pickup scheduled (done), pickup activity recorded
   (*awaiting confirmation*), return status updated (not yet).
3. **Pickup status details.** The explanation: "Your pickup status hasn't updated yet." What we have, what is still awaiting
   confirmation, what the pending status does and does not mean, and the next step. An expandable section shows the pickup
   partner, the window and the customer's own handover note.
4. **Next best action.** Two options: *View pickup details* and *Get help with this return*.
5. **Help.** The issue summary is pre-filled with the order ID, product, dates, the handover note and the current status. The customer
   can edit the message before reviewing it. A review screen then shows everything before anything is confirmed.
6. **Confirmation.** "Your return issue summary is ready." Nothing has been sent. The customer can return to the order or to the return details.

Restarting the demonstration returns to the order screen and clears every field.

## 4. What the prototype demonstrates

- Placement: the explanation lives inside the return journey, not in a separate application.
- Honest wording for an unconfirmed pickup: what is recorded, what is awaited, and what the pending state does *not* tell us.
- A clear separation between information the customer already has and information still awaiting confirmation.
- A help path that carries the relevant details forward, so the customer does not retype them.
- Predictable navigation: back returns to the screen that was actually shown, and restart clears all input.
- A restrained, mobile-first visual direction that fits a consumer shopping app.

## 5. What is simulated

| Element | How it is simulated |
|---|---|
| Order, product, seller, prices, dates, pickup partner | Invented, fixed data in `data/scenario.ts` |
| Pickup status | A fixed scenario ("pickup pending, awaiting confirmation"). No status source, no courier data, no tracking |
| Customer's handover note | Fixed text standing in for what a customer would enter |
| Help request | Local state only. "Confirm and prepare summary" does not contact anyone and creates no ticket |
| Confirmation | A summary screen. No reference number, resolution time, refund or guarantee is shown |
| Imagery | Placeholder artwork drawn as SVG. No Meesho photographs, logo or brand assets are used |
| Colours | Approximated by eye from screenshots of meesho.com for visual direction only. Not brand-verified |

## 6. What has not been implemented

- Any backend, database, API, authentication or account system.
- Any real status ingestion, reconciliation, matching or rules engine.
- Pickup-partner data, courier tracking or real-time updates.
- Support ticketing, messaging or a real help channel.
- Refund, payment, cancellation or return-policy logic.
- Analytics, experiments, A/B testing or measurement of any kind.
- More than one scenario. (A second scenario, where the pickup is confirmed, would show how the explanation changes. It was not built.)
- Localisation, accessibility audit, screen-reader testing, and browser testing across devices.

## 7. Why this might be worth investigating

- Pending status after a handover is a plausible moment of uncertainty. The concept tests whether honest explanation, placed
  where the customer already looks, changes how clear the situation feels.
- If support is needed, pre-filled details might reduce repeated typing for the customer and handling time for whoever answers.
- The idea can be tested cheaply, with users and copy, before any integration or backend work is justified.

## 8. Evidence needed to validate the idea

1. **Frequency.** How often do customers see a pending return status after a handover? This needs operational data, handled under
   the usual privacy controls. It is the first thing to establish.
2. **Comprehension.** In usability sessions, do customers understand the explanation, and do they know what to do next?
3. **Behaviour.** Does the explanation change repeat status checks, support contacts or abandonment? This needs a controlled
   comparison against the current screen, with success criteria agreed beforehand.
4. **Accuracy of the wording.** Does "awaiting confirmation" match what the systems know? Wording that reassures wrongly, or alarms
   wrongly, is worse than no explanation.
5. **Partner data.** How reliably and how quickly do pickup confirmations arrive? If they are often late, the honest explanation is
   the right one, but the cause sits elsewhere.
6. **Support cost.** Do pre-filled summaries shorten support handling? Measure it, do not assume it.
7. **Existing capability.** Whether Meesho already offers equivalent clarity was **not** investigated here, and the prototype makes no
   claim about it.

## 9. Two-minute demonstration script

| Time | Say | Show |
|---|---|---|
| 0:00–0:15 | "Here is one moment in the return journey where the app and the customer may not agree: the parcel was handed over, but the status still says pickup pending." | The order details screen. |
| 0:15–0:40 | "The return is in progress, with the pickup pending. Let's look at what the customer sees next." | Tap *View return details*. Point at the timeline, and at *Awaiting confirmation*. |
| 0:40–1:05 | "The explanation says plainly what has happened and what has not been confirmed. It does not say the partner failed, or that the customer is right." | Tap *Pickup details*. Read the headline and the "What we have" and "Still awaiting confirmation" lists. |
| 1:05–1:25 | "The details are there when someone wants them, and they say what a pending status does not mean." | Expand *Show pickup details*. Read "What this does and doesn't tell us". |
| 1:25–1:45 | "If the status stays unchanged, the customer can ask for help without retyping anything." | Tap *Get help with this return*. Show the pre-filled message. Tap *Review summary*, then *Confirm and prepare summary*. |
| 1:45–2:00 | "Nothing has been sent. This is a prototype. What would have to be true for this to help is the list on screen: how often it happens, whether people understand it, and whether it changes what they do." | Read the confirmation. Tap *Back to order details*, then *Restart demo*. |

## 10. Design notes

- **Placement.** Inside the return journey, using the existing order and return patterns: a product card, a status pill, a timeline, a single primary action.
- **Language.** Short sentences. "Awaiting confirmation" rather than technical status codes. No jargon, no identifiers in the copy.
- **Visual direction.** Restrained plum and violet accents on white and lavender panels, approximated from the screenshots. No new brand.
- **Responsive.** Designed mobile first. On wider screens the prototype is shown as a centred column. Layouts were not checked in a browser (see section 11).

## 11. Verification status

| Check | Result |
|---|---|
| Strict TypeScript type-check | Passed |
| Journey test (drives the real components through every screen, back navigation, restart, and the language and no-network rules) | 9 of 9 passed (including the review step and empty-message rule) |
| Production build | Compiled successfully |
| Served page (HTTP 200, synthetic content and non-affiliation statement present, no API or backend references) | Verified with a live server |
| Network use in the prototype's own source | None found |
| External hosts in the client bundle | Only XML namespace identifiers, a React error-documentation link and URL-parsing feature tests inside a polyfill. No requests are made to them |
| Layout on mobile and desktop widths | **Not verified.** No browser was available |
| Browser console errors | **Not verified.** No browser was available |
| Screen-reader and keyboard-only behaviour | **Not verified.** Tests cover names and roles, not real assistive technology |

Anyone reviewing this should open it in a browser at a phone width and a desktop width before judging the visual quality.

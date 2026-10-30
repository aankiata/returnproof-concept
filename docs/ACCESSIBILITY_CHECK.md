# Accessibility check: what was measured, and what was not

This records the automated checks run on the prototype. It is not a formal accessibility audit, and it does not replace
testing with real people, real devices and assistive technology.

## Measured here

### Colour contrast (WCAG 2.x, the ratio of the lighter to the darker colour)

Text needs at least **4.5:1**. Non-text elements that a user must see to operate the page (focus rings, field borders)
need at least **3:1**.

| Pair | Ratio | Needed | Result |
|---|---|---|---|
| Body text on the page background | 15.41 | 4.5 | pass |
| Muted (secondary) text on white | 6.81 | 4.5 | pass |
| Muted text on the lavender product panel | 5.98 | 4.5 | pass |
| Muted text on the segmented control | 5.77 | 4.5 | pass |
| Pending status pill text | 7.08 | 4.5 | pass |
| Pending detail text on white | 7.84 | 4.5 | pass |
| Success text on the success tint | 6.20 | 4.5 | pass |
| White text on the primary button | 6.54 | 4.5 | pass |
| White text on the primary button, hover state | 8.94 | 4.5 | pass |
| Disclosure link text on white | 6.54 | 4.5 | pass |
| Secondary button text on white | 12.26 | 4.5 | pass |
| White banner text on the plum banner | 12.26 | 4.5 | pass |
| Focus ring on white (non-text) | 6.54 | 3.0 | pass (was 2.33, **failed**, now fixed) |
| Text field border on white (non-text) | 3.05 | 3.0 | pass (was 1.65, **failed**, now fixed) |

The focus ring changed from a pale lavender to the primary violet. The text-field border was darkened, so the field is
visible without relying on the background.

### Keyboard access

- Every control is a native `<button>`, `<textarea>` or `<label>`, and the only click handler on a non-link element belongs to a
  `<button>`. A scan of the source found no click handlers on other elements.
- An automated test (`tests/journey.test.tsx`, *keyboard access*) presses Tab through every focusable control on the order,
  return and help screens. It checks that focus reaches each one, in order, and that Enter activates the next step.
- Focus is visible on every control: a 3 px outline in the violet colour above.

### Touch targets (set in the stylesheet)

The recommended minimum tap size is 44 × 44 pixels. The following controls were enlarged to meet it:

| Control | Set size |
|---|---|
| Back arrow (icon button) | 44 × 44 px |
| Timeline / Pickup details switch | minimum height 44 px |
| Show / Hide pickup details | minimum height 44 px |
| Restart demo (banner) | minimum height 44 px |
| Primary and secondary action buttons | about 50 px tall from their padding and line height |

These are the values set in the stylesheet. They have not been measured on a rendered page on a phone.

### Names, roles and reduced motion

- Every button has a visible text name, or an `aria-label` where it is an icon (the back arrow is named "Go back").
- The journey test checks names and roles, and the timeline's completed, current and upcoming states are announced in text
  as well as shown with colour.
- The stylesheet turns off transitions and animations when the operating system requests reduced motion.
- Images are not used for content. The product image is an SVG with an accessible label.

## Not measured here

- **Rendering in real browsers** on Windows, macOS, Android or iOS. No browser was available to the build environment.
- **Screen readers** (NVDA, JAWS, VoiceOver, TalkBack). Names and roles are tested in code, not spoken aloud.
- **Zoom and text scaling.** Behaviour at 200% and 400% zoom, and at large system text sizes, has not been checked.
- **Colour vision.** Only contrast ratios were checked, not how the colours appear to people with colour-vision differences.
- **Full state coverage.** The contrast table covers the pairs listed above. Hover, pressed and disabled states were checked
  only where listed.
- **Whether the explanation is understandable.** That needs the user conversations described in the concept document.

## Suggested manual checks (about 20 minutes)

1. **Keyboard.** Unplug the mouse or stay off the trackpad. Press Tab from the top of the page. Every control should receive a
   visible outline, in a sensible order, and Enter should activate it.
2. **Screen reader.** On Windows, install NVDA (free). Start it, open the prototype, and move through the buttons with Tab.
   Each button should be read with a name that makes sense out of context. On a Mac, turn on VoiceOver (Command + F5) and
   repeat.
3. **Zoom.** In the browser, press Ctrl + Plus (Command + Plus on a Mac) until the zoom is 200%. Nothing should be cut off,
   and the buttons should still be usable.
4. **Phone.** Open the live address on a phone. Check that the buttons are easy to tap without hitting a neighbour.

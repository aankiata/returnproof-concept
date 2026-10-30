// Synthetic demonstration data only. No real customer, order, address, phone number or payment detail.
// Every name, identifier and date here is invented for the prototype.

export type TimelineState = "done" | "current" | "upcoming";

export interface TimelineStep {
  id: string;
  title: string;
  detail: string;
  state: TimelineState;
}

export const order = {
  id: "DEMO-OD-7Q2K-0001",
  productName: "Printed Straight Kurti",
  variant: "Blue floral · Size M",
  price: "₹449",
  seller: "Demo Seller Studio (synthetic)",
  orderedOn: "12 Oct 2026",
  deliveredOn: "16 Oct 2026",
};

export const pickup = {
  requestedOn: "20 Oct 2026",
  reason: "Size did not fit",
  scheduledOn: "24 Oct 2026",
  window: "10 AM to 2 PM",
  partner: "Demo Logistics Partner (synthetic)",
  handoverNote: "Handed over to the pickup partner on 24 Oct 2026, around 11:30 AM (added by you)",
};

// What the app currently shows. The scenario: the customer says the parcel was handed over,
// but no pickup activity has been recorded yet, so the status has not moved.
// The customer-facing sentence the help request opens with. The customer may edit it before reviewing.
export const defaultSupportMessage =
  "I handed over my return, but my order still shows Pickup Pending. Please help me verify the pickup status.";

export const timeline: TimelineStep[] = [
  { id: "requested", title: "Return requested", detail: "20 Oct 2026", state: "done" },
  { id: "scheduled", title: "Pickup scheduled", detail: "24 Oct 2026, 10 AM to 2 PM", state: "done" },
  { id: "activity", title: "Pickup activity recorded", detail: "Awaiting confirmation", state: "current" },
  { id: "status", title: "Return status updated", detail: "Not updated yet", state: "upcoming" },
];

export function pickupWindow(): string {
  return `${pickup.scheduledOn}, ${pickup.window}`;
}

export function issueSummaryRows(): Array<{ label: string; value: string }> {
  return [
    { label: "Order ID", value: order.id },
    { label: "Product", value: order.productName },
    { label: "Return requested", value: pickup.requestedOn },
    { label: "Pickup scheduled", value: pickupWindow() },
    { label: "Your handover note", value: pickup.handoverNote },
    { label: "Return status", value: "Pickup pending, awaiting confirmation" },
    { label: "What you need help with", value: "The pickup status hasn't updated yet" },
  ];
}

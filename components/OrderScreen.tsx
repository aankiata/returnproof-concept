import { order, pickup, pickupWindow } from "../data/scenario";
import { Button, ProductPlaceholder, StatusPill, SummaryRows, TopBar } from "./Ui";

export function OrderScreen({ onViewReturn }: { onViewReturn: () => void }) {
  return (
    <main className="screen">
      <TopBar title="Order details" />

      <section className="product-card" aria-label="Ordered item">
        <ProductPlaceholder size={96} />
        <div>
          <p className="product-name">{order.productName}</p>
          <p className="muted">{order.variant}</p>
          <p className="price">{order.price}</p>
          <p className="muted small">Sold by {order.seller}</p>
        </div>
      </section>

      <section className="card">
        <div className="card-head">
          <h2>Return in progress</h2>
          <StatusPill tone="pending">Pickup pending</StatusPill>
        </div>
        <SummaryRows
          rows={[
            { label: "Order ID", value: order.id },
            { label: "Ordered on", value: order.orderedOn },
            { label: "Delivered on", value: order.deliveredOn },
            { label: "Return requested", value: pickup.requestedOn },
            { label: "Pickup", value: pickupWindow() },
          ]}
        />
        <p className="note">Your pickup status hasn't updated yet. Open the return details for the full picture.</p>
        <div className="actions">
          <Button fullWidth onClick={onViewReturn}>
            View return details
          </Button>
        </div>
      </section>
    </main>
  );
}

// pages/orders.tsx
import EmptyPage from "@/components/EmptyPage";

const DraftOrders = () => {
  return (
    <EmptyPage
      heading="Draft Orders"
      title="Draft orders will show here"
      text="Create draft orders to take orders over the phone, email invoices to customers, and collect payments."
      img="/orders-draft.svg"
    />
  );
};

export default DraftOrders;

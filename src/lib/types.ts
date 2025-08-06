export type Order = {
  id: string;
  customerName: string;
  date: string;
  status: 'New' | 'Processing' | 'Delivered' | 'Cancelled';
  amount: number;
  items: number;
  customerNotes?: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  imageUrl: string;
  status: 'Published' | 'Draft';
};

export type Delivery = {
  orderId: string;
  status: 'Pending Pickup' | 'In Transit' | 'Delivered' | 'Failed';
  trackingId: string;
  deliveryPerson: string;
  lastUpdate: string;
};

export type Payment = {
  transactionId: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  type: 'Withdrawal' | 'Earning';
};

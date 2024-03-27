export interface Order {
  productIds: number[]; // List of product IDs in the order
  quantities: number[]; // List of quantities of each product in the order
  buyer: string;
  totalPrice: number;
  paid: boolean;
}

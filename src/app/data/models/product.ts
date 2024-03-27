export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  availableQuantity: number;
  seller: string;
  available: boolean;
  categoryId: number;
}

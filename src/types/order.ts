export type cart = {
  name: string;
  pizzaId: number;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
  removeIngredients?: [];
  addIngredients?: [];
};

export type order = {
  cart: cart[];
  customer: string;
  estimatedDelivery: string;
  id: string;
  orderPrice: number;
  priority: boolean;
  priorityPrice: number;
  status: string;
};

export type OrderData = {
  [key: string]: string | boolean | cart[];
  cart: cart[];
  priority: boolean;
};

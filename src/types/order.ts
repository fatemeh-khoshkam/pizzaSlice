type cart = {
  addIngredients: [];
  name: string;
  pizzaId: number;
  quantity: number;
  removeIngredients: [];
  totalPrice: number;
  unitPrice: number;
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

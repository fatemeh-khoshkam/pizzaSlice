import { formatCurrency } from '../../utils/formatCurrency';
import { cart } from '../../types/order';
import DeleteItem from '../../features/cart/DeleteItem';

function CartItem({ item }: { item: cart }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <DeleteItem pizzaId={pizzaId}></DeleteItem>
      </div>
    </li>
  );
}

export default CartItem;

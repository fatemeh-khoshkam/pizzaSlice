import { formatCurrency } from '../../utils/formatCurrency';
import { cart } from '../../types/order';

type OrderItemProps = {
  item: cart;
  // isLoadingIngredients: boolean;
  // ingredients: string[];
};

function OrderItem({ item }: OrderItemProps) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      {/*<p className="text-stone-500 text-sm capitalize italic">*/}
      {/* */}
      {/*  {isLoadingIngredients*/}
      {/*    ? 'Loading ingredients...'*/}
      {/*    : ingredients.length > 0*/}
      {/*      ? ingredients.join(', ')*/}
      {/*      : 'No ingredients information available'}*/}
      {/*</p>*/}
    </li>
  );
}

export default OrderItem;

//import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { pizzaType } from '../../types/pizza';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addItem } from '../../features/cart/cartSlice';
// import { useNavigate } from 'react-router-dom';

function MenuItem({ pizza }: { pizza: pizzaType }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();

  function handleAddToCart() {
    const newItem = {
      name: name,
      pizzaId: id,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
    // navigate(`/cart`);
  }

  return (
    <li className="border-gray-100 flex gap-4 rounded-lg border p-2 shadow-md">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 rounded-lg ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-stone-500 text-sm capitalize italic">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-stone-500 text-sm font-medium uppercase">
              Sold out
            </p>
          )}

          {!soldOut && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

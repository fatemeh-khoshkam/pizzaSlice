//import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { pizzaType } from '../../types/pizza';
import Button from '../../ui/Button';

function MenuItem({ pizza }: { pizza: pizzaType }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

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

          <Button type="small">Add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

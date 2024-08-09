//import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { pizzaType } from '../../types/pizza';

function MenuItem({ pizza }: { pizza: pizzaType }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <div>
        <p>{name}</p>
        <p>{ingredients.join(', ')}</p>
        <div>
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

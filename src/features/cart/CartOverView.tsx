//import React from 'react';
import LinkButton from '../../ui/LinkButton';
import { useSelector } from 'react-redux';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/formatCurrency';

function CartOverView() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <footer className="bg-lime-950 text-stone-200 flex items-center justify-between px-4 py-4 text-sm uppercase sm:px-6 md:text-base">
      <p className="text-stone-300 space-x-4 font-semibold sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>${formatCurrency(totalCartPrice)}</span>
      </p>
      <LinkButton to="/cart">Open cart &rarr;</LinkButton>
    </footer>
  );
}

export default CartOverView;

//import React from 'react';
import LinkButton from '../../ui/LinkButton';

function CartOverView() {
  return (
    <footer className="bg-stone-800 text-stone-200 flex items-center justify-between px-4 py-4 text-sm uppercase sm:px-6 md:text-base">
      <p className="text-stone-300 space-x-4 font-semibold sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <LinkButton to="/cart">Open cart &rarr;</LinkButton>
    </footer>
  );
}

export default CartOverView;

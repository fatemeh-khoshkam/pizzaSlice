//import React from 'react';
import { cart } from '../../types/order';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from '../../features/cart/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, getUserName, clearCart } from '../../features/cart/cartSlice';
import { AppDispatch } from '../../store';
import EmptyCart from '../../features/cart/EmptyCart';

function Cart() {
  const username = useSelector(getUserName);
  const cart = useSelector(getCart);
  const dispatch = useDispatch<AppDispatch>();

  if (!cart.length) return <EmptyCart></EmptyCart>;

  function handleClearCart() {
    dispatch(clearCart());
  }

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="divide-stone-200 mt-3 divide-y border-b">
        {cart.map((item: cart) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;

import { useState } from 'react';
import { Form, useNavigation, redirect, useActionData } from 'react-router-dom';
import { OrderData } from '../../types/order';
import { createOrder } from '../../services/apiRestaurant';
import { isValidPhone } from '../../utils/isValidPhone';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/formatCurrency';

type OrderErrors = {
  phone?: string;
};

function CreateOrder() {
  const username = useSelector((state: RootState) => state.user.userName);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const [withPriority, setWithPriority] = useState<boolean>(false);
  // We can access to whatever was returned from
  // the action function (below) in case there was no submission.
  const formErrors = useActionData() as OrderErrors | null;
  const totalCartPrice: number = useSelector(getTotalCartPrice);
  const priorityPrice: number = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice: number = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart></EmptyCart>;

  return (
    <div className="m-auto flex flex-col px-4 py-6 sm:w-full md:w-1/2 lg:w-1/3">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            defaultValue={username}
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="bg-red-100 text-red-700 mt-2 rounded-md p-2 text-xs">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="accent-lime-500 focus:ring-lime-500 h-6 w-6 focus:outline-none focus:ring focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? 'Placing order....'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  const order: OrderData = {
    customer: data.customer.toString(),
    phone: data.phone.toString(),
    address: data.address.toString(),
    cart: typeof data.cart === 'string' ? JSON.parse(data.cart) : [],
    priority: data.priority === 'true',
  };
  console.log(order);

  const errors: OrderErrors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

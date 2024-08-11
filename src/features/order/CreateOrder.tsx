//import React from 'react';
import { Form, useNavigation, redirect, useActionData } from 'react-router-dom';
import { cart, OrderData } from '../../types/order';
import { createOrder } from '../../services/apiRestaurant';
import { isValidPhone } from '../../utils/isValidPhone';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const fakeCart: cart[] = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

type OrderErrors = {
  phone?: string;
};

function CreateOrder() {
  const username = useSelector((state: RootState) => state.user.userName);
  const cart: cart[] = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  // We can access to whatever was returned from
  // the action function (below) in case there was no submission.
  const formErrors = useActionData() as OrderErrors | null;
  console.log('error' + { formErrors });

  return (
    <div className="px-4 py-6">
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
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? 'Placing order....' : 'Order now'}
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
    // //This takes our array of key-value pairs and converts it back into an object.
    // ...Object.fromEntries(
    //   //This ensures all values are strings, even if they were originally File objects or other types.
    //   Object.entries(data).map(([key, value]) => [key, value.toString()])
    // ),
    customer: data.customer.toString(),
    phone: data.phone.toString(),
    address: data.address.toString(),
    cart: typeof data.cart === 'string' ? JSON.parse(data.cart) : [],
    priority: data.priority === 'on',
  };
  console.log(order);

  const errors: OrderErrors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

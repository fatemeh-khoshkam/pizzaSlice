//import React from 'react';
import { Form, useNavigation, redirect, useActionData } from 'react-router-dom';
import { cart, OrderData } from '../../types/order';
import { createOrder } from '../../services/apiRestaurant';
import { isValidPhone } from '../../utils/isValidPhone';

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
  const cart: cart[] = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  // We can access to whatever was returned from
  // the action function (below) in case there was no submission.
  const formErrors = useActionData() as OrderErrors | null;
  console.log('error' + { formErrors });

  return (
    <div>
      <h2 className="bg-sky-300 text-3xl font-bold underline">
        Ready to order? Let's go!
      </h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <input type="tel" name="phone" required />
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <input type="text" name="address" required />
        </div>

        <div>
          <input type="checkbox" name="priority" id="priority" />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Placing order....' : 'Order now'}
          </button>
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

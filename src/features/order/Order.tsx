import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

import { getOrder } from '../../services/apiRestaurant';
import { formatCurrency } from '../../utils/formatCurrency';
import { calcMinutesLeft } from '../../utils/calcMinutesLeft';
import { formatDate } from '../../utils/formatDate';
import { order, cart } from '../../types/order';
import OrderItem from './OrderItem';
//import { pizzaType } from '../../types/pizza';

function Order() {
  const order = useLoaderData() as order;

  //LATER
  //const menuFetcher = useFetcher()
  // useEffect(
  //   function () {
  //     if (!menuFetcher.data && menuFetcher.state === 'idle')
  //       menuFetcher.load('/menu');
  //   },
  //   [menuFetcher]
  // );

  const {
    id,
    cart,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  // const isLoadingIngredients =
  //   menuFetcher.state === 'loading' || !menuFetcher.data;

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="bg-red-500 text-red-50 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide">
              Priority
            </span>
          )}
          <span className="bg-green-500 text-green-50 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide">
            {status} order
          </span>
        </div>
      </div>

      <div className="bg-stone-200 flex flex-wrap items-center justify-between gap-2 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-stone-500 text-xs">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item: cart) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            // isLoadingIngredients={isLoadingIngredients}
            // ingredients={
            //   menuFetcher?.data?.find((el: pizzaType) => el.id === item.pizzaId)
            //     ?.ingredients ?? []
            // }
          />
        ))}
      </ul>

      <div className="bg-stone-200 space-y-2 px-6 py-5">
        <p className="text-stone-600 text-sm font-medium">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-stone-600 text-sm font-medium">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  //console.log(params);
  const order = await getOrder(params.orderID);

  return order;
}

export default Order;

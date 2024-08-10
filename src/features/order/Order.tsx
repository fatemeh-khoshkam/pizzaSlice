import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

import { getOrder } from '../../services/apiRestaurant';
import { formatCurrency } from '../../utils/formatCurrency';
import { calcMinutesLeft } from '../../utils/calcMinutesLeft';
import { formatDate } from '../../utils/formatDate';
import { order } from '../../types/order';

function Order() {
  const { status, priority, priorityPrice, orderPrice, estimatedDelivery } =
    useLoaderData() as order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  //console.log(order);
  // Test ID: IIDSAT

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  console.log(params);
  const order = await getOrder(params.orderID);
  return order;
}

export default Order;

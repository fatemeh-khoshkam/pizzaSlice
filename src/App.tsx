import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as MenuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order, { loader as OrderLoader } from './features/order/Order';
import CreateOrder, {
  action as CreateOrderAction,
} from './features/order/CreateOrder';
import AppLayOut from './ui/AppLayOut';
import Error from './ui/Error';

const router = createBrowserRouter([
  {
    element: <AppLayOut></AppLayOut>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/menu',
        element: <Menu></Menu>,
        loader: MenuLoader,
        errorElement: <Error></Error>,
      },
      {
        path: '/cart',
        element: <Cart></Cart>,
      },
      {
        path: '/order/:orderID',
        element: <Order></Order>,
        loader: OrderLoader,
        errorElement: <Error></Error>,
      },
      {
        path: '/order/newOrder',
        element: <CreateOrder></CreateOrder>,
        action: CreateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

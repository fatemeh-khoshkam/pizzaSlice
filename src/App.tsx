import './App.css';

import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as MenuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';
import AppLayOut from './ui/AppLayOut';
import Error from './ui/Error';

const router = createBrowserRouter([
  {
    element: <AppLayOut></AppLayOut>,
    errorElement: <Error></Error>,
    children: [
      {
        element: <Home></Home>,
        path: '/',
      },
      {
        element: <Menu></Menu>,
        path: '/menu',
        loader: MenuLoader,
        errorElement: <Error></Error>,
      },
      {
        element: <Cart></Cart>,
        path: '/cart',
      },
      {
        element: <Order></Order>,
        path: '/order/:orderID',
      },
      {
        element: <CreateOrder></CreateOrder>,
        path: '/order/newOrder',
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

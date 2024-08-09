//import React from 'react';
import { Outlet } from 'react-router';

import Header from './Header';
import CartOverView from '../features/cart/CartOverView';

function AppLayOut() {
  return (
    <>
      <Header></Header>
      <br />
      <main>
        <Outlet></Outlet>
      </main>
      <br />
      <CartOverView></CartOverView>
    </>
  );
}

export default AppLayOut;

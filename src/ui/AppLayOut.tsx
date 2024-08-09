//import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header';
import CartOverView from '../features/cart/CartOverView';
import Loader from '../ui/Loader';

function AppLayOut() {
  const navigation = useNavigation();
  console.log(navigation);
  const isLoading: 'idle' | 'loading' | 'submitting' = navigation.state;

  return (
    <>
      <Header></Header>
      <br />
      {isLoading === 'loading' && <Loader></Loader>}
      <main>
        <Outlet></Outlet>
      </main>
      <br />
      <CartOverView></CartOverView>
    </>
  );
}

export default AppLayOut;

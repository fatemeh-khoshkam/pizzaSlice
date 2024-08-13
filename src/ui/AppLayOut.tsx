//import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header';
import CartOverView from '../features/cart/CartOverView';
import Loader from '../ui/Loader';

function AppLayOut() {
  const navigation = useNavigation();
  const isLoading: 'idle' | 'loading' | 'submitting' = navigation.state;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading === 'loading' && <Loader></Loader>}

      <Header></Header>

      <div className="overflow-scroll">
        <main>
          <Outlet></Outlet>
        </main>
      </div>

      <CartOverView></CartOverView>
    </div>
  );
}

export default AppLayOut;

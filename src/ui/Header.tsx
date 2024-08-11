//import React from 'react';

import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';

function Header() {
  return (
    <header className="text-slate-300 border-stone-200 bg-lime-800 flex items-center justify-between border-b px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-[8px]">
        Pizza Slice 🍕
      </Link>

      <SearchOrder></SearchOrder>

      <UserName></UserName>
    </header>
  );
}

export default Header;

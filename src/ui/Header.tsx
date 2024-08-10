//import React from 'react';

import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';

function Header() {
  return (
    <header className="bg-lightGreen uppercase text-slate-200">
      <Link to="/" className="tracking-[8px]">
        Pizza Slice 🍕
      </Link>

      <SearchOrder></SearchOrder>

      <UserName></UserName>
    </header>
  );
}

export default Header;

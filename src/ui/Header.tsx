//import React from 'react';

import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';

function Header() {
  return (
    <>
      <SearchOrder></SearchOrder>
      <Link to="/">Pizza Slice App</Link>
    </>
  );
}

export default Header;

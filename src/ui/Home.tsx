//import React from 'react';

import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1 className="text-darkGreen text-center text-xl font-semibold">
        Experience pizza at its prime.
      </h1>
      <br />
      <span className="text-lightGreen">
        hot 🔥, fresh 🍕, and speedily brought from our ovens to your table.
      </span>
      <Link to="/menu">Go to menu</Link>
    </div>
  );
}

export default Home;

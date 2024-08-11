//import React from 'react';
//import { Link } from 'react-router-dom';

import CreateUser from '../features/user/CreateUser';

function Home() {
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold !leading-[3rem] md:text-3xl">
        Experience pizza at its prime.
        <br />
        <span className="text-lime-500">
          hot 🔥, fresh 🍕, and speedily brought from our ovens to your table.
        </span>
      </h1>

      {/*<Link to="/menu">Go to menu</Link>*/}
      <CreateUser></CreateUser>
    </div>
  );
}

export default Home;

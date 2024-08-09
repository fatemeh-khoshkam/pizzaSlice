//import React from 'react';

import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <p>Home</p>
      <Link to="/menu">Go to menu</Link>
    </div>
  );
}

export default Home;

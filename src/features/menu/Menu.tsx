//import React from 'react';

import { getMenu } from '../../services/apiRestaurant';
import { useLoaderData } from 'react-router-dom';
import MenuItem from '../../features/menu/MenuItem';
import { pizzaType } from '../../types/pizza';

function Menu() {
  const menu = useLoaderData() as pizzaType[];
  console.log(menu);

  //divide-stone-200 divide-y px-2
  return (
    <ul className="m-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {menu.map((pizza: pizzaType) => (
        <MenuItem key={pizza.id} pizza={pizza}></MenuItem>
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;

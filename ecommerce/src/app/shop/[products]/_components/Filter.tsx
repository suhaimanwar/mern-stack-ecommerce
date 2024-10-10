/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

type Props = {
    SortbyName: any;
    SortbyNumber:any;
};

const Filter = ({ SortbyName,SortbyNumber }: Props) => {
 
  return (
    <Menu>
      <MenuButton className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600">
        Filter
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="mt-2 min-w-[50px] bg-white border border-gray-300 rounded-md shadow-lg"
      >
        <MenuItem>
          <button
            onClick={SortbyNumber}
            className="w-full px-4 py-2 text-left text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
          >
            Sort by Price
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={SortbyName}
            className="w-full px-4 py-2 text-left text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
          >
            Sort by Name
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default Filter;

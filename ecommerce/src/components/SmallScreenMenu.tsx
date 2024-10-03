"use client";

import React, { useState } from "react";

import Link from "next/link";

import Image from "next/image";
import Logo from "../../public/images/logo.png";
import HamburgerIcon from "../app/svg/HamburgerIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { AnimatePresence, motion } from "framer-motion";

const SmallScreenMenu = () => {
  const [menuBox, setMenuBox] = useState(true);

  return (
    <>
      {menuBox && ( //onninkil idh
        <HamburgerIcon
          onClick={() => setMenuBox(!menuBox)}
          className="size-7 hidden max-md:block"
        />
      )}

      <AnimatePresence>
        {" "}
        {/*Used to make the exit animation work */}
        {!menuBox && ( //ellenkil idh
          <div className="fixed flex top-0 right-0 h-screen w-full z-10">
            <div
              onClick={() => setMenuBox(!menuBox)} //
              className="w-2/3 h-full "
            ></div>

            {/* import motion from framer motion
                update the normal div to motion.div to add the animation 
                allows the use of motion components to any div*/}

            <motion.div
              initial={{ x: "100%" }} //Defines the starting state of the menu. Here it is x axis to the right
              animate={{ x: 0 }} //This is the state used to animate, It brings to its old position.
              exit={{ x: "100%" }} //Defines the exit state - only works when the animation presence component is wrapped within the div.
              transition={{ duration: 0.3 }}
              className="w-full h-full bg-image2 flex flex-col d-flex items-center md:hidden"
            >
              <div className="w-full flex justify-end p-5 ">
                <FontAwesomeIcon
                  onClick={() => setMenuBox(!menuBox)}
                  className="size-5"
                  icon={faXmark}
                />
              </div>

              <div className="pb-10 pt-20">
                <Image alt="logo" src={Logo} className="w-8" />
              </div>

              <Link className="hover:text-zinc-400 transition-1" href="/">
                Home
              </Link>

              <Link className="hover:text-zinc-400 transition-1" href="/">
                Shop
              </Link>

              <Link className="hover:text-zinc-400 transition-1" href="/">
                Contact
              </Link>

              <Link className="hover:text-zinc-400 transition-1" href="/">
                Login
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmallScreenMenu;

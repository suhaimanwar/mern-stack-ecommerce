import Link from "next/link";
import React from "react";

type Props = {
    name: string,
    href: string
}

const HeaderLink = ({name,href}:Props) => {
  return (
    <>
      <Link className="hover:text-zinc-400 transition-1" href={href}>
        {name}
      </Link>

    </>
  );
};

export default HeaderLink;

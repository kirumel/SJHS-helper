"use client";

import Link from "next/link";
import logo from "../../public/logo.png";
import Image from "next/image";

export default function Nav() {
  return (
    <>
      <div className="nav">
        <a href="/">
          <Image src={logo} alt="logo" width={71} height={25} />
        </a>
      </div>
    </>
  );
}

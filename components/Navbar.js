"use client";
import React, { useState } from "react";
import styles from "@/styles/navbar.module.css";
import { Squeeze as Hamburger } from "hamburger-react";
import Link from "next/link";

function Navbar() {
  const [menu, setMenu] = useState(false);

  function menuFunc() {
    setMenu(!menu);
  }

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/">
          <h1>Steve Demos</h1>
        </Link>
        <ul>
          <Link href="/#home">
            <li>Home</li>
          </Link>
          <Link href="/#about">
            <li>About</li>
          </Link>
          <Link href="/Properties">
            <li>Properties</li>
          </Link>
          <Link href="/#testimonals">
            <li>Testimonals</li>
          </Link>
          <Link href="/#contact">
            <li>Contact</li>
          </Link>
        </ul>
        <div className={styles.menu_icon} onClick={menuFunc}>
          <Hamburger toggled={menu} toggle={setMenu} />
        </div>
      </nav>
      <div className={`${styles.m_menu} ${menu && styles.m_menu_active}`}>
        <ul>
          <Link href="/#home">
            <li onClick={menuFunc}>Home</li>
          </Link>
          <Link href="/#about">
            <li onClick={menuFunc}>About</li>
          </Link>
          <Link href="/Properties">
            <li onClick={menuFunc}>Properties</li>
          </Link>
          <Link href="/#testimonals">
            <li onClick={menuFunc}>Testimonals</li>
          </Link>
          <Link href="/#contact">
            <li onClick={menuFunc}>Contact</li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Navbar;

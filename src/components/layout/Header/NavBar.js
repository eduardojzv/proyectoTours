'use client'
import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
//import { ACME } from "@/components/icons/svgIcons/ACME";
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [session, setSession] = useState({
    state: true,
    email: 'eduardo@gmail.com',
    userName: 'eduardo josue zamora valverde'
  })
  const menuItems = [
    "Inicio"
  ];
  function logOut() {
    setSession({ session, state: false })
  }
  return (
    <Navbar
    className="rounded-t-md"
      shouldHideOnScroll
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          {/* <ACME /> */}
          <Image
          src={"/icon02.jpg"}
          width={100}
          height={100}
          alt="Picture of the author"
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand >
        <Image
          src={"/icon02.jpg"}
          width={100}
          height={100}
          alt="Picture of the author"
          />
        </NavbarBrand>
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link
            className={item==="Cart"? "cart" : null}
              href={item === "Home" ? "/" : `/${item}`}>
              {item}
            </Link>
            {/* {item==="Cart"? 
              <div className="popover scale-y-100  rounded-lg ease-in duration-200 origin-bottoms lg:scale-y-0">
                <h1>hola</h1>
              </div>
            : null} */}
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {!session.state ? (
          <>
            <NavbarItem className="lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register" >
                Sign Up
              </Link>
            </NavbarItem>
          </>
        )

          : (
            <>
              <NavbarItem className="lg:flex">
                <Link href="#">Hello, {session.userName.split(' ')[0]}</Link>
              </NavbarItem>
              <NavbarItem className="lg:flex">
                <Button color="warning" href="#" variant="flat" onClick={logOut}>
                  Log Out
                </Button>
              </NavbarItem>
            </>
          )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              // color={
              //   index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              // }
              href={item === "Home" ? "/" : item}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

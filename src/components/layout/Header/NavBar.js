'use client'
import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { IconHeader } from "@/icons/IconHeader";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    {
      title: "Inicio",
      href: "/"
    },
    {
      title: "Contactenos",
      href: "/contactenos"
    },
    {
      title: "Politicas y privacidad",
      href: "/policies&private"
    },
  ];
  const [session, setSession] = useState({
    state: true,
    email: 'eduardo@gmail.com',
    userName: 'eduardo josue zamora valverde'
  })
  function logOut() {
    setSession({ session, state: false })
  }
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex gap-2">
          <IconHeader w={35} h={35} />
          <p className="font-bold text-inherit">AllBlue Tours</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {Object.values(menuItems).map((val, index) => (
          <NavbarItem key={`${val.title}-${index}`} isActive>
            <Link href={val.href} aria-current="page">
              {val.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      {/*  */}

      {/* <NavbarContent justify="end">
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
                <Button color="danger" href="#" variant="flat" onClick={logOut}>
                  Log Out
                </Button>
              </NavbarItem>
            </>
          )}
      </NavbarContent> */}
      {/**/}
      <NavbarMenu>
        {Object.values(menuItems).map((val, index) => (
          <NavbarMenuItem key={`${val.title}-${index}`}>
            <Link
              className="w-full"
              href={val.href}
              size="lg"
            >
              {val.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

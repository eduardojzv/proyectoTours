'use client'
// import React, { useState } from "react";
// import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
// import Link from "next/link";
// import Image from "next/image";
// //import { ACME } from "@/components/icons/svgIcons/ACME";
// export default function NavBar() {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
// const [session, setSession] = useState({
//   state: true,
//   email: 'eduardo@gmail.com',
//   userName: 'eduardo josue zamora valverde'
// })
//   const menuItems = [
//     {
//       title: "Inicio",
//       href: "/"
//     },
//     {
//       title: "test",
//       href: "/test"
//     },
//   ];
// function logOut() {
//   setSession({ session, state: false })
// }
//   return (
//     <Navbar
//       className="rounded-t-md"
//       shouldHideOnScroll
//       isBordered
//       isMenuOpen={isMenuOpen}
//       onMenuOpenChange={setIsMenuOpen}
//     >
//       <NavbarContent className="sm:hidden" justify="start">
//         <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
//       </NavbarContent>

//       <NavbarContent className="sm:hidden pr-3 relative w-24" justify="center">
//         <NavbarBrand className="">
//           <Image
//             src={"/isla.png"}
//             fill
//             alt="Picture of the author"
//           />
//         </NavbarBrand>
//       </NavbarContent>

//       <NavbarContent className="hidden sm:flex gap-4 relative bg-red-200 w-40" justify="center">
//         <NavbarBrand className="bg-blue-400">
//           <Image
//             src={"/isla.png"}
//             fill
//             alt="Picture of the author"
//           />
//         </NavbarBrand>
//         {Object.values(menuItems).map((val, index) => (
//           <NavbarItem key={`${val.title}-${index}`}>
//             <Link
//               className={''}
//               href={val.href}>
//               {val.title}
//             </Link>
//           </NavbarItem>
//         ))}
//       </NavbarContent>

// <NavbarContent justify="end">
//   {!session.state ? (
//     <>
//       <NavbarItem className="lg:flex">
//         <Link href="/login">Login</Link>
//       </NavbarItem>
//       <NavbarItem>
//         <Link href="/register" >
//           Sign Up
//         </Link>
//       </NavbarItem>
//     </>
//   )

//     : (
//       <>
//         <NavbarItem className="lg:flex">
//           <Link href="#">Hello, {session.userName.split(' ')[0]}</Link>
//         </NavbarItem>
//         <NavbarItem className="lg:flex">
//           <Button color="warning" href="#" variant="flat" onClick={logOut}>
//             Log Out
//           </Button>
//         </NavbarItem>
//       </>
//     )}
// </NavbarContent>

// <NavbarMenu>
//   {Object.values(menuItems).map((val, index) => (
//     <NavbarMenuItem key={`${val.title}-${index}`}>
//       <Link
//         className="w-full"
//         href={val.href}
//         size="lg"
//       >
//         {val.title}
//       </Link>
//     </NavbarMenuItem>
//   ))}
// </NavbarMenu>
//     </Navbar>
//   );
// }
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
      title: "test",
      href: "/test"
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
          <p className="font-bold text-inherit">Green Zone</p>
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
                <Button color="danger" href="#" variant="flat" onClick={logOut}>
                  Log Out
                </Button>
              </NavbarItem>
            </>
          )}
      </NavbarContent>
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

"use client";
import Logo from "@/icons/Logo";
import { Navbar, NavbarBrand } from "@nextui-org/react";

export default function Nav() {
  return (
    <Navbar isBordered className="flex flex-col">
      <NavbarBrand>
        <Logo width={200} height={50} />
      </NavbarBrand>
    </Navbar>
  );
}

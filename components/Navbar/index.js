import React from "react";

import Image from "next/image";
import Link from "next/link";

import ICON from "@/config/icons";

const Navbar = () => {
  const itemMenu = [
    {
      title: "Purchase Order",
      img: ICON.IC_PO,
      href: "/purchase-order",
    },
    {
      title: "Receiving Advice",
      img: ICON.IC_RA,
      href: "/receiving-advice",
    },
    {
      title: "Receiving Advice Response",
      img: ICON.IC_RAR,
      href: "/receiving-advice-response",
    },
    {
      title: "Proforma Invoice",
      img: ICON.IC_PFI,
      href: "/proforma-invoice",
    },
    {
      title: "Proforma Invoice Response",
      img: ICON.IC_PFIR,
      href: "/proforma-invoice-response",
    },
    {
      title: "Invoice",
      img: ICON.IC_INV,
      href: "/invoice",
    },
  ];

  return (
    <>
      <div className="container mx-auto">
        <div className="py-2 flex justify-between">
          <Link href="/dashboard">
            <div className="flex items-center gap-4">
              <Image src={ICON.IC_LOGO} alt="logo" width={50} />
              <h1 className="font-medium text-xl">O399</h1>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Image src={ICON.IC_PROFILE} alt="item1" />
            </Link>

            <Link href="/dashboard">
              <Image src={ICON.IC_HOME} alt="item2" />
            </Link>

            <Link href="/message">
              <Image src={ICON.IC_MESSAGE} alt="item3" />
            </Link>

            <Link href="/setting">
              <Image src={ICON.IC_SETTING} alt="item4" />
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#B81C1D] h-[145px]">
        <div className="container mx-auto h-full grid grid-cols-6 gap-6 py-4">
          {itemMenu.map((e, i) => (
            <Link
              href={e.href}
              className="bg-primary rounded-lg flex flex-col gap-2 px-4 pt-4"
              key={i}
            >
              <Image src={e.img} alt="icon-po" />
              <h2 className="font-bold text-white text-clamp">{e.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;

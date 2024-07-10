"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import ICON from "@/config/icons";

import { useRouter } from "next/navigation";

import { ConfigProvider, Modal, Space, Table } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";

const Navbar = () => {
  const [user, setUser] = useState("");

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    confirm({
      title: "Kamu yakin ingin logout?",
      icon: <ExclamationCircleFilled />,
      centered: true,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          setLoading(true);
          localStorage.setItem("id_relawan", "");
          localStorage.setItem("role", "");
          localStorage.setItem("token", "");
          localStorage.setItem("nama_panggilan", "");
          localStorage.setItem("email", "");
          localStorage.setItem("id_user", "");
          localStorage.setItem("username", "");
          setTimeout(() => {
            setLoading(false);
            router.push("/");
          }, 1000);
        } catch (error) {
          setLoading(false);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  // let username = "";
  useEffect(() => {
    const username = localStorage.getItem("username") || "Admin";
    setUser(username);
  }, []);

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
              <h1 className="font-medium text-xl">{user}</h1>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/supplier">
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

            <div className="relative group">
              <Link href="#">
                <Image src={ICON.IC_SETTING} alt="item4" />
              </Link>

              <div className="absolute hidden group-hover:block right-0 pt-2 w-36">
                <div className="bg-white shadow-xl drop-shadow-lg rounded">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-black hover:bg-gray-200 hover:rounded-md"
                  >
                    Profile
                  </Link>
                  <button
                    // href="/logout"
                    onClick={handleLogout}
                    className="text-left w-full px-4 py-2 text-black hover:bg-gray-200 hover:rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
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

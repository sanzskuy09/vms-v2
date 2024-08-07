"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import ICONS from "@/config/icons";
import Link from "next/link";
import { API, URL } from "@/config/api";

const Dashboard = () => {
  const username = localStorage.getItem("username") || "";

  console.log(username);

  const [dataPO, setDataPO] = useState(0);
  const [dataRA, setDataRA] = useState(0);
  const [dataRAR, setDataRAR] = useState(0);
  const [dataPFI, setDataPFI] = useState(0);
  const [dataPFIR, setDataPFIR] = useState(0);
  const [dataINV, setDataINV] = useState(0);
  const [dataSupplier, setDataSupplier] = useState(0);
  const [announcements, setAnnouncements] = useState([]);

  const data = [
    {
      title: "Purchase Order",
      jumlah: dataPO,
      link: "/purchase-order",
    },
    {
      title: "Receiving Advice",
      jumlah: dataRA,
      link: "/receiving-advice",
    },
    {
      title: "Receiving Advice Response",
      jumlah: dataRAR,
      link: "/receiving-advice-response",
    },
    {
      title: "Proforma Invoice",
      jumlah: dataPFI,
      link: "/proforma-invoice",
    },
    {
      title: "Proforma Invoice Response",
      jumlah: dataPFIR,
      link: "/proforma-invoice-response",
    },
    {
      title: "Invoice",
      jumlah: dataINV,
      link: "/invoice",
    },
    {
      title: "Supplier",
      jumlah: dataSupplier,
      link: "/supplier",
    },
  ];

  const dataForSupp = [
    {
      title: "Purchase Order",
      jumlah: dataPO,
      link: "/purchase-order",
    },
    {
      title: "Receiving Advice",
      jumlah: dataRA,
      link: "/receiving-advice",
    },
    {
      title: "Receiving Advice Response",
      jumlah: dataRAR,
      link: "/receiving-advice-response",
    },
    {
      title: "Proforma Invoice",
      jumlah: dataPFI,
      link: "/proforma-invoice",
    },
    {
      title: "Proforma Invoice Response",
      jumlah: dataPFIR,
      link: "/proforma-invoice-response",
    },
    {
      title: "Invoice",
      jumlah: dataINV,
      link: "/invoice",
    },
  ];

  const getAnnouncement = async () => {
    try {
      const res = await API.get(URL.GET_ANNOUNCEMENT);
      const data = res.data.result[0];
      setAnnouncements(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataPO = async () => {
    try {
      const res = await API.get(URL.GET_LIST_PO);
      const data = res.data.result.items;
      setDataPO(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataRA = async () => {
    try {
      const res = await API.get(URL.GET_LIST_RA);
      const data = res.data.result.items;
      setDataRA(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataRAR = async () => {
    try {
      const res = await API.get(URL.GET_LIST_RAR);
      const data = res.data.result.items;
      setDataRAR(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataPFI = async () => {
    try {
      const res = await API.get(URL.GET_LIST_PFI);
      const data = res.data.result.items;
      setDataPFI(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataPFIR = async () => {
    try {
      const res = await API.get(URL.GET_LIST_PFIR);
      const data = res.data.result.items;
      setDataPFIR(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataINV = async () => {
    try {
      const res = await API.get(URL.GET_LIST_INV);
      const data = res.data.result.items;
      setDataINV(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataSupplier = async () => {
    try {
      const res = await API.get(URL.GET_LIST_SUPP);
      const data = res.data.result;
      setDataSupplier(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataPO();
    getDataRA();
    getDataRAR();
    getDataPFI();
    getDataPFIR();
    getDataINV();
    getDataSupplier();
    getAnnouncement();
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(announcements?.content || "");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const res = await API.put(URL.EDIT_ANNOUNCEMENT, {
        content: content,
      });

      await getAnnouncement();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <h1 className="text-4xl mb-12">Dashboard</h1>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h5 className="font-semibold text-lg mb-2">Dokumen</h5>
          <div className="bg-[#F5F5F5] p-4 py-8 rounded-xl">
            <div className="rounded-t-lg overflow-hidden">
              <table className="border-collapse w-full">
                <thead className="bg-[#F8E1E0]">
                  <tr>
                    <th className="py-4 px-4 text-left">Nama</th>
                    <th className="py-4 px-4 text-left">Jumlah</th>
                    <th className="py-4 px-4 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {username == "admin"
                    ? data.map((e, i) => (
                        <tr className="border-b border-black" key={i}>
                          <td className="py-4 px-4">{e.title}</td>
                          <td className="py-4 px-4">{e.jumlah}</td>
                          <td className="py-4 px-4">
                            <Link href={e?.link}>
                              <Image src={ICONS.IC_SHOW_RED} alt="show-icon" />
                            </Link>
                          </td>
                        </tr>
                      ))
                    : dataForSupp.map((e, i) => (
                        <tr className="border-b border-black" key={i}>
                          <td className="py-4 px-4">{e.title}</td>
                          <td className="py-4 px-4">{e.jumlah}</td>
                          <td className="py-4 px-4">
                            <Link href={e?.link}>
                              <Image src={ICONS.IC_SHOW_RED} alt="show-icon" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-lg mb-2">Announcement</h5>
          <div className="bg-[#F5F5F5] p-4 text-center rounded-xl font-medium">
            {isEditing ? (
              <input
                type="text"
                value={content}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <>{announcements?.content}</>
            )}
          </div>
          {username == "admin" && (
            <div className="flex justify-end mt-4">
              <button
                onClick={isEditing ? handleSaveClick : handleEditClick}
                className="bg-primary p-2 rounded-md text-white w-24"
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

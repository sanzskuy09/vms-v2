import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

import ICONS from "@/config/icons";
import Link from "next/link";

const Dashboard = () => {
  const data = [
    {
      title: "Purchase Order",
      jumlah: 546,
      link: "/purchase-order",
      id: "79240839475",
    },
    {
      title: "Receiving Advice",
      jumlah: 546,
      link: "/receiving-advice",
      id: "79240839475",
    },
    {
      title: "Receiving Advice Response",
      jumlah: 546,
      link: "/receiving-advice-response",
      id: "79240839475",
    },
    {
      title: "Proforma Invoice",
      jumlah: 546,
      link: "/proforma-invoice",
      id: "79240839475",
    },
    {
      title: "Proforma Invoice Response",
      jumlah: 546,
      link: "/proforma-invoice-response",
      id: "79240839475",
    },
    {
      title: "Invoice",
      jumlah: 546,
      link: "/invoive",
      id: "79240839475",
    },
  ];
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
                  {data.map((e, i) => (
                    <tr className="border-b border-black" key={i}>
                      <td className="py-4 px-4">{e.title}</td>
                      <td className="py-4 px-4">{e.jumlah}</td>
                      <td className="py-4 px-4">
                        <Link href={`${e?.link}/${e?.id}`}>
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

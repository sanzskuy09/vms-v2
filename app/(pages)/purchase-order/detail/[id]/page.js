"use client";
import React from "react";

import CardInfoOrder from "./CardInfoOrder";
import CardInfoSupplier from "./CardInfoSupplier";
import TableData from "./TableData";

import { formatToRupiah } from "@/utils/FormatCurrency";

const DetailPoPage = ({ params }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">Purchase Order CDT : {params.id}</h1>

        <div>
          <button className="py-2 px-4 bg-primary rounded-md text-white">
            Cetak Dokumen
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <CardInfoOrder />
        <CardInfoSupplier />
      </div>

      <TableData />

      <div>
        <p className="font-semibold m-0">Keterangan :</p>
        <ul className="list-disc font-semibold pl-5">
          <li>Selalu sertakan dokumen ini saat melakukan pengiriman barang</li>
          <li>
            Pemasok harus menagih TRI sesuai harga satuan yang tercantum dalam
            PO. Dalam hal pemasok menagih TRI dengan harga satuan yang lebih
            tinggi dari harga satuan yang tercantumdalam PO. maka TRI hanya
            wajib membayar pemasok sesuai harga satuan tersebut dalam PO.
          </li>
          <li>
            Jika hanya yang tertera pada PO kami tidak sesuai dengan
            kesepakatan, anda bisa menghubungi bagian commercial/buyer yang
            bersangkutan sebelum melakukan pengiriman
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DetailPoPage;

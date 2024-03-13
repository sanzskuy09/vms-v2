"use client";
import React from "react";

import CardInfoOrder from "./CardInfoOrder";
import CardInfoSupplier from "./CardInfoSupplier";
import TableData from "./TableData";

const DetailPfiPage = ({ params }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">Proforma Invoice Response CDT : {params.id}</h1>

        <div className="flex gap-4">
          <button className="py-2 px-4 bg-primary rounded-md text-white hover:opacity-80">
            Cetak Dokumen
          </button>
          <button className="py-2 px-4 bg-primary rounded-md text-white w-24 hover:opacity-80">
            Terima
          </button>
          <button className="py-2 px-4 bg-primary rounded-md text-white w-24 hover:opacity-80">
            Cancel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <CardInfoOrder />
        <CardInfoSupplier />
      </div>

      <TableData />
    </div>
  );
};

export default DetailPfiPage;

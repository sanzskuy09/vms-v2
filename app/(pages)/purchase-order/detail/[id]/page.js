"use client";
import React, { useEffect, useState } from "react";

import CardInfoOrder from "./CardInfoOrder";
import CardInfoSupplier from "./CardInfoSupplier";
import TableData from "./TableData";

import { formatToRupiah } from "@/utils/FormatCurrency";

import { API, URL } from "@/config/api";

const DetailPoPage = ({ params }) => {
  // console.log(params.id);
  const [dataItem, setDataItem] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataItemPO = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `${URL.GET_ITEM_PO}?purchase_order=${params?.id}`
      );

      const data = res.data.result.items;
      setDataItem(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getDataDetailPO = async () => {
    try {
      setLoading(true);
      const res = await API.post(URL.GET_DETAIL_PO, { id: params.id });

      const data = res.data.result.items[0];
      setDataDetail(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // console.log("data item", dataItem);
  // console.log("data detail", dataDetail);

  useEffect(() => {
    getDataItemPO();
    getDataDetailPO();
  }, []);

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
        <CardInfoOrder data={dataDetail} />
        <CardInfoSupplier data={dataDetail} />
      </div>

      <TableData data={dataItem} />

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

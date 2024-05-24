"use client";
import { useState, useEffect } from "react";

import CardInfoOrder from "./CardInfoOrder";
import CardInfoSupplier from "./CardInfoSupplier";
import TableData from "./TableData";

import { API, URL } from "@/config/api";

const DetailRaPage = ({ params }) => {
  const [dataItem, setDataItem] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDetailRAR = async () => {
    try {
      setLoading(true);
      const res = await API.post(URL.GET_DETAIL_RAR, {
        id: params.id,
      });

      // console.log(res.data.result.items[0]);
      const data = res.data.result.items[0];
      setDataDetail(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getItemRAR = async () => {
    try {
      setLoading(true);
      const res = await API.get(`${URL.GET_ITEM_RAR}?id=${params.id}`);

      const data = res.data.result.items;
      setDataItem(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getItemRAR();
    getDetailRAR();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">
          Receiving Advice Response CDT : {dataDetail?.purchase_order}
        </h1>

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
        <CardInfoOrder data={dataDetail} />
        <CardInfoSupplier data={dataDetail} />
      </div>

      <TableData data={dataItem} loading={loading} />
    </div>
  );
};

export default DetailRaPage;

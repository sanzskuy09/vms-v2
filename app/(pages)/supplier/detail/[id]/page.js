"use client";
import React, { useEffect, useState } from "react";
import CardInformation from "@/components/CardInformation";
import { API, URL } from "@/config/api";

const columnCard1 = [
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Telepon Number",
    key: "mobile_number",
  },
  {
    title: "Telepon Fax",
    key: "fax",
  },
];

const columnCard2 = [
  {
    title: "Kode Supplier",
    key: "code",
  },
  {
    title: "Nama Lokal",
    key: "local_name",
  },
  {
    title: "ID Pajak",
    key: "tax_id",
  },
];

const DetailSupplierPage = ({ params }) => {
  const [dataItem, setDataItem] = useState([]);
  const [dataKontak, setDataKontak] = useState([]);
  const [loading, setLoading] = useState(false);

  const getItemSupp = async () => {
    try {
      setLoading(true);
      const res = await API.get(`${URL.GET_ITEM_SUPP}?code=${params.id}`);

      const data = res.data.result[0];
      setDataItem(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getDetailSupp = async () => {
    try {
      setLoading(true);
      const res = await API.post(URL.GET_DETAIL_SUPP);

      const data = res.data.result.items;
      const filter = data.filter((item) => item.username === params.id);

      setDataKontak(filter[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // const data = {
  //   receiver_code: " 029-ITC DEPOK",
  //   dept_code: "-Butchery",
  //   no_order: "915003095",
  //   tgl_order: "Kamis, 15 Januari 2015, 15:29",
  // };

  useEffect(() => {
    getItemSupp();
    getDetailSupp();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">Supplier : {params.id}</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <CardInformation
          title={"Informasi Kontak"}
          column={columnCard1}
          data={dataKontak}
        />

        <CardInformation
          title={"Informasi Supplier"}
          column={columnCard2}
          data={dataItem}
        />
      </div>
    </div>
  );
};

export default DetailSupplierPage;

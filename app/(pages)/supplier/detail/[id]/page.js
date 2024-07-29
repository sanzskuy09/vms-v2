"use client";
import React, { useEffect, useState } from "react";
import CardInformation from "@/components/CardInformation";
import { API, URL } from "@/config/api";

const columnCard1 = [
  {
    title: "Email",
    key: "primary_email",
  },
  {
    title: "Telepon Number",
    key: "phone",
  },
  {
    title: "Telepon Fax",
    key: "fax",
  },
  {
    title: "Alamat Perusahaan",
    key: "company_address1",
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
  {
    title: "Nomor Registration Perusahaan",
    key: "company_registration_number",
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

      const resDetail = await API.post(URL.GET_DETAIL_SUPP);

      const dataDetail = resDetail.data.result.items;
      const filter = dataDetail?.filter((item) => item.username === params.id);

      setDataKontak(filter[0]);
      setDataItem((prevDataItem) => ({
        ...prevDataItem,
        code: data.code,
        local_name: data.local_name,
        tax_id: data.tax_id,
        company_registration_number: filter[0].company_registration_number,
      }));

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
      const filter = data?.filter((item) => item.username === params.id);

      setDataKontak(filter[0]);
      setDataItem((prevDataItem) => ({
        ...prevDataItem,
        company_registration_number: filter[0].company_registration_number,
      }));

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // console.log(dataKontak, "dataKontak");
  // console.log(dataItem, "dataItem");

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

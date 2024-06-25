"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CardInfoOrder from "./CardInfoOrder";
import CardInfoSupplier from "./CardInfoSupplier";
import CardDetailInvoice from "./CardDetailInvoice";
import TableData from "./TableData";

import { formatToRupiah } from "@/utils/FormatCurrency";

import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import { toastFailed, toastSuccess } from "@/utils/toastify";

import { API, URL } from "@/config/api";

const DetailPoPage = ({ params }) => {
  const router = useRouter();
  const emailUser = localStorage.getItem("email");

  const [upload, setUpload] = useState(false);

  const [dataItem, setDataItem] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDetailINV = async () => {
    try {
      setLoading(true);
      const res = await API.post(URL.GET_DETAIL_INV, {
        id: params.id,
      });

      // console.log(res.data);
      const data = res.data.result.items[0];
      setDataDetail(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getItemINV = async () => {
    try {
      setLoading(true);
      const res = await API.post(URL.GET_ITEM_INV, {
        id: params.id,
      });

      const data = res.data.result.items;
      setDataItem(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAccept = async (e) => {
    confirm({
      title: "Kamu yakin ingin mengirim invoice ini?",
      icon: <ExclamationCircleFilled />,
      centered: true,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          setLoading(true);
          const res = await API.post(URL.ACCEPT_INV, {
            id: params.id,
          });

          const iId = res.data.result.i_id;

          toastSuccess("Invoice Accepted");
          router.push(`/invoice/detail/${iId}`);
          setLoading(false);
        } catch (error) {
          console.log(error);
          toastFailed("gagal terima invoice");
          setLoading(false);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // console.log(dataItem);
  // console.log(dataDetail);

  useEffect(() => {
    getItemINV();
    getDetailINV();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">Invoice CDT : {dataDetail?.po?.id}</h1>

        <div className="flex gap-4">
          <button className="py-2 px-4 bg-primary rounded-md text-white hover:opacity-80">
            Cetak Dokumen
          </button>
          <button
            onClick={handleAccept}
            className="py-2 px-4 bg-primary rounded-md text-white w-24 hover:opacity-80"
          >
            Kirim
          </button>
          <button className="py-2 px-4 bg-primary rounded-md text-white hover:opacity-80">
            Batalkan Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <CardInfoOrder data={dataDetail} />
        <CardInfoSupplier data={dataDetail} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <CardDetailInvoice data={dataDetail} />

        <div className={`bg-secondary p-4 h-[240px] `}>
          <h2 className="font-bold mb-2">Berkas Faktur Pajak</h2>
        </div>
      </div>

      <div className={`bg-secondary p-4 mb-4`}>
        <h2 className="font-bold mb-4">Berkas Dokumen Pendukung</h2>

        <table className="w-full table-fixed border-collapse border border-black">
          <tr>
            <td className="border border-black py-4 px-8">Surat jalan</td>
            <td className="border border-black py-4 text-center">
              {!upload ? (
                <button
                  type="button"
                  className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                >
                  Upload File
                </button>
              ) : (
                <p className="text-primary">CTRI000000001.pdf</p>
              )}
            </td>
            <td className="border border-black py-4 text-center">
              <button
                type="button"
                className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
              >
                Hapus
              </button>
            </td>
          </tr>

          <tr>
            <td className="border border-black py-4 px-8">Invoice</td>
            <td className="border border-black py-4 text-center">
              {!upload ? (
                <button
                  type="button"
                  className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                >
                  Upload File
                </button>
              ) : (
                <p className="text-primary">CTRI000000001.pdf</p>
              )}
            </td>
            <td className="border border-black py-4 text-center">
              <button
                type="button"
                className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
              >
                Hapus
              </button>
            </td>
          </tr>

          <tr>
            <td className="border border-black py-4 px-8">Kwitansi</td>
            <td className="border border-black py-4 text-center">
              {!upload ? (
                <button
                  type="button"
                  className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                >
                  Upload File
                </button>
              ) : (
                <p className="text-primary">CTRI000000001.pdf</p>
              )}
            </td>
            <td className="border border-black py-4 text-center">
              <button
                type="button"
                className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
              >
                Hapus
              </button>
            </td>
          </tr>
        </table>
      </div>

      <TableData data={dataItem} loading={loading} />
    </div>
  );
};

export default DetailPoPage;

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CardInfoOrder from "./CardInfoOrder";
import CardInfoSupplier from "./CardInfoSupplier";
import TableData from "./TableData";

import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import { toastFailed, toastSuccess } from "@/utils/toastify";

import { API, URL } from "@/config/api";

const DetailPfiPage = ({ params }) => {
  const router = useRouter();
  const emailUser = localStorage.getItem("email");

  const [dataItem, setDataItem] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDetailPFIR = async () => {
    try {
      setLoading(true);
      const res = await API.post(URL.GET_DETAIL_PFIR, {
        id: params.id,
      });

      const data = res.data.result;

      const combinedData = {
        ...data.PFIR,
        ...data.RA[0],
        rapo: data.RA[0]?.rapo,
      };
      setDataDetail(combinedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getItemPFIR = async () => {
    try {
      setLoading(true);
      const res = await API.post(URL.GET_ITEM_PFIR, {
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
      title: "Kamu yakin ingin mengirim data ini?",
      icon: <ExclamationCircleFilled />,
      centered: true,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          setLoading(true);
          const res = await API.post(URL.ACCEPT_PFIR, {
            action: "ACCEPT",
            id: params.id,
            editor_name: "system",
          });

          const pfiId = res.data.result.pfi_id;

          toastSuccess("Proforma Invoice Accepted");
          router.push(`/invoice/detail/${pfiId}`);
          setLoading(false);
        } catch (error) {
          console.log(error);
          toastFailed("gagal terima receiving advice response");
          setLoading(false);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleReject = async (e) => {
    confirm({
      title: "Kamu yakin ingin batalkan data ini?",
      icon: <ExclamationCircleFilled />,
      centered: true,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          setLoading(true);
          const res = await API.post(URL.CANCEL_PFIR, {
            action: "CANCEL",
            id: params.id,
            editor_name: "system",
          });

          const pfiId = res.data.result.id;

          toastSuccess("Proforma Invoice Canceled");
          router.push(`/proforma-invoice/detail/${pfiId}`);
          setLoading(false);
        } catch (error) {
          console.log(error);
          toastFailed("gagal terima receiving advice");
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
    getItemPFIR();
    getDetailPFIR();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">
          Proforma Invoice Response CDT : {dataDetail?.purchase_order}
        </h1>

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
          <button
            onClick={handleReject}
            className="py-2 px-4 bg-primary rounded-md text-white w-24 hover:opacity-80"
          >
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

export default DetailPfiPage;

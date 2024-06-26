"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import CardInfoOrder from "./CardInfoOrder";
import CardInfoSupplier from "./CardInfoSupplier";
import TableData from "./TableData";

import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import { toastFailed, toastSuccess } from "@/utils/toastify";

import { API, URL } from "@/config/api";

const DetailRaPage = ({ params }) => {
  const router = useRouter();
  const emailUser = localStorage.getItem("email");

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
      const res = await API.post(URL.GET_ITEM_RAR, { id: params.id });

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
          const res = await API.post(URL.ACCEPT_RAR, {
            action: "ACCEPT",
            id: params.id,
            editor_name: "system",
          });

          const pfiId = res.data.result.pfi_id;

          toastSuccess("Receiving Advice Response Accepted");
          router.push(`/proforma-invoice/detail/${pfiId}`);
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
          const res = await API.post(URL.CANCEL_RAR, {
            action: "CANCEL",
            id: params.id,
            editor_name: "system",
          });

          const raId = res.data.result.ra_id;

          toastSuccess("Receiving Advice Canceled");
          router.push(`/receiving-advice/detail/${raId}`);
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

  useEffect(() => {
    getItemRAR();
    getDetailRAR();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">
          Receiving Advice Response CDT : {dataDetail?.po?.id}
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

export default DetailRaPage;

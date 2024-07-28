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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DetailRarPage = ({ params }) => {
  const router = useRouter();
  const emailUser = localStorage.getItem("email");

  const [dataItem, setDataItem] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDetailRA = async () => {
    try {
      setLoading(true);
      const res = await API.post(URL.GET_DETAIL_RA, {
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

  // console.log("data detail", dataDetail.status);

  const getItemRA = async () => {
    try {
      setLoading(true);
      const res = await API.post(URL.GET_ITEM_RA, {
        id: params.id,
      });

      // console.log(res);
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
      title: "Kamu yakin ingin menerima data ini?",
      icon: <ExclamationCircleFilled />,
      centered: true,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          setLoading(true);
          const res = await API.post(URL.ACCEPT_RA, {
            action: "ACCEPT",
            id: params.id,
            editor_name: "system",
            email: emailUser,
          });

          const pfiId = res.data.result.pfi_id;

          toastSuccess("Receiving Advice Accepted");
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

  const handleReject = async (e) => {
    confirm({
      title: "Kamu yakin ingin menolak data ini?",
      icon: <ExclamationCircleFilled />,
      centered: true,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          setLoading(true);
          const res = await API.post(URL.ACCEPT_RA, {
            action: "REJECT",
            id: params.id,
            editor_name: "system",
            email: emailUser,
          });

          const rarId = res.data.result.rar_id;

          toastSuccess("Receiving Advice Rejected");
          router.push(`/receiving-advice-response/detail/${rarId}`);
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

  useEffect(() => {
    getItemRA();
    getDetailRA();
  }, []);

  const downloadPDF = () => {
    const buttons = document.querySelector(".btn-tools");
    const title = document.querySelector(".title");
    const capture = document.querySelector(".report");

    // Hide component
    buttons.style.display = "none";
    title.style.display = "flex";

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Receiving-Advice.pdf");
    });

    // Show component again
    buttons.style.display = "flex";
    title.style.display = "none";
  };

  return (
    <div className="report p-8">
      <h1 className="text-4xl font-bold text-center w-full mb-12 hidden title">
        Receiving Advice
      </h1>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">
          Receiving Advice CDT : {dataDetail?.rapo?.id}
        </h1>

        <div className="flex gap-4 btn-tools">
          <button
            onClick={downloadPDF}
            className="py-2 px-4 bg-primary rounded-md text-white hover:opacity-80"
          >
            Cetak Dokumen
          </button>

          {(dataDetail?.status == "NEW" ||
            dataDetail?.status == "DRAFT" ||
            dataDetail?.status == "AWAITING_ACTION") && (
            <>
              <button
                onClick={handleAccept}
                className="py-2 px-4 bg-primary rounded-md text-white w-24 hover:opacity-80"
              >
                Terima
              </button>
              <button
                onClick={handleReject}
                className="py-2 px-4 bg-primary rounded-md text-white w-24 hover:opacity-80"
              >
                Tolak
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <CardInfoOrder data={dataDetail} />
        <CardInfoSupplier data={dataDetail} />
      </div>

      <TableData data={dataItem} />

      <div className="mt-8">
        <p className="font-semibold m-0">Keterangan :</p>
        <ul className="list-disc font-semibold pl-5">
          <li>
            apabila total yang dikirim ke TRI tidak sesuai dengan pesanan, dan
            sudah mengkonfirmasi ke pihak commersial/buyer maka anda bisa
            menolak RA ini untuk diproses ke RAR
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DetailRarPage;

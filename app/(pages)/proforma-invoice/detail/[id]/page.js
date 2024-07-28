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

const DetailPfiPage = ({ params }) => {
  const router = useRouter();
  const emailUser = localStorage.getItem("email");

  const [dataItem, setDataItem] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDetailPFI = async () => {
    try {
      setLoading(true);
      const res = await API.post(URL.GET_DETAIL_PFI, {
        id: params.id,
      });

      // console.log(res.data.result.items[0]);
      const data = res.data.result;

      const combinedData = {
        ...data.PFI,
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

  const getItemPFI = async () => {
    try {
      setLoading(true);
      const res = await API.post(URL.GET_ITEM_PFI, {
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
      title: "Kamu yakin ingin terima data ini?",
      icon: <ExclamationCircleFilled />,
      centered: true,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          setLoading(true);
          const res = await API.post(URL.ACCEPT_REJECT_PFI, {
            action: "ACCEPT",
            id: params.id,
          });

          const invId = res.data.result.inv_id;

          toastSuccess("Proforma Invoice Accepted");
          router.push(`/invoice/detail/${invId}`);
          setLoading(false);
        } catch (error) {
          console.log(error);
          toastFailed("gagal terima proforma invoice");
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
          const res = await API.post(URL.ACCEPT_REJECT_PFI, {
            action: "REJECT",
            id: params.id,
          });

          const pfirId = res.data.result.pfir_id;

          toastSuccess("Proforma Invoice Rejected");
          router.push(`/proforma-invoice-response/detail/${pfirId}`);
          setLoading(false);
        } catch (error) {
          console.log(error);
          toastFailed("gagal terima Proforma Invoice");
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
    getItemPFI();
    getDetailPFI();
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
      pdf.save("Proforma-Invoice.pdf");
    });

    // Show component again
    buttons.style.display = "flex";
    title.style.display = "none";
  };

  return (
    <div className="report p-8">
      <h1 className="text-4xl font-bold text-center w-full mb-12 hidden title">
        Proforma Invoice
      </h1>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">
          Proforma Invoice CDT : {dataDetail?.purchase_order}
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

      <TableData data={dataItem} loading={loading} />

      <div className="mt-8">
        <p className="font-semibold m-0">Keterangan :</p>
        <ul className="list-disc font-semibold pl-5">
          <li>
            apabila terjadi perubahan harga per item, dan sudah mengkonfirmasi
            ke pihak commersial/buyer maka anda bisa menolak PFI ini untuk
            diproses ke PFIR
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DetailPfiPage;

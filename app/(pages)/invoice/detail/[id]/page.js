"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CardInfoOrder from "./CardInfoOrder";
import CardInfoSupplier from "./CardInfoSupplier";
import CardDetailInvoice from "./CardDetailInvoice";
import TableData from "./TableData";

import { formatToRupiah } from "@/utils/FormatCurrency";

import { Modal, Upload, Button, message, Input } from "antd";
const { confirm } = Modal;

import { UploadOutlined } from "@ant-design/icons";
import ICON_PDF from "@/assets/icon/ic_pdf.svg";
import ICON_UPLOAD from "@/assets/icon/ic_upload.svg";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { toastFailed, toastSuccess } from "@/utils/toastify";

import { API, URL, BASE_URL } from "@/config/api";
import Image from "next/image";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DetailPoPage = ({ params }) => {
  const router = useRouter();
  const emailUser = localStorage.getItem("email");

  const [uploadSJ, setUploadSJ] = useState(false);
  const [uploadINV, setUploadINV] = useState(false);
  const [uploadKWI, setUploadKWI] = useState(false);
  const [uploadTAX, setUploadTAX] = useState(false);

  const [dataItem, setDataItem] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);

  // handle file
  const [fileSuratJalan, setfileSuratJalan] = useState([]);
  const [fileinvoice, setfileinvoice] = useState([]);
  const [filekwitansi, setfilekwitansi] = useState([]);
  const [fileTAX, setfileTAX] = useState([]);

  // console.log(dataDetail, " >> status");

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setUploading(true);
      setFileName(info.file);
    }

    console.log(info.file.status, " >> status");
    if (info.file.status === "done") {
      setUploading(false);
      // const { filePath } = info.file.response;
      console.log(`${info.file.name} file uploaded successfully to `);
    } else if (info.file.status === "error") {
      setUploading(false);
      console.error(`${info.file.name} file upload failed.`);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("namafile", file);
    // formData.append("filename", file.name);

    console.log(file, "file");

    try {
      const response = await fetch(
        "http://localhost:3001/vmsdev/inv/uploadSuratJalan?supplier_code=8330&purchase_order=CTRI000000000024",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();

      onSuccess(data);
      toastSuccess("file berhasil diupload");
    } catch (error) {
      onError(error);
      toastFailed("file gagal diupload");
    }
  };

  // Upload Surat Jalan
  const propsSuratJalan = {
    name: "file",
    listType: "picture",
    multiple: false,
    beforeUpload: () => {
      return false;
    },
    async onChange(info) {
      try {
        if (info.file.status !== "uploading") {
          let reader = new FileReader();
          reader.readAsDataURL(info.file);
          setFileName(info.file);

          const formData = new FormData();
          formData.append("namafile", info.file);

          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };

          await API.post(
            `${URL.UPLOAD_SURAT_JALAN}?supplier_code=${dataDetail?.supplier_code}&purchase_order=${dataDetail?.po?.id}`,
            formData,
            config
          );

          const suratJalan = await API.get(
            `${URL.GET_URL_FILE}?filename=DO_${dataDetail?.po?.id}.pdf`
          );

          if (suratJalan.status == 200) {
            setfileSuratJalan(suratJalan.data);
            toastSuccess("file berhasil diupload");
            setUploadSJ(true);
          }
        }
      } catch (error) {
        console.error(error);
        toastFailed("file gagal diupload");
      }
    },
  };

  // Upload Invoice
  const propsInv = {
    name: "file",
    listType: "picture",
    multiple: false,
    beforeUpload: () => {
      return false;
    },
    async onChange(info) {
      try {
        if (info.file.status !== "uploading") {
          let reader = new FileReader();
          reader.readAsDataURL(info.file);
          setFileName(info.file);

          const formData = new FormData();
          formData.append("namafile", info.file);

          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };

          await API.post(
            `${URL.UPLOAD_INV}?supplier_code=${dataDetail?.supplier_code}&purchase_order=${dataDetail?.po?.id}`,
            formData,
            config
          );

          const invoice = await API.get(
            `${URL.GET_URL_FILE}?filename=INVS_${dataDetail?.po?.id}.pdf`
          );

          if (invoice.status == 200) {
            setfileinvoice(invoice.data);
            toastSuccess("file berhasil diupload");
            setUploadINV(true);
          }
        }
      } catch (error) {
        console.error(error);
        toastFailed("file gagal diupload");
      }
    },
  };

  // Upload Kwitansi
  const propsKwitansi = {
    name: "file",
    listType: "picture",
    multiple: false,
    beforeUpload: () => {
      return false;
    },
    async onChange(info) {
      try {
        if (info.file.status !== "uploading") {
          let reader = new FileReader();
          reader.readAsDataURL(info.file);
          setFileName(info.file);

          const formData = new FormData();
          formData.append("namafile", info.file);

          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };

          await API.post(
            `${URL.UPLOAD_KWITANSI}?supplier_code=${dataDetail?.supplier_code}&purchase_order=${dataDetail?.po?.id}`,
            formData,
            config
          );

          const kwitansi = await API.get(
            `${URL.GET_URL_FILE}?filename=RCP_${dataDetail?.po?.id}.pdf`
          );

          if (kwitansi.status == 200) {
            setfilekwitansi(kwitansi.data);
            toastSuccess("file berhasil diupload");
            setUploadKWI(true);
          }
        }
      } catch (error) {
        console.error(error);
        toastFailed("file gagal diupload");
      }
    },
  };

  // Upload TAX
  const propsTax = {
    name: "file",
    listType: "picture",
    multiple: false,
    beforeUpload: () => {
      return false;
    },
    async onChange(info) {
      try {
        if (info.file.status !== "uploading") {
          let reader = new FileReader();
          reader.readAsDataURL(info.file);
          setFileName(info.file);

          const formData = new FormData();
          formData.append("namafile", info.file);
          formData.append("id", dataDetail?.id);

          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };

          const uploadTax = await API.post(
            `${URL.UPLOAD_TAX}?supplier_code=${dataDetail?.supplier_code}&purchase_order=${dataDetail?.po?.id}`,
            formData,
            config
          );

          const tax = await API.get(
            `${URL.GET_URL_FILE}?filename=TAX_${dataDetail?.po?.id}.pdf`
          );

          if (tax.status == 200) {
            setfileTAX(tax.data);
            toastSuccess("file berhasil diupload");
            setUploadTAX(true);
          }
        }
      } catch (error) {
        console.error(error);
        toastFailed("file TAX gagal diupload");
      }
    },
  };

  // hapus Dokumen
  const handleDeleteDokumen = async (e) => {
    confirm({
      title: "Kamu yakin ingin menghapus data ini?",
      icon: <ExclamationCircleFilled />,
      centered: true,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          setLoading(true);

          if (e[1] === "DO") {
            await API.delete(
              `${URL.DELETE_SURAT_JALAN}?filename=DO_${e[0]}.pdf`
            );
            setUploadSJ(false);
          } else if (e[1] === "INV") {
            await API.delete(`${URL.DELETE_INV}?filename=INVS_${e[0]}.pdf`);
            setUploadINV(false);
          } else if (e[1] === "RCP") {
            await API.delete(`${URL.DELETE_KWITANSI}?filename=RCP_${e[0]}.pdf`);
            setUploadKWI(false);
          } else if (e[1] === "TAX") {
            await API.delete(`${URL.DELETE_TAX}?filename=TAX_${e[0]}.pdf`);
            setUploadTAX(false);
          }

          toastSuccess("File berhasil dihapus");
          setLoading(false);
        } catch (error) {
          console.log(error);
          toastFailed("file gagal dihapus");
          setLoading(false);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const getDetailINV = async () => {
    try {
      setLoading(true);
      const res = await API.post(URL.GET_DETAIL_INV, {
        id: params.id,
      });

      const data = res.data.result.items[0];
      setDataDetail(data);

      try {
        // get surat jalan
        const suratJalan = await API.get(
          `${URL.GET_URL_FILE}?filename=DO_${data?.po?.id}.pdf`
        );

        if (suratJalan.status == 200) {
          setfileSuratJalan(suratJalan.data);
          setUploadSJ(true);
        }
      } catch (error) {
        console.error("Error getting surat jalan:", error);
      }

      try {
        // get inv
        const invoice = await API.get(
          `${URL.GET_URL_FILE}?filename=INVS_${data?.po?.id}.pdf`
        );

        if (invoice.status == 200) {
          setfileinvoice(invoice.data);
          setUploadINV(true);
        }
      } catch (error) {
        console.error("Error getting invoice:", error);
      }

      try {
        // get kwi
        const kwitansi = await API.get(
          `${URL.GET_URL_FILE}?filename=RCP_${data?.po?.id}.pdf`
        );

        if (kwitansi.status == 200) {
          setfilekwitansi(kwitansi.data);
          setUploadKWI(true);
        }
      } catch (error) {
        console.error("Error getting kwitansi:", error);
      }

      try {
        // get tax
        const tax = await API.get(
          `${URL.GET_URL_FILE}?filename=TAX_${data?.po?.id}.pdf`
        );

        if (tax.status == 200) {
          setfileTAX(tax.data);
          setUploadTAX(true);
        }
      } catch (error) {
        console.error("Error getting kwitansi:", error);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error getting detail INV:", error);
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
          router.push(`/invoice`);
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

  useEffect(() => {
    getItemINV();
    getDetailINV();
  }, []);

  const [isShowButton, setIsShowButton] = useState(true);

  const handleShowButton = () => {
    setIsShowButton(!isShowButton);
  };

  const downloadPDF = async () => {
    try {
      await handleShowButton();

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
        pdf.save("Invoice.pdf");
      });

      // Show component again
      buttons.style.display = "flex";
      title.style.display = "none";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="report p-8">
      <h1 className="text-4xl font-bold text-center w-full mb-12 hidden title">
        Invoice
      </h1>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">Invoice CDT : {dataDetail?.po?.id}</h1>

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
            <button
              onClick={handleAccept}
              className="py-2 px-4 bg-primary rounded-md text-white w-24 hover:opacity-80"
            >
              Kirim
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <CardInfoOrder data={dataDetail} />
        <CardInfoSupplier
          data={dataDetail}
          setData={getDetailINV}
          showEditButton={isShowButton}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <CardDetailInvoice
          data={dataDetail}
          setData={getDetailINV}
          showEditButton={isShowButton}
        />

        <div className={`bg-secondary p-4 h-[240px]`}>
          <h2 className="font-bold mb-2">Berkas Faktur Pajak</h2>

          <div style={{ display: "flex", alignItems: "center" }}>
            {!uploadTAX ? (
              <Upload
                listType="picture"
                beforeUpload={() => false}
                showUploadList={false}
                style={{ width: "100%" }}
                {...propsTax}
              >
                <button className="bg-[#ECE8E8] border-dashed border-2 border-black px-16 py-8 font-medium shadow-lg rounded-lg flex flex-col justify-center items-center underline">
                  <Image
                    src={ICON_UPLOAD}
                    alt="upload-icon"
                    width={22}
                    height={22}
                  />
                  Choose File
                </button>
                <p className="text-sm mt-1">Max Size : 2 MB</p>
              </Upload>
            ) : (
              <div className="flex flex-col gap-4">
                <a
                  href={`${fileTAX?.url_file}`}
                  className="bg-[#D9D9D9] py-4 px-8 rounded-md flex items-center gap-2"
                >
                  <Image
                    src={ICON_PDF}
                    alt="download-icon"
                    width={22}
                    height={22}
                  />
                  {fileTAX?.filename}
                </a>

                <div>
                  <button
                    type="button"
                    className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                    onClick={() =>
                      handleDeleteDokumen([dataDetail?.po?.id, "TAX"])
                    }
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`bg-secondary p-4 mb-4`}>
        <h2 className="font-bold mb-4">Berkas Dokumen Pendukung</h2>

        <table className="w-full table-fixed border-collapse border border-black">
          <tr>
            <td className="border border-black py-4 px-8">Surat jalan</td>
            <td className="border border-black py-4 text-center">
              {!uploadSJ ? (
                <>
                  <Upload
                    beforeUpload={() => false}
                    // customRequest={customRequest}
                    // onChange={handleChange}
                    showUploadList={false}
                    {...propsSuratJalan}
                  >
                    <button
                      type="button"
                      className="btn-tools bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                    >
                      Upload File
                    </button>
                  </Upload>
                </>
              ) : (
                <a
                  href={`${fileSuratJalan?.url_file}`}
                  className="text-primary"
                >
                  {fileSuratJalan?.filename}
                </a>
              )}
            </td>
            <td className="border border-black py-4 text-center">
              <button
                type="button"
                className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                onClick={() => handleDeleteDokumen([dataDetail?.po?.id, "DO"])}
              >
                Hapus
              </button>
            </td>
          </tr>

          <tr>
            <td className="border border-black py-4 px-8">Invoice</td>
            <td className="border border-black py-4 text-center">
              {!uploadINV ? (
                <>
                  <Upload showUploadList={false} {...propsInv}>
                    <button
                      type="button"
                      className="btn-tools bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                    >
                      Upload File
                    </button>
                  </Upload>
                </>
              ) : (
                <a href={`${fileinvoice?.url_file}`} className="text-primary">
                  {fileinvoice?.filename}
                </a>
              )}
            </td>
            <td className="border border-black py-4 text-center">
              <button
                type="button"
                className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                onClick={() => handleDeleteDokumen([dataDetail?.po?.id, "INV"])}
              >
                Hapus
              </button>
            </td>
          </tr>

          <tr>
            <td className="border border-black py-4 px-8">Kwitansi</td>
            <td className="border border-black py-4 text-center">
              {!uploadKWI ? (
                <>
                  <Upload showUploadList={false} {...propsKwitansi}>
                    <button
                      type="button"
                      className="btn-tools bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                    >
                      Upload File
                    </button>
                  </Upload>
                </>
              ) : (
                <a href={`${filekwitansi?.url_file}`} className="text-primary">
                  {filekwitansi?.filename}
                </a>
              )}
            </td>
            <td className="border border-black py-4 text-center">
              <button
                type="button"
                className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                onClick={() => handleDeleteDokumen([dataDetail?.po?.id, "RCP"])}
              >
                Hapus
              </button>
            </td>
          </tr>
        </table>
      </div>

      <TableData data={dataItem} loading={loading} />

      <div className="mt-8">
        <p className="font-semibold m-0">Keterangan :</p>
        <ul className="list-disc font-semibold pl-5">
          <li>
            untuk dapat mengirim data ini, diharuskan mengubah harga item pada
            kolom harga unit agar bisa dilanjutkan ke proses Invoice
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DetailPoPage;

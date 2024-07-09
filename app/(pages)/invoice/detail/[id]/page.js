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
          toastSuccess("file berhasil diupload");
          setUploadSJ(true);
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
          toastSuccess("file berhasil diupload");
          setUploadINV(true);
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
          toastSuccess("file berhasil diupload");
          setUploadKWI(true);
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

          await API.post(
            `${URL.UPLOAD_TAX}?supplier_code=${dataDetail?.supplier_code}&purchase_order=${dataDetail?.po?.id}`,
            formData,
            config
          );
          toastSuccess("file berhasil diupload");
          setUploadTAX(true);
        }
      } catch (error) {
        console.error(error);
        toastFailed("file gagal diupload");
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
          console.log(e, " data e");

          if (e[1] === "DO") {
            await API.delete(
              `${URL.DELETE_SURAT_JALAN}?filename=DO_${e[0]}.pdf`
            );
            setUploadSJ(false);
          } else if (e[1] === "INV") {
            await API.delete(`${URL.DELETE_INV}?filename=INVS_${e[0]}.pdf`);
            setUploadKWI(false);
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
          {/* <button className="py-2 px-4 bg-primary rounded-md text-white hover:opacity-80">
            Batalkan Invoice
          </button> */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <CardInfoOrder data={dataDetail} />
        <CardInfoSupplier data={dataDetail} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <CardDetailInvoice data={dataDetail} />

        <div className={`bg-secondary p-4 h-[240px]`}>
          <h2 className="font-bold mb-2">Berkas Faktur Pajak</h2>

          <div style={{ display: "flex", alignItems: "center" }}>
            {!uploadTAX ? (
              <Upload
                listType="picture"
                beforeUpload={() => false}
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
                  href={`${BASE_URL}${URL.DOWNLOAD_FILE}?filename=TAX_${dataDetail?.po?.id}.pdf`}
                  className="bg-[#D9D9D9] py-4 px-8 rounded-md flex items-center gap-2"
                >
                  <Image
                    src={ICON_PDF}
                    alt="download-icon"
                    width={22}
                    height={22}
                  />
                  {`TAX_${dataDetail?.po?.id}.pdf`}
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
                      className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                    >
                      Upload File
                    </button>
                  </Upload>
                </>
              ) : (
                <a
                  href={`${BASE_URL}${URL.DOWNLOAD_FILE}?filename=DO_${dataDetail?.po?.id}.pdf`}
                  className="text-primary"
                >
                  {`DO_${dataDetail?.po?.id}.pdf`}
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
                      className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                    >
                      Upload File
                    </button>
                  </Upload>
                </>
              ) : (
                <a
                  href={`${BASE_URL}${URL.DOWNLOAD_FILE}?filename=INVS_${dataDetail?.po?.id}.pdf`}
                  className="text-primary"
                >
                  {`INVS_${dataDetail?.po?.id}.pdf`}
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
                      className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                    >
                      Upload File
                    </button>
                  </Upload>
                </>
              ) : (
                <a
                  href={`${BASE_URL}${URL.DOWNLOAD_FILE}?filename=RCP_${dataDetail?.po?.id}.pdf`}
                  className="text-primary"
                >
                  {`RCP_${dataDetail?.po?.id}.pdf`}
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
    </div>
  );
};

export default DetailPoPage;

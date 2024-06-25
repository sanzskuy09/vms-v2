"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { ConfigProvider, Form, Input } from "antd";

import { toastSuccess, toastFailed } from "@/utils/toastify";
import { API, URL } from "@/config/api";

const TambahPOPage = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      // const res = await API.post(URL.CREATE_SUPP, e);

      toastSuccess("Create Supplier Success");
      // router.push("/supplier");
    } catch (error) {
      console.log(error);
      toastFailed("Create Supplier Failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1 className="text-4xl mb-12">Form Create Purchase Order</h1>

      <div className="bg-[#F5F5F5] p-8 rounded-xl">
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorPrimary: "#ED1B24",
                colorBgContainer: "#F8E1E0",
                activeBorderColor: "#ED1B24",
                algorithm: true,
              },
            },
          }}
        >
          <form action="">
            <div className="grid grid-cols-2 gap-8">
              {/* left side */}
              <div className="flex flex-col gap-8">
                <h1 className="font-bold">Purchase Order</h1>

                <div className="flex gap-3 items-center">
                  <label htmlFor="nama_lokal" className="min-w-44">
                    Purchase Order
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="nama_perusahaan" className="min-w-44">
                    Nomor Purchase Order
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Tanggal Pengiriman
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Alamat Pengiriman
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Dikirim Ke
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Kode Pengiriman
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                {/* Supplier */}
                <h1 className="font-bold">Supplier</h1>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Kode Supplier
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>
                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Nama Supplier
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>
                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Nomor Telepon
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>
                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Fax
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>
                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Kode Departemen
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>
                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Nama Departemen
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>
                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Departemen Supplier
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                {/* Toko */}
                <h1 className="font-bold">Toko</h1>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Kode Toko
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>
                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Nomor Pesanan Toko
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>
                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Kode Bisnis Unit
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>
              </div>

              {/* right side */}
              <div className="flex flex-col gap-8">
                <h1 className="font-bold">Item</h1>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Kode Item
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Nama Item
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>
                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Nama Item Lokal
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Barcode
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Harga Item
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Kapasitas
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Jumlah Item
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Nomor Urut
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Promosi/Gratis
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Jumlah Per Pack
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Jumlah Pack
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Jumlah Barang SKU
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Total Harga
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Pesanan Dari
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="invisible h-4">p</div>
                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Nama Business Unit
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="" className="min-w-44">
                    Alamat Business Unit
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex justify-end items-center ">
                  <button
                    type="submit"
                    className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default TambahPOPage;

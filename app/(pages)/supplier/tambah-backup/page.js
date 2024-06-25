"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { ConfigProvider, Form, Input } from "antd";

import { toastSuccess, toastFailed } from "@/utils/toastify";
import { API, URL } from "@/config/api";

const TambahSupplierPage = () => {
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
      <h1 className="text-4xl mb-12">Form Create Supplier</h1>

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
                <div className="flex gap-4 h-12">
                  <div className="flex gap-3 items-center flex-auto w-[60%]">
                    <label htmlFor="username" className="min-w-44">
                      Username
                    </label>
                    <p>:</p>
                    <Input placeholder="" size="large" className="w-28" />
                  </div>

                  <div className="flex gap-3 items-center flex-auto w-[40%]">
                    <label htmlFor="code_supp" className="min-w-16">
                      Kode Supplier
                    </label>
                    <p>:</p>
                    <Input placeholder="" size="large" className="w-24" />
                  </div>
                </div>

                <div className="flex gap-4 h-12">
                  <div className="flex gap-3 items-center flex-auto w-[60%]">
                    <label htmlFor="role" className="min-w-44">
                      Role
                    </label>
                    <p>:</p>
                    <Input placeholder="" size="large" className="w-28" />
                  </div>

                  <div className="flex gap-3 items-center flex-auto w-[40%]">
                    <label htmlFor="code_supp" className="min-w-16">
                      Nama Role
                    </label>
                    <p>:</p>
                    <Input placeholder="" size="large" className="w-24" />
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="password" className="min-w-44">
                    Password
                  </label>
                  <p>:</p>
                  <Input.Password placeholder="Your Password" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="password" className="min-w-44">
                    Konfimasi Password
                  </label>
                  <p>:</p>
                  <Input.Password placeholder="Your Password" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="nama_lokal" className="min-w-44">
                    Nama Lokal
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="nama_perusahaan" className="min-w-44">
                    Nama Perusahaan
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="nama_perusahaan" className="min-w-44">
                    Nomor Registrasi Perusahaan
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>
              </div>

              {/* right side */}
              <div className="flex flex-col gap-8">
                <div className="flex gap-4 h-12">
                  <div className="flex gap-3 items-center flex-auto w-[60%]">
                    <label htmlFor="no_pajak" className="min-w-44">
                      Nomor Pajak
                    </label>
                    <p>:</p>
                    <Input placeholder="" size="large" className="w-28" />
                  </div>

                  <div className="flex gap-3 items-center flex-auto w-[40%]">
                    <label htmlFor="pajak" className="min-w-16">
                      Pajak
                    </label>
                    <p>:</p>
                    <Input placeholder="" size="large" className="w-24" />
                  </div>
                </div>

                <div className="flex gap-4 h-12">
                  <div className="flex gap-3 items-center flex-auto w-[60%]">
                    <label htmlFor="kota" className="min-w-44">
                      Kota
                    </label>
                    <p>:</p>
                    <Input placeholder="" size="large" className="w-28" />
                  </div>

                  <div className="flex gap-3 items-center flex-auto w-[40%]">
                    <label htmlFor="negara" className="min-w-16">
                      Negara
                    </label>
                    <p>:</p>
                    <Input placeholder="" size="large" className="w-24" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex gap-3 items-center flex-auto w-[60%]">
                    <label htmlFor="no_hp" className="min-w-44">
                      Nomor Telepon
                    </label>
                    <p>:</p>
                    <Input placeholder="" size="large" className="w-28" />
                  </div>

                  <div className="flex gap-3 items-center flex-auto w-[40%]">
                    <label htmlFor="fax" className="min-w-16">
                      FAX
                    </label>
                    <p>:</p>
                    <Input placeholder="" size="large" className="w-24" />
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="email" className="min-w-44">
                    Email
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="kode_pos" className="min-w-44">
                    Kode Pos
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="alamat_pt_1" className="min-w-44">
                    Alamat Perusahaan 1
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>

                <div className="flex gap-3 items-center">
                  <label htmlFor="alamat_pt_2" className="min-w-44">
                    Alamat Perusahaan 2
                  </label>
                  <p>:</p>
                  <Input placeholder="" size="large" />
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center mt-8">
              <button
                type="submit"
                className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
              >
                Simpan
              </button>
            </div>
          </form>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default TambahSupplierPage;

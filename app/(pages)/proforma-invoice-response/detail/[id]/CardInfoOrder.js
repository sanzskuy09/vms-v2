import React from "react";
import CardInformation from "@/components/CardInformation";

const columnCard = [
  {
    title: "Kode Penerima ",
    key: "receiving_code",
  },
  {
    title: "Kode Departemen",
    key: "dept_code",
  },
  {
    title: "Nomor order",
    key: "no_order",
  },
  {
    title: "Tanggal order",
    key: "tgl_order",
  },
];

const columnCard2 = [
  {
    title: "Tanggal PFI",
    key: "tgl_order_pfi",
  },
  {
    title: "Revisi",
    key: "revised",
    render: (text) => <p>{text}</p>,
  },
];

const data = {
  receiving_code: "897655678990 029-ITC DEPOK",
  dept_code: "24-Butchery",
  no_order: "915003095",
  tgl_order: "Kamis, 15 Januari 2015, 15:29",
};

const data2 = {
  tgl_order_pfi: "Kamis, 15 Januari 2022, 15:29",
  revised: 0,
};

const CardInfoOrder = () => {
  return (
    <div>
      <CardInformation
        title={"Informasi Order"}
        column={columnCard}
        data={data}
        title2={"Informasi RA"}
        column2={columnCard2}
        data2={data2}
      />
    </div>
  );
};

export default CardInfoOrder;

import React from "react";
import CardInformation from "@/components/CardInformation";

const columnCard = [
  {
    title: "Kode Penerima ",
    key: "receiver_code",
  },
  {
    title: "Kode Departemen",
    object: "rapo",
    key: "dept_code",
  },
  {
    title: "Nomor order",
    object: "rapo",
    key: "po_no",
  },
  {
    title: "Tanggal order",
    object: "rapo",
    key: "order_date",
  },
];

const columnCard2 = [
  {
    title: "Tanggal PFI",
    dataIndex: "date",
    key: "pro_forma_invoice_date",
  },
  {
    title: "Revisi",
    key: "revision",
    render: (text) => <p>{text}</p>,
  },
];

const CardInfoOrder = ({ data }) => {
  // const data1 = {
  //   receiving_code: "897655678990 029-ITC DEPOK",
  //   dept_code: "24-Butchery",
  //   no_order: "915003095",
  //   tgl_order: "Kamis, 15 Januari 2015, 15:29",
  // };

  // const data2 = {
  //   tgl_order_pfi: "Kamis, 15 Januari 2022, 15:29",
  //   revised: 0,
  // };

  return (
    <div>
      <CardInformation
        title={"Informasi Order"}
        column={columnCard}
        data={data}
        title2={"Informasi RA"}
        column2={columnCard2}
        data2={data}
      />
    </div>
  );
};

export default CardInfoOrder;

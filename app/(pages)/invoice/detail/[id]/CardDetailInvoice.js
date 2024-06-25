import React from "react";
import CardInformation from "@/components/CardInformation";

const columnCard = [
  {
    title: "Nomor Seri Pajak",
    object: "po",
    key: "po_no",
  },
  {
    title: "Konfirmaasi Nomor Seri Pajak",
    object: "po",
    key: "po_no",
  },
  {
    title: "Tanggal Faktur Pajak",
    object: "po",
    key: "order_date",
    dataIndex: "date",
  },
  {
    title: "Nomor Invoice Supplier",
    object: "po",
    key: "dept_code",
  },
  {
    title: "Tanggal Invoice Supplier",
    object: "po",
    key: "order_date",
    dataIndex: "date",
  },
];

const CardDetailInvoice = ({ data }) => {
  return (
    <div>
      <CardInformation
        styleWrapper={"h-[240px]"}
        title={"Detail Invoice"}
        column={columnCard}
        data={data}
        showEditInvButton={true}
      />
    </div>
  );
};

export default CardDetailInvoice;

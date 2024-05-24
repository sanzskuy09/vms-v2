import React from "react";
import CardInformation from "@/components/CardInformation";

const columnCard = [
  {
    title: "Kode",
    key: "code",
  },
  {
    title: "Fax",
    key: "fax",
  },
  {
    title: "Telepon",
    key: "telp",
  },
];

const data = {
  code: "O399",
  fax: "021-75889355",
  telp: "021-7564823",
};

const CardInfoSupplier = ({ data }) => {
  return (
    <div>
      <CardInformation
        title={"Informasi Supplier"}
        subTitle={"JKT MON DELI INDONESIA, PT"}
        column={columnCard}
        data={data}
        title2={"Note : Confirmed Order"}
      />
    </div>
  );
};

export default CardInfoSupplier;

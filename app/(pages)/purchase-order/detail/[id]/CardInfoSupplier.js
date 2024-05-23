import React from "react";
import CardInformation from "@/components/CardInformation";

const columnCard = [
  {
    title: "Kode",
    key: "supplier_code",
  },
  {
    title: "Fax",
    key: "supplier_fax_number",
  },
  {
    title: "Telepon",
    key: "supplier_phone",
  },
];

const CardInfoSupplier = ({ data }) => {
  return (
    <div>
      <CardInformation
        title={"Informasi Supplier"}
        subTitle={data?.supplier_name?.toUpperCase()}
        column={columnCard}
        data={data}
        title2={"Note : Confirmed Order"}
      />
    </div>
  );
};

export default CardInfoSupplier;

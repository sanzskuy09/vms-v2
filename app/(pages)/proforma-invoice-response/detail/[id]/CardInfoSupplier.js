import React from "react";
import CardInformation from "@/components/CardInformation";

const columnCard = [
  {
    title: "Kode",
    object: "rapo",
    key: "supplier_code",
  },
  {
    title: "Fax",
    object: "rapo",
    key: "supplier_fax_number",
  },
  {
    title: "Telepon",
    object: "rapo",
    key: "supplier_phone",
  },
];

const CardInfoSupplier = ({ data }) => {
  return (
    <div>
      <CardInformation
        title={"Informasi Supplier"}
        subTitle={data?.rapo?.supplier_name}
        column={columnCard}
        data={data}
        title2={"Note : Confirmed Order"}
      />
    </div>
  );
};

export default CardInfoSupplier;

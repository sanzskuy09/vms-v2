import axios from "axios";

// export const BASE_URL = "http://localhost:5500/api/v1";
export const BASE_URL = process.env.BASE_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const URL = {
  LOGIN: "/user/login",

  // PO
  GET_LIST_PO: "/po/polist",
  GET_ITEM_PO: "/po/itempo",
  GET_DETAIL_PO: "/po/detailPO",

  // RA
  GET_LIST_RA: "/ra/ralist",
  GET_ITEM_RA: "/ra/itemra",
  GET_DETAIL_RA: "/ra/detailra",

  // RAR
  GET_LIST_RAR: "/rar/rarlist",
  GET_ITEM_RAR: "/rar/itemrar",
  GET_DETAIL_RAR: "/rar/detailrar",

  // PFI
  GET_LIST_PFI: "/pfi/pfilist",
  GET_ITEM_PFI: "/pfi/itempfi",
  GET_DETAIL_PFI: "/pfi/detailpfi",

  // PFIR
  GET_LIST_PFIR: "/pfir/pfirlist",
  GET_ITEM_PFIR: "/pfir/itempfir",
  GET_DETAIL_PFIR: "/pfir/detailpfir",

  // INV
  GET_LIST_INV: "/inv/invlist",
  GET_ITEM_INV: "/inv/iteminv",
  GET_DETAIL_INV: "/inv/detailinv",

  // SUPPLIER
  CREATE_SUPP: "/supplier/createSupplier",
  GET_LIST_SUPP: "/supplier/listDataSupplier",
  GET_ITEM_SUPP: "/supplier/itemsupplier",
};

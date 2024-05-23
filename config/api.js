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

  // RA
  GET_LIST_RA: "/ra/ralist",
  GET_ITEM_RA: "/ra/itemra",
  GET_DETAIL_RA: "/ra/detailra",

  // RAR
  GET_LIST_RAR: "/rar/rarlist",

  // PFI
  GET_LIST_PFI: "/pfi/pfilist",

  // PFIR
  GET_LIST_PFIR: "/pfir/pfirlist",

  // INV
  GET_LIST_INV: "/inv/invlist",
};

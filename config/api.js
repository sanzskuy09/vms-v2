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
  GET_ANNOUNCEMENT: "/dash/announcements",
  EDIT_ANNOUNCEMENT: "/dash/announcements/1/content",

  // PO
  CREATE_PO: "/po/createPO",
  GET_FILTER_PO: "/po/filterpo",
  GET_LIST_PO: "/po/polist",
  GET_ITEM_PO: "/po/itempo",
  GET_DETAIL_PO: "/po/detailPO",
  ACCEPT_PO: "/po/acceptedpo",

  // RA
  GET_LIST_RA: "/ra/ralist",
  GET_FILTER_RA: "/ra/filterra",
  GET_ITEM_RA: "/ra/itemra",
  GET_DETAIL_RA: "/ra/detailra",
  ACCEPT_RA: "/ra/acceptedra",

  // RAR
  GET_LIST_RAR: "/rar/rarlist",
  GET_FILTER_RAR: "/rar/filterrar",
  GET_ITEM_RAR: "/rar/itemrar",
  GET_DETAIL_RAR: "/rar/detailrar",
  ACCEPT_RAR: "/rar/actionAcceptReject",
  CANCEL_RAR: "/rar/actionRar",
  EDIT_ITEM_RAR: "/rar/actionSave",

  // PFI
  GET_LIST_PFI: "/pfi/pfilist",
  GET_FILTER_PFI: "/pfi/filterpfi",
  GET_ITEM_PFI: "/pfi/itempfi",
  GET_DETAIL_PFI: "/pfi/detailpfi",
  ACCEPT_REJECT_PFI: "/pfi/acceptedpfi",

  // PFIR
  GET_LIST_PFIR: "/pfir/pfirlist",
  GET_FILTER_PFIR: "/pfir/filterpfir",
  GET_ITEM_PFIR: "/pfir/itempfir",
  GET_DETAIL_PFIR: "/pfir/detailpfir",
  ACCEPT_PFIR: "/pfir/actionAcceptReject",
  CANCEL_PFIR: "/pfir/actionPfir",
  EDIT_ITEM_PFIR: "/pfir/actionSave",

  // INV
  GET_LIST_INV: "/inv/invlist",
  GET_FILTER_INV: "/inv/filterinv",
  GET_ITEM_INV: "/inv/iteminv",
  GET_DETAIL_INV: "/inv/detailinv",
  ACCEPT_INV: "/inv/actionSend",
  ACTION_SAVE_SUPP: "/inv/actionSaveInfoSupp",
  ACTION_SAVE_INV: "/inv/actionSaveDetailInv",

  // SUPPLIER
  CREATE_SUPP: "/supplier/createSupplier",
  GET_LIST_SUPP: "/supplier/listDataSupplier",
  GET_ITEM_SUPP: "/supplier/itemsupplier",
  GET_DETAIL_SUPP: "/supplier/detailsupplier",
  EDIT_SUPP: "/supplier/editUserSupplier",

  // PROFILE
  GET_PROFILE: "/profile/getProfile",

  // UPLOAD
  GET_URL_FILE: "/inv/getfileurl",
  DOWNLOAD_FILE: "/inv/download",
  UPLOAD_SURAT_JALAN: "/inv/uploadSuratJalan",
  UPLOAD_INV: "/inv/uploadInv",
  UPLOAD_KWITANSI: "/inv/uploadKwitansi",
  UPLOAD_TAX: "/inv/uploadTaxInv",

  DELETE_SURAT_JALAN: "/inv/deleteSuratJalan",
  DELETE_INV: "/inv/deleteInv",
  DELETE_KWITANSI: "/inv/deleteKwitansi",
  DELETE_TAX: "/inv/deleteTaxInv",
};

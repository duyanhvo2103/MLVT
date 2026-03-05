export const voucherSearchCriteria = [
    { key: "CODE", label: "Voucher Code", placeHolder: "Search by Voucher Code" },
    { key: "TOKEN", label: "Token", placeHolder: "Search by Token" },
    { key: "MAX_USAGE", label: "Max Usage", placeHolder: "Search by Max Usage" },
    { key: "USE_COUNT", label: "Use Count", placeHolder: "Search by Use Count" },
    { key: "EXPIRED_TIME", label: "Expired Time", placeHolder: "Search by Expired Time" },
];

export const voucherTableHeader = [
    { label: "ID", sortBy: "ID" },
    { label: "Voucher Code", sortBy: "CODE" },
    { label: "Token", sortBy: "TOKEN" },
    { label: "Max Usage", sortBy: "MAX_USAGE" },
    { label: "Used Count", sortBy: "USED_COUNT" },
    { label: "Expired At", sortBy: "EXPIRED_TIME" },
    { label: "Created At", sortBy: "CREATED_AT" },
    { label: "Updated At", sortBy: "UPDATED_AT" },
];

export interface voucherSortOption {
    sortBy: "" | "ID" | "CODE" | "TOKEN" | "MAX_USAGE" | "USED_COUNT" | "EXPIRED_TIME" | "CREATED_AT" | "UPDATED_AT";
    sort: "" | "ASC" | "DESC";
}

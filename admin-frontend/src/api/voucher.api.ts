import { GetAllVoucherResponse, Voucher } from "../types/Response/Vouchers";
import apiClient from "./base.api";

export const getAllVouchersAPI = async (
    status: string,
    sort: string,
    sortBy: string,
    searchKey: string,
    searchCriteria: string,
    offset: number,
    limit: number
): Promise<GetAllVoucherResponse> => {
    try {
        const numericFields = ["TOKEN", "MAX_USAGE", "USED_COUNT"];
        const isNumeric = numericFields.includes(searchCriteria);

        const parsedSearchKey = isNumeric ? Number(searchKey) : searchKey;

        const response = await apiClient.get<GetAllVoucherResponse>("/voucher/get-all", {
            params: {
                status,
                sort,
                sortBy: sortBy,
                searchKey: parsedSearchKey,
                searchCriteria,
                from: offset,
                to: limit,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch vouchers: ${error}`);
    }
};

export const createVoucherAPI = async (voucher: {
    code: string;
    token: number;
    max_usage: number;
    expired_time: string;
}) => {
    try {
        const response = await apiClient.post(`/voucher/create`, {
            code: voucher.code,
            token: voucher.token,
            max_usage: voucher.max_usage,
            expired_time: voucher.expired_time,
        });
        return response.data;
    } catch (error) {
        console.error("Failed to create voucher:", error);
        throw error;
    }
};

export const editVoucherAPI = async (voucher: Voucher) => {
    try {
        const response = await apiClient.patch(`/voucher/${voucher.id}`, {
            code: voucher.code,
            token: voucher.token,
            max_usage: voucher.max_usage,
            expired_time: voucher.expired_time,
            used_count: voucher.used_count,
        });
        return response.data;
    } catch (error) {
        console.error("Failed to create voucher:", error);
        throw error;
    }
};

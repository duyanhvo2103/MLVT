export interface Voucher {
    id: string;
    code: string;
    token: number;
    max_usage: number;
    used_count: number;
    expired_time: string; // ISO 8601 datetime string
    created_at: string; // ISO 8601 datetime string
    updated_at: string; // ISO 8601 datetime string
}

export interface GetAllVoucherResponse {
    vouchers: Voucher[];
    total_count: number;
}

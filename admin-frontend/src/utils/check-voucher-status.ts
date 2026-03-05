import { Voucher } from "../types/Response/Vouchers";

export const checkVoucherStatus = (voucher: Voucher): string => {
    const currentDate = new Date();
    const expiredDate = new Date(voucher.expired_time);
    const usedCount = voucher.used_count;
    const maxUsage = voucher.max_usage;

    if (currentDate > expiredDate) {
        return 'Expired';
    } else if (usedCount >= maxUsage) {
        return 'Used';
    } else {
        return 'Active';
    }
}
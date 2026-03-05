export interface PendingRequests {
    id: string,
    user_id: number,
    transaction_id: string, 
    payment_option: string,
    token_amount: number,
    vnd_amount: number,
    status: "pending" | "approved" | "rejected",
    created_at: string,
    updated_at: string,
}
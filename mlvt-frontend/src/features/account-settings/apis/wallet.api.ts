import { get } from '../../../api/base.api'
/**
 * Fetches the wallet balance for a specific user.
 * @param userID - The ID of the user.
 * @returns A promise that resolves to the user's wallet balance (a number).
 */
export const getWalletBalance = async (userID: string): Promise<number> => {
    try {
        const responseData = await get<{ balance: number }>(`/wallet/balance`, {
            user_id: userID,
        })
        return responseData.balance
    } catch (error) {
        console.error('Error getting wallet balance:', error)
        throw error
    }
}

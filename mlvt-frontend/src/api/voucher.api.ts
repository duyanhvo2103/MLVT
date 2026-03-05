import { post } from "./base.api"; // Make sure to import the 'post' helper

/**
 * Attempts to redeem a voucher code for a specific user.
 * @param userID - The ID of the user redeeming the code.
 * @param redeemCode - The voucher code string.
 * @returns A promise that resolves to the number of tokens/credits received.
 */
export const UseRedeemCode = async (
    userID: number,
    redeemCode: string
): Promise<number> => {
    try {
        const responseData = await post<{ token: number }>(
            `/voucher/use/${redeemCode}`,
            { user_id: userID }
        );

        return responseData.token;
    } catch (error) {
        console.error("Error using redeem code:", error);
        throw error;
    }
};

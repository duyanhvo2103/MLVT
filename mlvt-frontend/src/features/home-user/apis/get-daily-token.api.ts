import { post } from 'src/api/base.api'

export const getDailyToken = async (userId: number): Promise<string> => {
    try {
        const response = await post<{ message: string }>(`/token/daily`, {
            user_id: userId,
        })
        return response.message
    } catch (error) {
        console.error('Error getting daily token:', error)
        throw error
    }
}

import { useQuery } from '@tanstack/react-query'
import { getUserDetails } from 'src/features/account-settings/apis/user.api'

export const useGetUserDetails = () => {
    const authToken = localStorage.getItem('authToken')
    return useQuery({
        queryKey: ['userDetails', authToken],
        queryFn: async () => {
            return getUserDetails()
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: !!authToken,
    })
}

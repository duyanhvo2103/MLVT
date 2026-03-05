import { get } from 'src/api/base.api'
import { GetAllPipelineResponse } from '../types'

export const getAllPipelineProgress = async (
    userId: number,
): Promise<GetAllPipelineResponse> => {
    const response = await get<GetAllPipelineResponse>(
        `/progress/${userId}`,
        undefined,
        {
            getFullResponse: true,
        },
    )

    return response.data
}

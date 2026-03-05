import { AxiosResponse } from 'axios'
import { GetAllProjectRequest } from 'src/types/Project'
import { GetAllProjectResponse } from 'src/types/Response/Project'
import { post } from './base.api'

export const getAllProject = (
    userID: string,
    request: GetAllProjectRequest,
): Promise<AxiosResponse<GetAllProjectResponse>> => {
    return post(`/process/get-all/${userID}`, request, {
        getFullResponse: true,
    }) as Promise<AxiosResponse<GetAllProjectResponse>>
}

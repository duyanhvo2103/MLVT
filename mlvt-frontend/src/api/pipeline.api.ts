import { AxiosResponse } from 'axios'
import { post } from './base.api'

export const postVideoTranslation = (
    videoId: number,
    sourceLanguage: string,
    targetLanguage: string,
): Promise<any> => {
    return post(`/mlvt/pipeline/full/${videoId}`, null, {
        params: {
            source_language: sourceLanguage,
            target_language: targetLanguage,
        },
        getFullResponse: true,
    })
}

interface TriggerResponse {
    id: number
    message: string
}
export const postTextGeneration = async (
    videoId: number,
    sourceLanguage: string,
): Promise<TriggerResponse> => {
    const response = await post<TriggerResponse>(`/mlvt/stt/${videoId}`, null, {
        params: {
            source_language: sourceLanguage,
        },
    })
    return response
}

export const postTextTranslation = (
    transcriptionId: number,
    sourceLanguage: string,
    targetLanguage: string,
) => {
    return post(`/mlvt/ttt/${transcriptionId}`, null, {
        params: {
            source_language: sourceLanguage,
            target_language: targetLanguage,
        },
        getFullResponse: true,
    }) as Promise<AxiosResponse<any>>
}

export const postAudioGeneration = (
    transcriptionId: number,
    opts: { videoId?: number; audioId?: number },
): Promise<any> => {
    return post(`/mlvt/tts/${transcriptionId}`, null, {
        params: {
            // send exactly one of these:
            ...(opts.videoId !== undefined ? { video_id: opts.videoId } : {}),
            ...(opts.audioId !== undefined ? { audio_id: opts.audioId } : {}),
        },
        getFullResponse: true,
    })
}

export const postLipSync = (videoId: number, audioId: number): Promise<any> => {
    return post(`/mlvt/lipsync/${videoId}/${audioId}`, null, {
        getFullResponse: true,
    })
}

// export const getProjectProgress = (
//     userId: number
// ): Promise<AxiosResponse<GetAllProjectResponse>> => {
//     return get<GetAllProjectResponse>(`/progress/${userId}`, undefined, {
//         getFullResponse: true,
//     }) as Promise<AxiosResponse<GetAllProjectResponse>>;
// };

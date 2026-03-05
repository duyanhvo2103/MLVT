import { AxiosResponse } from 'axios'
import { AudioList, GetAudioById, PostAudio } from '../types/Response/Audio'
import { GetPresignedURL } from '../types/Response/Video'
import { get, post } from './base.api'

/**
 * Fetches a list of audios for a specific user.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an AudioList object.
 */
export const getListAudioByUserId = async (
    userId: number,
): Promise<AudioList> => {
    try {
        return await get<AudioList>(`/audios/user/${userId}`)
    } catch (error) {
        throw new Error(`Failed to fetch audios for user ${userId}.`)
    }
}

/**
 * Fetches a single audio object by its ID.
 * @param id - The ID of the audio to fetch.
 * @returns The audio data object.
 */
export const getAudioById = async (id: number): Promise<GetAudioById> => {
    try {
        // The `get` helper returns the data directly. No more `response.data`.
        return await get<GetAudioById>(`/audios/${id}`)
    } catch (error) {
        throw new Error(`Failed to fetch audio with ID ${id}: ${error}`)
    }
}

/**
 * Generates a presigned URL for uploading an audio file.
 * The caller will likely need the full response to check the status code
 * and get the URL from the data property.
 * @param fileName - The name of the file to be uploaded.
 * @param fileType - The MIME type of the file.
 * @returns The full AxiosResponse containing the presigned URL data.
 */
export const getPresignedAudioURL = async (
    fileName: string,
    fileType: string,
): Promise<AxiosResponse<GetPresignedURL>> => {
    try {
        // Use the 'post' helper and request the full response.
        const response = await post<GetPresignedURL>(
            '/audios/generate-presigned-url',
            null,
            {
                params: {
                    file_name: fileName,
                    file_type: fileType,
                },
                getFullResponse: true, // This is key
            },
        )
        // Cast to the specific type we expect because we set the flag.
        return response as AxiosResponse<GetPresignedURL>
    } catch (error) {
        console.error('Error generating presigned audio URL:', error)
        throw error
    }
}

/**
 * Gets a temporary download URL for a specific audio file.
 * @param audioId - The ID of the audio.
 * @returns The download URL string (without query parameters).
 */
export const getAudioDownloadURL = async (audioId: number): Promise<string> => {
    try {
        // The `get` helper returns the data object, from which we can extract the URL.
        const responseData = await get<{ download_url: string }>(
            `/audios/${audioId}/download-url`,
        )
        return responseData.download_url.split('?')[0]
    } catch (error) {
        console.error('Error getting audio download url:', error)
        throw error
    }
}

/**
 * Posts a new audio record to the server.
 * This version assumes the caller only needs the data of the newly created audio.
 * @param fileData - The data object for the new audio.
 * @returns The newly created audio object.
 */
export const postAudio = async (
    fileData: object,
): Promise<AxiosResponse<PostAudio>> => {
    try {
        // The `post` helper returns the data by default. This is cleaner.
        return await post<PostAudio>('audios/', fileData, {
            getFullResponse: true,
        })
    } catch (error) {
        console.error('Posting audio to server failed:', error)
        throw error
    }
}

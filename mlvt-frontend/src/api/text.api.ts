import { GetTextById, TextListResponse } from "../types/Response/Text";
import { GetPresignedURL } from "../types/Response/Video";
import { PostText } from "../types/Response/Text";
import { AxiosResponse } from "axios";
import { get, post } from "./base.api";

/**
 * Generates a presigned URL for uploading a text file.
 * We need the full response to check the status code and get the URL.
 * @param fileName - The name of the file to be uploaded.
 * @param fileType - The MIME type of the file.
 * @returns The full AxiosResponse containing the presigned URL data.
 */
export const getPresignedTextURL = async (
    fileName: string,
    fileType: string
): Promise<AxiosResponse<GetPresignedURL>> => {
    try {
        // Use the 'post' helper and request the full response.
        const response = await post<GetPresignedURL>(
            "/transcriptions/generate-upload-url",
            null,
            {
                params: {
                    file_name: fileName,
                    file_type: fileType,
                },
                getFullResponse: true,
            }
        );
        return response as AxiosResponse<GetPresignedURL>;
    } catch (error) {
        console.error("Error generating presigned text URL:", error);
        throw error;
    }
};

/**
 * Fetches transcriptions associated with a specific video ID.
 * @param videoId - The ID of the video.
 * @returns The list of transcriptions.
 */
export const getTextIdByVideoId = async (
    videoId: number
): Promise<TextListResponse> => {
    try {
        // The `get` helper returns the data directly. No more `.data` needed.
        return await get<TextListResponse>(`/transcriptions/video/${videoId}`);
    } catch (error) {
        console.error("Error getting text list by video id:", error);
        throw error;
    }
};

/**
 * Fetches all transcriptions for a given user.
 * @param userId - The ID of the user.
 * @returns The list of transcriptions.
 */
export const getListTextByUserId = async (
    userId: number
): Promise<TextListResponse> => {
    try {
        return await get<TextListResponse>(`/transcriptions/user/${userId}`);
    } catch (error) {
        console.log("Error getting text list by user id: ", error);
        throw error;
    }
};

/**
 * Gets a temporary download URL for a specific transcription.
 * @param transcriptionId - The ID of the transcription.
 * @returns The download URL string.
 */
export const getTextDownloadUrl = async (
    transcriptionId: number
): Promise<string> => {
    try {
        const responseData = await get<{ download_url: string }>(
            `/transcriptions/${transcriptionId}/download-url`
        );
        return responseData.download_url;
    } catch (error) {
        console.error("Error getting text download URL:", error);
        throw error;
    }
};

/**
 * Posts a new transcription record to the server.
 * This version assumes the caller only needs the data of the newly created resource.
 * @param fileData - The data object for the new transcription.
 * @returns The newly created transcription object.
 */
export const postText = async (
    fileData: object
): Promise<AxiosResponse<PostText>> => {
    try {
        return await post<PostText>("/transcriptions/", fileData, {
            getFullResponse: true,
        });
    } catch (error) {
        console.error("Posting text to server failed:", error);
        throw error;
    }
};

export const getTextById = async (
    id: number
): Promise<AxiosResponse<GetTextById>> => {
    try {
        const response = await get<GetTextById>(
            `/transcriptions/${id}`,
            undefined,
            {
                getFullResponse: true,
            }
        );
        if (response.data.transcription) {
            response.data.transcription.created_at = new Date(
                response.data.transcription.created_at
            );
            response.data.transcription.updated_at = new Date(
                response.data.transcription.updated_at
            );
        }

        return response;
    } catch (error) {
        throw new Error(`Failed to fetch text with ID ${id}: ${error}`);
    }
};

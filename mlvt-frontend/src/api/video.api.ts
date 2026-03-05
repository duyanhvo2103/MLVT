import { get, post, put } from "./base.api";
import {
    GetPresignedURL,
    PostVideo,
    VideoListResponse,
    Video,
} from "../types/Response/Video";
import { AxiosResponse } from "axios";

// Image request
export const getPresignedImageURL = async (
    fileName: string,
    fileType: string
): Promise<AxiosResponse<GetPresignedURL>> => {
    try {
        const response = await post<GetPresignedURL>(
            "/videos/generate-upload-url/image",
            null,
            {
                params: {
                    file_name: fileName,
                    file_type: fileType,
                },
                getFullResponse: true, // This is key!
            }
        );
        return response as AxiosResponse<GetPresignedURL>;
    } catch (error) {
        console.error("Error generating presigned Image URL:", error);
        throw error;
    }
};

// Video request - post request to get presigned URL for video upload
export const getPresignedVideoURL = async (
    fileName: string,
    fileType: string
): Promise<AxiosResponse<GetPresignedURL>> => {
    // <-- Correctly promise an AxiosResponse
    try {
        const response = await post<GetPresignedURL>(
            "/videos/generate-upload-url/video",
            null,
            {
                params: {
                    file_name: fileName,
                    file_type: fileType,
                },
                getFullResponse: true, // This is key!
            }
        );
        // The 'post' function is typed to return `T | AxiosResponse<T>`.
        // We must cast it to the type we know it is because of getFullResponse.
        return response as AxiosResponse<GetPresignedURL>;
    } catch (error) {
        console.error("Error generating presigned Video URL:", error);
        throw error;
    }
};

// Image download request
export const getPresignedDownloadImageURL = async (
    videoId: string
): Promise<string> => {
    try {
        const response = await get<{ image_download_url: string }>(
            `/videos/${videoId}/download-url/image`
        );
        return response.image_download_url.split("?")[0]; // Remove query params
    } catch (error) {
        console.error("Error generating presigned Image URL:", error);
        throw error;
    }
};

export const getVideoDownloadUrl = async (videoId: number): Promise<string> => {
    try {
        const response = await get<{ video_download_url: string }>(
            `/videos/${videoId}/download-url/video`
        );
        return response.video_download_url.split("?")[0]; // Remove query params
    } catch (error) {
        console.error("Error generating presigned Video URL:", error);
        throw error;
    }
};

export const postVideo = async (
    videoData: object
): Promise<AxiosResponse<PostVideo>> => {
    try {
        const response = await post<PostVideo>("/videos/", videoData, {
            getFullResponse: true,
        });
        return response as AxiosResponse<PostVideo>;
    } catch (error) {
        console.error("Posting video to server", error);
        throw error;
    }
};

export const getVideoList = async (
    userId: number
): Promise<AxiosResponse<VideoListResponse>> => {
    try {
        const response = await get<VideoListResponse>(
            `/videos/user/${userId}`,
            {},
            { getFullResponse: true }
        );
        return response as AxiosResponse<VideoListResponse>;
    } catch (error) {
        console.error("Error fetching video list:", error);
        throw error;
    }
};

export const getOneVideoById = async (videoId: number): Promise<Video> => {
    try {
        const response = await get<Video>(`/videos/${videoId}`);
        return response;
    } catch (error) {
        throw new Error(`Failed to fetch videos: ${error}`);
    }
};

export const getVideoStatus = async (
    videoId: string
): Promise<{ status: string }> => {
    try {
        const response = await get<{ status: string }>(
            `/videos/${videoId}/status`
        );
        return response as { status: string };
    } catch (error) {
        throw new Error(`Failed to fetch video status: ${error}`);
    }
};

export const getVideosByUserId = async (
    userId: string
): Promise<VideoListResponse> => {
    try {
        const response = await get<VideoListResponse>(`/videos/user/${userId}`);
        return response as VideoListResponse;
    } catch (error) {
        throw new Error(`Failed to fetch videos: ${error}`);
    }
};

export const uploadVideoToS3 = async (uploadUrl: string, file: File) => {
    try {
        const response = await put(uploadUrl, file, {
            headers: {
                "Content-Type": file.type,
            },
        });
        return response;
    } catch (error) {
        console.error("Error uploading video to S3:", error);
        throw error;
    }
};

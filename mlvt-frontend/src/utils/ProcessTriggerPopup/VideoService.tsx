import { FileData, VideoData } from "../../types/FileData";
import { putImageS3, putDynamicFileType } from "../../api/aws.api";
import { postVideo } from "../../api/video.api";
import {
    getPresignedVideoURL,
    getPresignedImageURL,
} from "../../api/video.api";
import { checkSuccessResponse } from "../checkResponseStatus";

export const getMediaDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
        const isVideo = file.type.startsWith("video/");
        const isAudio = file.type.startsWith("audio/");

        if (!isVideo && !isAudio) {
            reject(
                new Error(
                    "Unsupported file type. Only video and audio files are supported."
                )
            );
            return;
        }

        const mediaElement = document.createElement(
            isVideo ? "video" : "audio"
        );
        mediaElement.preload = "metadata";

        const fileURL = URL.createObjectURL(file);
        mediaElement.src = fileURL;

        mediaElement.onloadedmetadata = () => {
            URL.revokeObjectURL(fileURL);
            resolve(Math.floor(mediaElement.duration));
        };

        mediaElement.onerror = () => {
            URL.revokeObjectURL(fileURL);
            reject(new Error("Failed to load media metadata"));
        };
    });
};

export const extractFirstFrame = (videoFile: File): Promise<File> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(videoFile);
        video.currentTime = 0.1;

        const parts = videoFile.name.split(".");
        parts.pop();
        const imageName = parts.join(".");

        video.onloadeddata = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext("2d");

            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        const imageFile = new File(
                            [blob],
                            `${imageName}_thumbnail.jpg`,
                            { type: "image/jpeg" }
                        );
                        resolve(imageFile);
                    } else {
                        reject(
                            new Error("Could not generate image from canvas")
                        );
                    }
                }, "image/jpeg");
            } else {
                reject(new Error("Failed to get 2D context from canvas"));
            }
        };

        video.onerror = (error) => {
            reject(error);
        };
    });
};

export const uploadVideoImage = async (file: File, fileName: string) => {
    try {
        const responsegetPresignedImageURL = await getPresignedImageURL(
            `${fileName}`,
            "image/jpg"
        );
        if (checkSuccessResponse(responsegetPresignedImageURL.status)) {
            const s3UploadImageResponse = await putImageS3(
                responsegetPresignedImageURL.data.upload_url,
                file
            );
            if (!checkSuccessResponse(s3UploadImageResponse.status)) {
                throw new Error("Failed uploading image to S3 bucket");
            }
        } else throw new Error("Failed getting presigned image from server");
    } catch (error) {
        throw error;
    }
};

function isVideoData(data: FileData): data is VideoData {
    return (data as VideoData).title !== undefined;
}

// This function is to upload video to server and upload s3

// Service for upload video to Server include 2 steps:
// 1. Upload first video frame
// 2. Upload video to server
// 3. Upload video to s3 bucket
export const uploadVideo = async (
    file: File,
    fileData: FileData
): Promise<number> => {
    try {
        // Step 1. Extract first frame and upload image to server
        if (file.type.includes("video") && isVideoData(fileData)) {
            const imageFile = await extractFirstFrame(file);
            const imageFileName =
                fileData.file_name.split(".")[0] + "_thumbnail.jpg";
            console.log("Uploading video thumbnail:", imageFileName);
            await uploadVideoImage(imageFile, imageFileName);
            fileData.image = imageFileName; 
        }

        // Step 2. Upload video data to server
        const postVideoResponse = await postVideo(fileData);
        if (!checkSuccessResponse(postVideoResponse.status)) {
            throw new Error("Post video to server failed");
        }

        // Step 3. Receive presigned video url
        const getPresignedVideoResponse = await getPresignedVideoURL(
            fileData.file_name,
            file.type
        );

        // Step 4. Upload video to s3 bucket base on the presigned video url
        if (checkSuccessResponse(getPresignedVideoResponse.status)) {
            const s3UploadVideoResponse = await putDynamicFileType(
                getPresignedVideoResponse.data.upload_url,
                file,
                file.type
            );
            if (!checkSuccessResponse(s3UploadVideoResponse.status)) {
                throw new Error("Upload video to s3 failed");
            }
        }
        if (!postVideoResponse.data.id) {
            throw new Error(
                "Cannot receive video when uploading video to server"
            );
        }
        return postVideoResponse.data.id;
    } catch (error) {
        throw error;
    }
};

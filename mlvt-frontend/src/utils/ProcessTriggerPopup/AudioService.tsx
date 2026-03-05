import { postAudio } from '../../api/audio.api';
import { checkSuccessResponse } from '../checkResponseStatus';
import { getPresignedAudioURL } from '../../api/audio.api';
import { putDynamicFileType } from '../../api/aws.api';
import { FileData } from '../../types/FileData';

// include post audio data to server and post audio file to aws
export const uploadAudio = async (file: File, fileData: FileData) => {
    try {
        // post audio data to server
        const postResponse = await postAudio(fileData);
        if (!checkSuccessResponse(postResponse.status)) {
            throw new Error('Post text to server failed');
        }

        // get audio presigned url
        const getPresignedResponse = await getPresignedAudioURL(fileData.file_name, file.type);

        // upload file to aws base on presigned url
        if (checkSuccessResponse(getPresignedResponse.status)) {
            const s3UploadResponse = await putDynamicFileType(getPresignedResponse.data.upload_url, file, file.type);

            if (!checkSuccessResponse(s3UploadResponse.status)) {
                throw new Error('Upload content to S3 failed');
            }
        }
        return postResponse.data.id;
    } catch (error) {
        throw error;
    }
};

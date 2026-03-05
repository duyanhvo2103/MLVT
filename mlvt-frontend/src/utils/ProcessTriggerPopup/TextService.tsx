import { getTextFileContent, putDynamicFileType } from '../../api/aws.api'
import { getPresignedTextURL, getTextById, postText } from '../../api/text.api'
import { TextData } from '../../types/FileData'
import { Text } from '../../types/Response/Text'
import { checkSuccessResponse } from '../checkResponseStatus'

// include post text data to server and text file to aws
export const uploadText = async (
    content: File | string,
    fileData: TextData,
    fileType: string,
) => {
    try {
        const getPresignedResponse = await getPresignedTextURL(
            fileData.file_name,
            fileType,
        )

        if (checkSuccessResponse(getPresignedResponse.status)) {
            const fileToUpload =
                typeof content === 'string'
                    ? new Blob([content], { type: fileType || 'text/plain' })
                    : content

            const s3UploadResponse = await putDynamicFileType(
                getPresignedResponse.data.upload_url,
                fileToUpload,
                fileType,
            )

            if (!checkSuccessResponse(s3UploadResponse.status)) {
                throw new Error('Upload content to S3 failed')
            }
        }

        const postResponse = await postText(fileData)
        if (!checkSuccessResponse(postResponse.status)) {
            throw new Error('Post text to server failed')
        }

        return postResponse.data.id
    } catch (error) {
        throw error
    }
}

export const getTextContent = async (
    textId: number,
): Promise<[Text, string]> => {
    try {
        const getTextResponse = await getTextById(textId)
        if (!checkSuccessResponse(getTextResponse.status)) {
            throw new Error('Error getting text information')
        }
        const text = await getTextFileContent(getTextResponse.data.download_url)
        return [getTextResponse.data.transcription, text]
    } catch (error) {
        throw error
    }
}

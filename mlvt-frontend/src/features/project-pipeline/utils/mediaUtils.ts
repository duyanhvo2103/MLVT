// src/utils/mediaUtils.ts

import { AudioData, VideoData } from 'src/types/FileData'
import { S3Folder } from 'src/types/S3FolderStorage'
import { uploadAudio } from 'src/utils/ProcessTriggerPopup/AudioService'
import {
    getMediaDuration,
    uploadVideo,
} from 'src/utils/ProcessTriggerPopup/VideoService'

export async function getOrUploadMediaId(
    input: number | File | undefined,
    type: 'video' | 'audio' | 'text',
    userId: number,
): Promise<number> {
    if (typeof input === 'number') {
        console.log(`Using existing ${type} ID:`, input)
        return input
    }

    if (input instanceof File) {
        console.log(`Uploading new ${type} file...`)
        const file = input

        if (type === 'video') {
            const duration = await getMediaDuration(file)
            const fileNameWithoutExt = file.name
                .split('.')
                .slice(0, -1)
                .join('.')
            const videoData: VideoData = {
                title: fileNameWithoutExt,
                duration: duration,
                description: '',
                file_name: file.name,
                folder: S3Folder.video,
                image: 'avatar.jpg',
                user_id: userId,
            }
            return await uploadVideo(file, videoData)
        } else if (type === 'audio') {
            const duration = await getMediaDuration(file)
            const audioData: AudioData = {
                duration: duration,
                folder: S3Folder.audio,
                file_name: file.name,
                user_id: userId,
            }
            return await uploadAudio(file, audioData)
        }
    }

    throw new Error(`A valid ${type} file or ${type} ID is required.`)
}

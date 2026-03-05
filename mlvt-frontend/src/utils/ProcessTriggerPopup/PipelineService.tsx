import {
    postAudioGeneration,
    postLipSync,
    postTextGeneration,
    postTextTranslation,
    postVideoTranslation,
} from '../../api/pipeline.api'
import { TranslateLanguage } from '../../types/Translation'
import { checkSuccessResponse } from '../checkResponseStatus'
import { getLanguageCode } from './VideoPopup.utils'
export interface JobCreationResponse {
    message: string
    id: number
}
// Service for TextTranslation
export const translateText = async (
    textId: number,
    sourceLanguage: TranslateLanguage,
    targetLanguage: TranslateLanguage,
): Promise<JobCreationResponse> => {
    const sourceLanguageCode = getLanguageCode(sourceLanguage)
    const targetLanguageCode = getLanguageCode(targetLanguage)

    const postTranslationResponse = await postTextTranslation(
        textId,
        sourceLanguageCode,
        targetLanguageCode,
    )

    if (!checkSuccessResponse(postTranslationResponse.status)) {
        throw new Error('Server indicated an error during text translation.')
    }

    return postTranslationResponse.data
}

// Service for VoiceGeneration
export const generateVoice = async (
    transcriptionId: number,
    opts: { videoId?: number; audioId?: number },
): Promise<number> => {
    const { videoId, audioId } = opts
    if (videoId == null && audioId == null) {
        throw new Error(
            'generateVoice: you must pass either videoId or audioId',
        )
    }

    try {
        const resp = await postAudioGeneration(transcriptionId, opts)
        if (!checkSuccessResponse(resp.status)) {
            throw new Error(
                `Voice generation failed with status ${resp.status}`,
            )
        }
        // Assuming your 202 response body is { message: string; id: number }
        const { id } = resp.data as { message: string; id: number }
        return id
    } catch (err) {
        console.error('generateVoice error:', err)
        throw err
    }
}

// Service for Lipsync
export const lipSync = async (
    videoId: number,
    audioId: number,
): Promise<JobCreationResponse> => {
    const lipSyncRespsonse = await postLipSync(videoId, audioId)
    if (!checkSuccessResponse(lipSyncRespsonse.status)) {
        throw new Error('Error when lipSync')
    }

    return lipSyncRespsonse.data as JobCreationResponse
}

// Service for extract text from video (TextGeneration)
export const generateText = async (
    videoId: number,
    sourceLanguage: TranslateLanguage,
): Promise<JobCreationResponse> => {
    const sourceLanguageCode = getLanguageCode(sourceLanguage)
    const postTextGenerationResponse = await postTextGeneration(
        videoId,
        sourceLanguageCode,
    )

    if (postTextGenerationResponse.message !== 'Accepted for processing') {
        throw new Error('Server indicated an error during text generation.')
    }
    return postTextGenerationResponse as JobCreationResponse
}

// Service for fullpipeline (VideoTranslation)
export const translateVideo = async (
    videoId: number,
    sourceLanguage: TranslateLanguage,
    targetLanguage: TranslateLanguage,
): Promise<JobCreationResponse> => {
    const sourceLanguageCode = getLanguageCode(sourceLanguage)
    const targetLanguageCode = getLanguageCode(targetLanguage)
    const postVideoTranslationResponse = await postVideoTranslation(
        videoId,
        sourceLanguageCode,
        targetLanguageCode,
    )

    console.log('postVideoTranslationResponse', postVideoTranslationResponse)
    if (!checkSuccessResponse(postVideoTranslationResponse.status)) {
        throw new Error('Server indicated an error during video translation.')
    }

    return postVideoTranslationResponse.data as JobCreationResponse
}

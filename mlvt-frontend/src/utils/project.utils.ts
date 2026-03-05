import { getListTextByUserId } from '../api/text.api'
import { getVideosByUserId } from '../api/video.api'
import {
    AudioGenerationProject,
    FullPipelineProject,
    GetAllProjectRequest,
    LipSyncProject,
    PipelineShortForm,
    Project,
    ProjectType,
    RawAudio,
    RawText,
    RawVideo,
    TextGenerationProject,
    TextTranslationProject,
} from '../types/Project'
import { mapStatusToProjectStatus, ProjectStatus } from '../types/ProjectStatus'

import { getAllProject } from 'src/api/project.api'
import { getListAudioByUserId } from '../api/audio.api'
import { Audio } from '../types/Response/Audio'
import { Text } from '../types/Response/Text'
import { checkSuccessResponse } from './checkResponseStatus'

export function combineAndSortProjects(
    ...projectLists: Project[][]
): Project[] {
    return projectLists
        .flat()
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export const handleGetVideosProjectByUserId = async (
    userId: string,
): Promise<RawVideo[]> => {
    try {
        const videoListResponse = await getVideosByUserId(userId)

        if (!videoListResponse?.videos) {
            return []
        }

        return videoListResponse.videos.map((videoData) => ({
            id: videoData.video.id,
            thumbnail: videoData.image_url,
            title: `Video - ${videoData.video.id}`,
            status: mapStatusToProjectStatus(videoData.video.status),
            createdAt: new Date(videoData.video.created_at),
            updatedAt: new Date(videoData.video.updated_at),
            type_project: ProjectType.Video,
        }))
    } catch (error) {
        console.error('Failed to fetch video or image URLs:', error)
        return []
    }
}

export const handleGetTextProjectByUserId = async (
    userId: string,
): Promise<RawText[]> => {
    try {
        const response = await getListTextByUserId(parseInt(userId))
        const successTextProject: Text[] = response.transcriptions.filter(
            (data) =>
                mapStatusToProjectStatus(data.status) ===
                    ProjectStatus.Succeeded ||
                mapStatusToProjectStatus(data.status) === ProjectStatus.Raw,
        )
        const TextProject: RawText[] = successTextProject.map(
            (transcriptionData) => ({
                id: transcriptionData.id,
                original_videoId: transcriptionData.video_id,
                title: `Text - ${transcriptionData.id}`,
                status: transcriptionData.status,
                createdAt: new Date(transcriptionData.updated_at),
                updatedAt: new Date(transcriptionData.updated_at),
                type_project: ProjectType.Text,
            }),
        )
        return TextProject
    } catch (error) {
        console.error('Failed to fetch transcription list: ', error)
        return []
    }
}

export const handleGetAudioProjectByUserId = async (
    userId: string,
): Promise<RawAudio[]> => {
    try {
        const response = await getListAudioByUserId(parseInt(userId))
        const successTextProject: Audio[] = response.audios.filter(
            (data) =>
                mapStatusToProjectStatus(data.status) ===
                    ProjectStatus.Succeeded ||
                mapStatusToProjectStatus(data.status) === ProjectStatus.Raw,
        )
        const AudioProject: RawAudio[] = successTextProject.map(
            (audioData) => ({
                id: audioData.id,
                original_videoId: audioData.video_id,
                original_textId: audioData.transcription_id,
                title: `Audio - ${audioData.id}`,
                status: audioData.status,
                createdAt: new Date(audioData.updated_at),
                updatedAt: new Date(audioData.updated_at),
                type_project: ProjectType.Audio,
            }),
        )
        return AudioProject
    } catch (error) {
        console.error('Failed to fetch transcription list: ', error)
        return []
    }
}

export const getAllProgressProjects = async (
    userID: string,
    request: GetAllProjectRequest,
): Promise<[Project[], number]> => {
    try {
        const response = await getAllProject(userID, request)
        if (!checkSuccessResponse(response.status)) {
            throw new Error('Receive error response from server')
        }

        const progresses = response.data.process_list
        if (!progresses || progresses.length === 0)
            return [[], response.data.total_count]

        const progressProjectList: Project[] = progresses.map((progress) => {
            const progressType =
                progress.progress_type !== '' ? progress.progress_type : null
            const mediaType =
                progress.media_type !== '' ? progress.media_type : null

            const baseProject = {
                title: progress.title,
                status: progress.status,
                createdAt: new Date(progress.created_at),
                updatedAt: new Date(progress.updated_at),
            }

            if (progressType) {
                switch (progressType) {
                    case PipelineShortForm.TextGeneration:
                        return {
                            ...baseProject,
                            id: String(progress.id),
                            type_project: ProjectType.TextGeneration,
                            thumbnail: progress.thumbnail_url,
                            original_videoId: progress.original_video_id,
                            extracted_textId:
                                progress.original_transcription_id,
                        } as TextGenerationProject

                    case PipelineShortForm.TextTranslation:
                        return {
                            ...baseProject,
                            id: String(progress.id),
                            type_project: ProjectType.TextTranslation,
                            original_textId: progress.original_transcription_id,
                            translated_textId:
                                progress.translated_transcription_id,
                        } as TextTranslationProject

                    case PipelineShortForm.AudioGeneration:
                        return {
                            ...baseProject,
                            id: String(progress.id),
                            type_project: ProjectType.AudioGeneration,
                            original_textId:
                                progress.translated_transcription_id,
                            generated_audioId: progress.audio_id,
                        } as AudioGenerationProject

                    case PipelineShortForm.Fullpipeline:
                        return {
                            ...baseProject,
                            type_project: ProjectType.Fullpipeline,
                            id: String(progress.id),
                            original_videoId: progress.original_video_id,
                            thumbnail: progress.thumbnail_url,
                            generated_videoId: progress.progressed_video_id,
                            translated_audioId: progress.audio_id,
                            translated_textId:
                                progress.translated_transcription_id,
                            extracted_textId:
                                progress.original_transcription_id,
                        } as FullPipelineProject

                    case PipelineShortForm.Lipsync:
                        return {
                            ...baseProject,
                            id: String(progress.id),
                            type_project: ProjectType.Lipsync,
                            original_videoId: progress.original_video_id,
                            thumbnail: progress.thumbnail_url,
                            original_audioId:
                                progress.audio_id === 0
                                    ? null
                                    : progress.audio_id,
                            generated_videoId: progress.progressed_video_id,
                        } as LipSyncProject
                }
            }

            if (mediaType) {
                switch (mediaType) {
                    case ProjectType.Audio:
                        return {
                            ...baseProject,
                            id: Number(progress.id),
                            type_project: ProjectType.Audio,
                        } as RawAudio
                    case ProjectType.Text:
                        return {
                            ...baseProject,
                            id: Number(progress.id),
                            type_project: ProjectType.Text,
                        } as RawText
                    case 'transcription':
                        return {
                            ...baseProject,
                            id: Number(progress.id),
                            type_project: ProjectType.Text,
                        } as RawText
                    case ProjectType.Video:
                        return {
                            ...baseProject,
                            id: Number(progress.id),
                            type_project: ProjectType.Video,
                            thumbnail: progress.thumbnail_url,
                        } as RawVideo
                }
            }

            // fallback nếu cả progressType và mediaType đều không hợp lệ
            throw new Error(
                `Invalid progress entry: both progress_type and media_type are empty (id=${progress.id})`,
            )
        })

        return [progressProjectList, response.data.total_count]
    } catch (error) {
        console.error('getAllProgressProjects failed', error)
        throw error
    }
}

export function hasThumbnail(
    project: Project,
): project is
    | RawVideo
    | TextGenerationProject
    | FullPipelineProject
    | LipSyncProject {
    return 'thumbnail' in project
}

export function convertProjectTypeToPipelineShortForm(
    project: ProjectType,
): PipelineShortForm | null {
    switch (project) {
        case ProjectType.Fullpipeline:
            return PipelineShortForm.Fullpipeline
        case ProjectType.TextGeneration:
            return PipelineShortForm.TextGeneration
        case ProjectType.TextTranslation:
            return PipelineShortForm.TextTranslation
        case ProjectType.AudioGeneration:
            return PipelineShortForm.AudioGeneration
        case ProjectType.Lipsync:
            return PipelineShortForm.Lipsync
        default:
            return null
    }
}

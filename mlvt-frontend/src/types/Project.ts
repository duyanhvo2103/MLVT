import { ProjectStatus } from './ProjectStatus'

export interface BaseProject {
    title: string
    status: ProjectStatus
    createdAt: Date
    updatedAt: Date
    type_project: ProjectType
}

export interface TextGenerationProject extends BaseProject {
    id: string
    type_project: ProjectType.TextGeneration
    thumbnail: string
    original_videoId: number
    extracted_textId: number
}

export interface TextTranslationProject extends BaseProject {
    id: string
    type_project: ProjectType.TextTranslation
    original_textId: number
    translated_textId: number
}

export interface AudioGenerationProject extends BaseProject {
    id: string
    type_project: ProjectType.AudioGeneration
    original_textId: number
    generated_audioId: number
}

export interface FullPipelineProject extends BaseProject {
    id: string
    type_project: ProjectType.Fullpipeline
    original_videoId: number
    thumbnail: string
    generated_videoId: number
    translated_audioId: number
    translated_textId: number
    extracted_textId: number
}

export interface LipSyncProject extends BaseProject {
    id: string
    type_project: ProjectType.Lipsync
    original_videoId: number
    thumbnail: string
    original_audioId: null | number
    generated_videoId: number
}

export interface RawVideo extends BaseProject {
    id: number
    type_project: ProjectType.Video
    thumbnail: string
}

export interface RawText extends BaseProject {
    id: number
    type_project: ProjectType.Text
}

export interface RawAudio extends BaseProject {
    id: number
    type_project: ProjectType.Audio
}

export type Project =
    | RawVideo
    | RawText
    | RawAudio
    | TextTranslationProject
    | LipSyncProject
    | AudioGenerationProject
    | TextGenerationProject
    | FullPipelineProject

export enum ProjectType {
    Fullpipeline = 'Full Pipeline',
    TextGeneration = 'Text Generation',
    TextTranslation = 'Text Translation',
    AudioGeneration = 'Audio Generation',
    Lipsync = 'Lipsync',
    Video = 'video',
    Text = 'text',
    Audio = 'audio',
}

export type MediaType = ProjectType.Text | ProjectType.Audio | ProjectType.Video

export enum PipelineShortForm {
    Fullpipeline = 'fp',
    TextGeneration = 'stt',
    TextTranslation = 'ttt',
    AudioGeneration = 'tts',
    Lipsync = 'ls',
}

export interface GetAllProjectRequest {
    search_key: string | null
    project_type: PipelineShortForm[]
    media_type: MediaType[]
    status: ProjectStatus[]
    offset: number
    limit: number
}

export interface NavInfo {
    created_at: Date | string
    language: string
}

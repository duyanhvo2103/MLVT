import { MediaType, PipelineShortForm } from '../Project'
import { ProjectStatus } from '../ProjectStatus'

export interface GetAllProjectResponse {
    total_count: number
    process_list: {
        id: string
        user_id: number
        progress_type: PipelineShortForm | ''
        media_type: MediaType | '' | 'transcription'
        original_video_id: number
        original_transcription_id: number
        translated_transcription_id: number
        audio_id: number
        progressed_video_id: number
        status: ProjectStatus
        created_at: string | Date
        updated_at: string | Date
        thumbnail_url: string
        title: string
        video_url: string
        language: string
    }[]
}

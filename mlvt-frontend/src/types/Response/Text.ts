import { ProjectStatus } from '../ProjectStatus';

export interface PostText {
    message: string;
    id: number;
}
export interface Text {
    id: number;
    video_id: number;
    user_id: number;
    original_transcription_id: number;
    text: string;
    lang: string;
    folder: string;
    file_name: string;
    status: ProjectStatus;
    created_at: string | Date;
    updated_at: string | Date;
}

export interface TextListResponse {
    transcriptions: Text[];
}

export interface GetTextById {
    transcription: Text;
    download_url: string;
}

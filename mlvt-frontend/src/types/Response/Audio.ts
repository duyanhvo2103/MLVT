import { ProjectStatus } from '../ProjectStatus';

export interface Audio {
    id: number;
    video_id: number;
    user_id: number;
    transcription_id: number;
    duration: number;
    lang: string;
    status: ProjectStatus;
    folder: string;
    file_name: string;
    created_at: string | Date;
    updated_at: string | Date;
}

export interface AudioList {
    audios: Audio[];
}

export interface GetAudioById {
    audio: Audio;
    download_url: string;
}

export interface PostAudio {
    message: string;
    id: number;
}

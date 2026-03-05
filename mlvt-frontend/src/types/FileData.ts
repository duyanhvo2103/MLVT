export interface VideoData {
    title: string
    duration: number
    description: string
    file_name: string
    folder: string
    image: string
    user_id: number | null
}

export interface TextData {
    file_name: string
    folder: string
    user_id: number | null
    lang: string
}

export interface AudioData {
    duration: number
    folder: string
    file_name: string
    user_id: number | null
    lang?: string
}

export type FileData = AudioData | TextData | VideoData

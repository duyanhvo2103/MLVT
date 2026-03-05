export enum PipelineType {
    VideoTranslation = 'video_translation',
    TextGeneration = 'text_generation',
    TextTranslation = 'text_translation',
    VoiceGeneration = 'voice_generation',
    LipSynchronization = 'lip_synchronization',
}

// Represents the state of all possible input fields
export interface PipelineInputs {
    video?: File | number | null
    audio?: File | number | null
    text?: string | File | number | null
    sourceLanguage?: string
    targetLanguage?: string
    language?: string
    customVoiceFile?: File | null
    model?: string
}

export interface PipelineProgress {
    id: string
    user_id: number
    progress_type: 'fp' | 'ttt' | 'stt' | 'tts' | 'ls'
    original_video_id?: number
    original_transcription_id?: number
    translated_transcription_id?: number
    audio_id?: number
    progressed_video_id?: number
    status: 'succeeded' | 'failed' | 'processing'
    created_at: string
    updated_at: string
    thumbnail_url?: string
}

export type GetAllPipelineResponse = {
    progresses: PipelineProgress[]
}

export interface VideoTranslationResult {
    pipelineType: PipelineType.VideoTranslation
    progressData: PipelineProgress
}

export interface TextGenerationResult {
    pipelineType: PipelineType.TextGeneration
    progressData: PipelineProgress
}

export interface TextTranslationResult {
    pipelineType: PipelineType.TextTranslation
    progressData: PipelineProgress
}

export interface LipSynchronizationResult {
    pipelineType: PipelineType.LipSynchronization
    progressData: PipelineProgress
}

export interface VoiceGenerationResult {
    pipelineType: PipelineType.VoiceGeneration
    progressData: PipelineProgress
}

export type PipelineResult =
    | VideoTranslationResult
    | TextGenerationResult
    | TextTranslationResult
    | VoiceGenerationResult
    | LipSynchronizationResult

// The complete state for our page
export interface PipelineState {
    selectedPipeline: PipelineType
    inputs: PipelineInputs
    isGenerating: boolean
    results: PipelineResult | null
    error: string | null
    pollingInfo: { key: keyof PipelineProgress; value: number } | null
}

// Actions that can be dispatched to update the state
export type PipelineAction =
    | { type: 'SET_PIPELINE'; payload: PipelineType }
    | {
          type: 'UPDATE_INPUT'
          payload: { field: keyof PipelineInputs; value: any }
      }
    | { type: 'START_GENERATION' }
    | {
          type: 'START_POLLING'
          payload: { key: keyof PipelineProgress; value: number }
      }
    | { type: 'GENERATION_SUCCESS'; payload: PipelineResult }
    | { type: 'GENERATION_FAILURE'; payload: string }

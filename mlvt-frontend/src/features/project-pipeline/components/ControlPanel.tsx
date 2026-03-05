// src/features/pipeline/ControlsPanel.tsx
import { Box, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useContext } from 'react'
import { WrappedTab, WrappedTabs } from '../../../components/WrappedTab'
import { PipelineContext } from '../context/PipelineContext'
import { PipelineType } from '../types'
import LipSynchronizationForm from './forms/LipSynchronizationForm'
import TextGenerationForm from './forms/TextGenerationForm'
import TextTranslationForm from './forms/TextTranslationForm'
import VideoTranslationForm from './forms/VideoTranslationForm'
import VoiceGenerationForm from './forms/VoiceGenerationForm'

const ControlsPanel = () => {
    const theme = useTheme()
    const { state, dispatch } = useContext(PipelineContext)

    const handleTabChange = (
        event: React.SyntheticEvent,
        newValue: PipelineType,
    ) => {
        if (state.isGenerating) {
            return
        }
        dispatch({ type: 'SET_PIPELINE', payload: newValue })
    }

    const renderForm = () => {
        switch (state.selectedPipeline) {
            case 'video_translation':
                return <VideoTranslationForm />

            case 'text_generation':
                return <TextGenerationForm />

            case 'text_translation':
                return <TextTranslationForm />

            case 'voice_generation':
                return <VoiceGenerationForm />

            case 'lip_synchronization':
                return <LipSynchronizationForm />

            default:
                return <VideoTranslationForm />
        }
    }

    return (
        <Box>
            <WrappedTabs
                value={state.selectedPipeline}
                onChange={handleTabChange}
            >
                <WrappedTab
                    label="Video Translation"
                    value="video_translation"
                    disabled={state.isGenerating}
                />
                <WrappedTab
                    label="Text Generation"
                    value="text_generation"
                    disabled={state.isGenerating}
                />
                <WrappedTab
                    label="Text Translation"
                    value="text_translation"
                    disabled={state.isGenerating}
                />
                <WrappedTab
                    label="Voice Generation"
                    value="voice_generation"
                    disabled={state.isGenerating}
                />
                <WrappedTab
                    label="Lip Synchronization"
                    value="lip_synchronization"
                    disabled={state.isGenerating}
                />
            </WrappedTabs>
            <Divider
                sx={{
                    marginY: 2,
                    borderColor: theme.palette.tertiary.contrastText,
                }}
            />
            <Box>{renderForm()}</Box>
        </Box>
    )
}

export default ControlsPanel

import { Box, Divider, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { SingleOptionBox } from 'src/features/core-feature-popup/ProcessTriggerPopup/BaseComponent/SingleOptionBox'

import { TranslateLanguage } from 'src/types/Translation'
import { PipelineContext } from '../../context/PipelineContext'
import MultiSourceInput from '../shared/MultiSourceInput'

const TextTranslationForm = () => {
    const { state, dispatch } = useContext(PipelineContext)
    const languageChoices = [
        TranslateLanguage.English,
        TranslateLanguage.Vietnamese,
    ]

    const handleChangeAudioLanguage = (value: string) => {
        // We'll map this to 'sourceLanguage' in the global state
        dispatch({
            type: 'UPDATE_INPUT',
            payload: { field: 'sourceLanguage', value },
        })
    }

    const handleChangeTargetLanguage = (value: string) => {
        // We'll map this to 'targetLanguage' in the global state
        dispatch({
            type: 'UPDATE_INPUT',
            payload: { field: 'targetLanguage', value },
        })
    }

    return (
        <Stack spacing={3}>
            <MultiSourceInput label="Text" field="text" inputType="text" />
            <Divider sx={{ borderColor: 'divider', my: 2 }} />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                }}
            >
                <Box flex={1}>
                    <Typography
                        variant="body2"
                        fontFamily={'Poppins, sans-serif'}
                        color={'text.secondary'}
                        fontWeight={500}
                    >
                        Video's Language
                    </Typography>
                    <SingleOptionBox
                        choices={languageChoices}
                        handleChangeOption={handleChangeAudioLanguage}
                        value={state.inputs.sourceLanguage || ''}
                        disabled={state.isGenerating}
                    />
                </Box>
                <Box flex={1}>
                    <Typography
                        variant="body2"
                        fontFamily={'Poppins, sans-serif'}
                        color={'text.secondary'}
                        fontWeight={500}
                    >
                        Translate to
                    </Typography>
                    <SingleOptionBox
                        choices={languageChoices}
                        handleChangeOption={handleChangeTargetLanguage}
                        value={state.inputs.targetLanguage || ''}
                        disabled={state.isGenerating}
                    />
                </Box>
            </Box>
        </Stack>
    )
}

export default TextTranslationForm

import { Box, Divider, Stack, Typography } from '@mui/material'
import { useContext } from 'react'

import { SingleOptionBox } from 'src/features/core-feature-popup/ProcessTriggerPopup/BaseComponent/SingleOptionBox'
import { TranslateLanguage } from 'src/types/Translation'
import { PipelineContext } from '../../context/PipelineContext'
import MultiSourceInput from '../shared/MultiSourceInput'

const TextGenerationForm = () => {
    const { state, dispatch } = useContext(PipelineContext)
    const languageChoices = [
        TranslateLanguage.English,
        TranslateLanguage.Vietnamese,
    ]
    const handleChangeAudioLanguage = (value: string) => {
        dispatch({
            type: 'UPDATE_INPUT',
            payload: { field: 'sourceLanguage', value },
        })
    }
    return (
        <Stack spacing={3}>
            <MultiSourceInput label="Video" field="video" inputType="video" />
            <Divider sx={{ borderColor: 'divider', my: 2 }} />

            <Box gap={2}>
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
                    customSx={{ width: '35%' }}
                    disabled={state.isGenerating}
                />
            </Box>
        </Stack>
    )
}

export default TextGenerationForm

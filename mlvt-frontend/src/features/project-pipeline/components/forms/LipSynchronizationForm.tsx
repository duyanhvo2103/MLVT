import { Divider, Stack } from '@mui/material'

import MultiSourceInput from '../shared/MultiSourceInput'

const LipSynchronizationForm = () => {
    return (
        <Stack spacing={3}>
            <MultiSourceInput label="Video" field="video" inputType="video" />
            <Divider sx={{ borderColor: 'divider', my: 2 }} />
            <MultiSourceInput label="Audio" field="audio" inputType="audio" />
            <Divider sx={{ borderColor: 'divider', my: 2 }} />
        </Stack>
    )
}
export default LipSynchronizationForm

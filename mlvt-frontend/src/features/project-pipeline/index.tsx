import { Grid, Paper } from '@mui/material'
import { useReducer } from 'react'
import HomePage from '../../layout/HomePage'
import ControlsPanel from './components/ControlPanel'
import ResultsPanel from './components/ResultsPanel'
import { PipelineContext } from './context/PipelineContext'
import { initialState, pipelineReducer } from './reducer/pipelineReducer'

const FeaturePage = () => {
    const [state, dispatch] = useReducer(pipelineReducer, initialState)

    return (
        <HomePage>
            <PipelineContext.Provider value={{ state, dispatch }}>
                <Grid container spacing={3} sx={{ padding: 3 }}>
                    <Grid item xs={12} md={5}>
                        <Paper
                            elevation={3}
                            sx={{ padding: 3, height: '100%' }}
                        >
                            <ControlsPanel />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Paper
                            elevation={3}
                            sx={{ padding: 3, height: '100%' }}
                        >
                            <ResultsPanel />
                        </Paper>
                    </Grid>
                </Grid>
            </PipelineContext.Provider>
        </HomePage>
    )
}
export default FeaturePage

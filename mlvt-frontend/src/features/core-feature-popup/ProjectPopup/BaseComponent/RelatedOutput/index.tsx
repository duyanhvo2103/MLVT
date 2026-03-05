import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, CircularProgress, Tooltip } from '@mui/material'
import { TextView } from './CustomizedTextBox'
import { CustomAudioPlayer } from './CustomizedVideoBox'

// --- Types are correct, no changes needed ---
interface AudioProps {
    type: 'audio/video'
    props: {
        audioSrc: string
        audioTitle: string
        sourceType: 'audio' | 'video'
        isLoading?: boolean
        error?: string | null
    }
}
interface TextProps {
    type: 'text'
    props: {
        displayText: string
        textTitle: string
        isLoading?: boolean
        error?: string | null
    }
}
type ChildComponentProps = AudioProps | TextProps
interface RelatedOutputProps {
    childrenData: ChildComponentProps[]
    splitTwoColumn: boolean
}

export const RelatedOutput: React.FC<RelatedOutputProps> = ({
    childrenData,
    splitTwoColumn,
}) => {
    return (
        <Box
            sx={
                splitTwoColumn
                    ? {
                          display: 'grid',
                          gridTemplateColumns: {
                              xs: '1fr',
                              md: 'repeat(2, 1fr)',
                          },
                          gap: 2,
                          width: '100%',
                          padding: 2,
                      }
                    : {
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                          width: '100%',
                      }
            }
        >
            {childrenData.map((child, index) => {
                const { isLoading, error } = child.props
                const title =
                    child.type === 'text'
                        ? child.props.textTitle
                        : child.props.audioTitle

                return (
                    <Box
                        key={index}
                        sx={{
                            border: 1,
                            borderColor: error ? 'error.main' : 'divider',
                            borderRadius: 2,
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: '300px',
                        }}
                    >
                        {/* This inner box will hold the dynamic content */}
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'auto',
                            }}
                        >
                            {(() => {
                                if (isLoading) {
                                    return <CircularProgress />
                                }
                                if (error) {
                                    return (
                                        <Tooltip title={error}>
                                            <ErrorOutlineIcon
                                                color="error"
                                                fontSize="large"
                                            />
                                        </Tooltip>
                                    )
                                }
                                return (
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            overflowY: 'none',
                                            backgroundColor: (theme) =>
                                                theme.palette.tertiary.main,
                                            borderRadius: '20px',
                                        }}
                                    >
                                        {child.type === 'audio/video' && (
                                            <CustomAudioPlayer
                                                audioSrc={child.props.audioSrc}
                                                audioTitle={title}
                                                sourceType={
                                                    child.props.sourceType
                                                }
                                            />
                                        )}
                                        {child.type === 'text' && (
                                            <TextView
                                                displayText={
                                                    child.props.displayText
                                                }
                                                textTitle={title}
                                                centerTitle={false}
                                            />
                                        )}
                                    </Box>
                                )
                            })()}
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}

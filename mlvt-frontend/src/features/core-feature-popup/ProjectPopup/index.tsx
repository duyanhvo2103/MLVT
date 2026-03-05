import React from 'react'
import { Project, ProjectType } from '../../../types/Project'
import { BasePopup } from '../BasePopup'
import { AudioGenerationContent } from './FeatureComponents/AudioGeneration'
import { FullPipelineContent } from './FeatureComponents/FullPipelineContent'
import { LipSyncContent } from './FeatureComponents/LipSyncContent'
import { RawAudioContent } from './FeatureComponents/RawAudioContent'
import { RawTextContent } from './FeatureComponents/RawTextContent'
import { RawVideoContent } from './FeatureComponents/RawVideoContext'
import { TextGenerationContent } from './FeatureComponents/TextGenerationContent'
import { TextTranslationContent } from './FeatureComponents/TextTranslationContent'

interface ProcessedVideoProps {
    inputObject: Project
    isOpen: boolean
    type: ProjectType
    hideNavBar?: boolean
    hideDownloadButton?: boolean
    onClose: () => void
}

export const ProcessedVideoPopUp: React.FC<ProcessedVideoProps> = ({
    inputObject,
    type,
    isOpen,
    onClose,
    hideNavBar = false,
    hideDownloadButton,
}) => {
    const getChildComponent = (project: Project): React.ReactNode => {
        switch (project.type_project) {
            case ProjectType.Video:
                return (
                    <RawVideoContent
                        videoId={project.id}
                        hideNavBar={hideNavBar}
                    />
                )
            case ProjectType.Text:
                return (
                    <RawTextContent
                        textId={project.id}
                        hideNavBar={hideNavBar}
                        hideDownloadButton={hideDownloadButton}
                        customSx={{ height: '90%', width: '80%' }}
                        centerTitle={true}
                    />
                )
            case ProjectType.Audio:
                return (
                    <RawAudioContent
                        audioId={project.id}
                        hideNavBar={hideNavBar}
                    />
                )
            case ProjectType.Fullpipeline:
                return <FullPipelineContent inputProject={project} /> // Use project.id instead of videoId
            case ProjectType.TextGeneration:
                return <TextGenerationContent inputProject={project} /> // Use project.id
            case ProjectType.TextTranslation:
                return <TextTranslationContent inputProject={project} />
            case ProjectType.AudioGeneration:
                return <AudioGenerationContent inputProject={project} />
            case ProjectType.Lipsync:
                return <LipSyncContent inputProject={project} />

            default:
                return <></> // Handle unknown project types
        }
    }

    interface customSxPopup {
        customSx: object
        customPaperPropSx: object
    }

    const smallBasePopup: customSxPopup = {
        customSx: {
            // height: hideNavBar ? '37.5rem' : '42.5rem',
            '& .MuiDialog-paper': {
                height: 'auto', // Make height fit content
                maxWidth: '90vw', // Limit max width to viewport width
                maxHeight: '90vh',
            },
        },
        customPaperPropSx: {
            height: hideNavBar ? '36rem' : '40rem',
        },
    }
    const largeBasePopup: customSxPopup = {
        customSx: {
            // height: hideNavBar ? '45.5rem' : '47.5rem',
            '& .MuiDialog-paper': {
                // width: 'auto', // Make width fit content
                height: 'auto', // Make height fit content
                maxWidth: '90vw', // Limit max width to viewport width
                maxHeight: '90vh', // Limit max height to viewport height
            },
        },
        customPaperPropSx: {
            height: hideNavBar ? '40rem' : '42rem',
        },
    }

    const getCustomSxChild = (project: Project): customSxPopup => {
        if (
            project.type_project === ProjectType.Video ||
            project.type_project === ProjectType.Text ||
            project.type_project === ProjectType.Audio
        )
            return smallBasePopup
        else return largeBasePopup
    }

    return (
        <>
            <BasePopup
                title={inputObject.title || 'Video translation'}
                isOpen={isOpen}
                onClose={onClose}
                statusChip={inputObject.status}
                childComponent={getChildComponent(inputObject)}
                customSx={getCustomSxChild(inputObject).customSx}
                customPaperPropsSx={
                    getCustomSxChild(inputObject).customPaperPropSx
                }
            />
        </>
    )
}

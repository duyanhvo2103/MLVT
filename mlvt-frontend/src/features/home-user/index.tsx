import { useState } from 'react'

import NavBar from '../../components/NavBar'
import HomePage from '../../layout/HomePage'
import { LipsyncPopup } from '../core-feature-popup/ProcessTriggerPopup/LipSync'
import { TextGenerationPopup } from '../core-feature-popup/ProcessTriggerPopup/TextGeneration'
import { TextTranslationPopup } from '../core-feature-popup/ProcessTriggerPopup/TextTranslation'
import { VideoTranslationPopup } from '../core-feature-popup/ProcessTriggerPopup/VideoTranslation'
import { VoiceGenerationPopup } from '../core-feature-popup/ProcessTriggerPopup/VoiceGeneration'
import HomeContent from './components/HomeContent'
import TokenRetrieve from './components/TokenRetrieve'

const HomeUser = () => {
    const [isVideoTranslation, setIsVideoTranslation] = useState<boolean>(false)
    const [isTextGeneration, setIsTextGeneration] = useState<boolean>(false)
    const [isTextTranslation, setIsTextTranslation] = useState<boolean>(false)
    const [isVoiceGeneration, setIsVoiceGeneration] = useState<boolean>(false)
    const [isLipsync, setIsLipSync] = useState<boolean>(false)

    const handleOpenVideoTranslationDialog = () => {
        setIsVideoTranslation(true)
    }

    const handleCloseVideoTranslationDialog = () => {
        setIsVideoTranslation(false)
    }

    const handleOpenTextGenerationDialog = () => {
        setIsTextGeneration(true)
    }

    const handleOpenLipsyncDialog = () => {
        setIsLipSync(true)
    }
    const handleOpenVoiceGenerationDialog = () => {
        setIsVoiceGeneration(true)
    }

    const handleCloseTextGenerationDialog = () => {
        setIsTextGeneration(false)
    }

    const handleOpenTextTranslationDialog = () => {
        setIsTextTranslation(true)
    }

    const handleCloseTextTranslationDialogg = () => {
        setIsTextTranslation(false)
    }

    const handleCloseLipsyncDialog = () => {
        setIsLipSync(false)
    }
    const handleCloseVoiceGenerationDialog = () => {
        setIsVoiceGeneration(false)
    }

    return (
        <HomePage>
            <NavBar
                onOpenVideoTranslation={handleOpenVideoTranslationDialog}
                onOpenTextGeneration={handleOpenTextGenerationDialog}
                onOpenTextTranslation={handleOpenTextTranslationDialog}
                onOpenLipsync={handleOpenLipsyncDialog}
                onOpenVoiceGeneration={handleOpenVoiceGenerationDialog}
            />

            <TokenRetrieve />
            <HomeContent />
            <VideoTranslationPopup
                isOpen={isVideoTranslation}
                onClose={handleCloseVideoTranslationDialog}
            />
            <TextGenerationPopup
                isOpen={isTextGeneration}
                onClose={handleCloseTextGenerationDialog}
            />
            <TextTranslationPopup
                isOpen={isTextTranslation}
                onClose={handleCloseTextTranslationDialogg}
            />
            <VoiceGenerationPopup
                isOpen={isVoiceGeneration}
                onClose={handleCloseVoiceGenerationDialog}
            />
            <LipsyncPopup
                isOpen={isLipsync}
                onClose={handleCloseLipsyncDialog}
            />
        </HomePage>
    )
}

export default HomeUser

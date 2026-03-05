import React from 'react'
import { MediaType, Project } from '../../../../../types/Project'
import { BasePopup } from '../../../BasePopup'
import { DialogContent } from './PopupContent'

interface BrowseMLVTPopupProps {
    isOpen: boolean
    onClose: () => void
    allowType?: MediaType[]
    handleChangeSelectedProject: (selectedProject: Project) => void
}

export const BrowseMLVTPopup: React.FC<BrowseMLVTPopupProps> = ({
    isOpen,
    onClose,
    allowType,
    handleChangeSelectedProject,
}) => {
    return (
        <>
            <BasePopup
                title="Browse MLVT"
                isOpen={isOpen}
                onClose={onClose}
                statusChip={null}
                childComponent={
                    <DialogContent
                        onClosePopup={onClose}
                        allowType={allowType}
                        handleChangeSelectedProject={
                            handleChangeSelectedProject
                        }
                    />
                }
                customSx={{ maxHeight: '80%' }}
            />
        </>
    )
}

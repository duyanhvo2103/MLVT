import { Project } from '../../types/Project'
export const checkValidGenerate = (
    state: 'upload' | 'url' | 'browse',
    uploadFile: File | null,
    MLVTFile: Project | null,
): boolean => {
    if (state === 'upload' && uploadFile) {
        return true
    } else if (state === 'browse' && MLVTFile) {
        return true
    }
    return false
}

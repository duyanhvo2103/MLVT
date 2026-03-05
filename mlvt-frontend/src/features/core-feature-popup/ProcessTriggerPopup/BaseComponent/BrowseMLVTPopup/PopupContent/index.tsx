import { Box, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'

import SearchBar from 'src/components/SearchBar'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { GetAllProjectRequest, MediaType, Project } from 'src/types/Project'
import { ProjectStatus } from 'src/types/ProjectStatus'
import { getAllProgressProjects } from 'src/utils/project.utils'
import { BrowseFileCard } from '../../BrowseFileCard'
import { GenerateButton } from '../../GenerateButton'

interface DialogContentProps {
    onClosePopup: () => void
    handleChangeSelectedProject: (selectedProject: Project) => void
    allowType?: MediaType[]
}

export const DialogContent: React.FC<DialogContentProps> = ({
    onClosePopup,
    allowType,
    handleChangeSelectedProject,
}) => {
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''
    const [selectedProject, setSelectedProject] =
        React.useState<Project | null>(null)

    const [getProjectRequest, setGetProjectRequest] =
        useState<GetAllProjectRequest>({
            search_key: null,
            project_type: [],
            media_type: Array.from(allowType || []),
            status: [
                ProjectStatus.Failed,
                ProjectStatus.Processing,
                ProjectStatus.Succeeded,
                ProjectStatus.Raw,
            ],
            offset: 0,
            limit: 9,
        })

    const [displayProjects, setDisplayProjects] = useState<Project[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const currentPage =
        Math.floor(getProjectRequest.offset / getProjectRequest.limit) + 1
    const totalPages = Math.ceil(totalCount / getProjectRequest.limit)

    const handleCardClick = (project: Project) => {
        setSelectedProject((prev) => (prev?.id === project.id ? null : project))
    }

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const keyword = e.currentTarget.value.trim()
            setGetProjectRequest((prev) => ({
                ...prev,
                search_key: keyword === '' ? null : keyword,
                offset: 0,
            }))
        }
    }

    const handleGenerate = () => {
        if (selectedProject) {
            handleChangeSelectedProject(selectedProject)
            onClosePopup()
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userId) {
                    return
                }
                const [fetchedProject, totalCount] =
                    await getAllProgressProjects(userId, getProjectRequest)
                setDisplayProjects(fetchedProject)
                setTotalCount(totalCount)
            } catch (error) {
                setDisplayProjects([])
                setTotalCount(0)
            }
        }
        fetchData()
    }, [userId, getProjectRequest])

    return (
        <>
            <SearchBar
                placeholder="Search"
                onKeyDown={handleSearchKeyDown}
                searchBarWidth="40rem"
            />
            <Box
                sx={{
                    height: '25rem',
                    marginTop: '1rem',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        rowGap: '1.5rem',
                        columnGap: '1.2rem',
                        justifyItems: 'center',
                        alignItems: 'center',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        padding: '1rem',
                    }}
                >
                    {displayProjects.map((project) => (
                        <BrowseFileCard
                            key={project.type_project + project.id}
                            project={project}
                            onclick={() => handleCardClick(project)}
                            customSx={{ width: '14rem', height: '14rem' }}
                            blueBoxOutside={selectedProject?.id === project.id}
                        />
                    ))}
                </Box>

                {totalPages >= 1 && (
                    <Box
                        sx={{
                            padding: '0.5rem',
                            display: 'flex',
                            justifyContent: 'center',
                            borderTop: '1px solid #eee',
                        }}
                    >
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(event, value) => {
                                setGetProjectRequest((prev) => ({
                                    ...prev,
                                    offset: (value - 1) * prev.limit,
                                }))
                            }}
                            color="primary"
                            shape="rounded"
                        />
                    </Box>
                )}
            </Box>

            <GenerateButton
                isDisable={selectedProject === null}
                handleGenerate={handleGenerate}
                buttonContent="CHOOSE"
                customSx={{ marginTop: '0px' }}
            />
        </>
    )
}

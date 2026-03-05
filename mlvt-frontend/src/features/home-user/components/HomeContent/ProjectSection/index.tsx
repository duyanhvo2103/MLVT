import {
    Box,
    FormControl,
    MenuItem,
    Pagination,
    Select,
    Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import CardFeature from 'src/components/CardFeature'
import SearchBar from 'src/components/SearchBar'
import { ProcessedVideoPopUp } from 'src/features/core-feature-popup/ProjectPopup'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import {
    GetAllProjectRequest,
    PipelineShortForm,
    Project,
} from 'src/types/Project'
import { ProjectStatus } from 'src/types/ProjectStatus'
import { getAllProgressProjects } from 'src/utils/project.utils'

const ProjectSection = () => {
    const theme = useTheme()
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''

    const [getProjectRequest, setGetProjectRequest] =
        useState<GetAllProjectRequest>({
            search_key: null,
            project_type: [
                PipelineShortForm.TextGeneration,
                PipelineShortForm.AudioGeneration,
                PipelineShortForm.Fullpipeline,
                PipelineShortForm.TextTranslation,
                PipelineShortForm.Lipsync,
            ],
            media_type: [],
            status: [
                ProjectStatus.Failed,
                ProjectStatus.Processing,
                ProjectStatus.Succeeded,
            ],
            offset: 0,
            limit: 9,
        })
    const [selectedProject, setSelectedProject] =
        React.useState<Project | null>(null)
    const [isPopUpOpen, setIsPopUpOpen] = React.useState(false)
    const [displayProjects, setDisplayProjects] = useState<Project[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const currentPage =
        Math.floor(getProjectRequest.offset / getProjectRequest.limit) + 1
    const totalPages = Math.ceil(totalCount / getProjectRequest.limit)

    const handleChangeProjectType = (input: PipelineShortForm | 'All') => {
        if (input === 'All') {
            setGetProjectRequest((prev) => ({
                ...prev,
                project_type: [
                    PipelineShortForm.TextGeneration,
                    PipelineShortForm.AudioGeneration,
                    PipelineShortForm.Fullpipeline,
                    PipelineShortForm.TextTranslation,
                    PipelineShortForm.Lipsync,
                ],
                offset: 0,
            }))
        } else {
            setGetProjectRequest((prev) => ({
                ...prev,
                project_type: [input],
                offset: 0,
            }))
        }
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

    const handleCardClick = (project: Project) => {
        setSelectedProject(project)
        setIsPopUpOpen(true)
    }

    const handleClosePopUp = () => {
        setIsPopUpOpen(false)
        setSelectedProject(null)
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
        <Box>
            {/* YOUR PROJECT - SEARCH BAR */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '2rem',
                    marginBottom: '3.5rem',
                    paddingX: '1.5rem',
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        fontSize: '1.8rem',
                    }}
                >
                    Projects
                </Typography>
                <Box
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.secondary.main,
                        minWidth: '3.5rem',
                        paddingX: '0.5rem',
                        height: '3rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0.7rem',
                        marginLeft: '1.6rem',
                        marginRight: 'auto',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 650,
                            fontSize: '1.5rem',
                            whiteSpace: 'nowrap',
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        {displayProjects.length}
                    </Typography>
                </Box>

                {/* Search bar */}
                <Box>
                    <SearchBar
                        placeholder="Search"
                        onKeyDown={handleSearchKeyDown}
                        searchBarWidth="20rem"
                    />
                </Box>
                {/* Sort for search */}
                <FormControl
                    sx={{
                        marginLeft: '1rem',
                        height: '2.2rem',
                        width: '11rem',
                        borderRadius: '0.7rem',
                    }}
                >
                    <Select
                        labelId="dropdown-label"
                        value={
                            getProjectRequest.project_type.length === 1
                                ? getProjectRequest.project_type[0]
                                : 'All'
                        }
                        onChange={(e) =>
                            handleChangeProjectType(
                                e.target.value as PipelineShortForm | 'All',
                            )
                        }
                        displayEmpty
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            borderRadius: '0.7rem',
                            fontFamily: 'Poppins, sans-serif',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    borderRadius: '0.8rem',
                                    boxShadow:
                                        '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                    marginTop: '0.5rem',
                                    '& .MuiMenuItem-root': {
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '0.8rem',
                                        '&:hover': {
                                            backgroundColor:
                                                theme.palette.secondary.main,
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor:
                                                theme.palette.secondary.main,
                                        },
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value={PipelineShortForm.Fullpipeline}>
                            Video Translation
                        </MenuItem>
                        <MenuItem value={PipelineShortForm.TextGeneration}>
                            Text Generation
                        </MenuItem>
                        <MenuItem value={PipelineShortForm.TextTranslation}>
                            Text Translation
                        </MenuItem>
                        <MenuItem value={PipelineShortForm.AudioGeneration}>
                            Voice Generation
                        </MenuItem>
                        <MenuItem value={PipelineShortForm.Lipsync}>
                            Lip Synchronization
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {/* PROJECTS */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridAutoRows: 'minmax(100px, auto)',
                    justifyItems: 'center',
                    rowGap: '3rem',
                }}
            >
                {displayProjects.map((project) => (
                    <CardFeature
                        key={project.type_project + project.id}
                        project={project}
                        onclick={() => handleCardClick(project)}
                    />
                ))}
            </Box>

            {totalPages >= 1 && (
                <Box
                    sx={{
                        mt: '2rem',
                        display: 'flex',
                        justifyContent: 'center',
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

            {selectedProject && (
                <ProcessedVideoPopUp
                    inputObject={selectedProject}
                    isOpen={isPopUpOpen}
                    onClose={handleClosePopUp}
                    type={selectedProject.type_project}
                />
            )}
        </Box>
    )
}

export default ProjectSection

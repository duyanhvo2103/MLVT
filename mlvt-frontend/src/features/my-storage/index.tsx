import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight'
import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    Pagination,
    SxProps,
    Theme,
    Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useCallback, useEffect, useState } from 'react'

import CardFeature from 'src/components/CardFeature'
import SearchBar from 'src/components/SearchBar'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import Layout from 'src/layout/HomePage'
import {
    GetAllProjectRequest,
    MediaType,
    PipelineShortForm,
    Project,
    ProjectType,
} from 'src/types/Project'
import { ProjectStatus } from 'src/types/ProjectStatus'
import { getAllProgressProjects } from 'src/utils/project.utils'
import { ProcessedVideoPopUp } from '../core-feature-popup/ProjectPopup'

interface categoryProjectType {
    label: string
    filterList: MediaType[] | PipelineShortForm[]
    checkStatus: boolean
}

interface categoryProjectStatus {
    label: string
    filterList: ProjectStatus[]
    checkStatus: boolean
    color?: string
}

const PipelineOption = [
    {
        label: 'All',
        filterList: [
            PipelineShortForm.AudioGeneration,
            PipelineShortForm.Fullpipeline,
            PipelineShortForm.Lipsync,
            PipelineShortForm.TextGeneration,
            PipelineShortForm.TextTranslation,
        ],
        checkStatus: true,
    },
    {
        label: 'Video Translation',
        filterList: [PipelineShortForm.Fullpipeline],
        checkStatus: true,
    },
    {
        label: 'Text Generation',
        filterList: [PipelineShortForm.TextGeneration],
        checkStatus: true,
    },
    {
        label: 'Text Translation',
        filterList: [PipelineShortForm.TextTranslation],
        checkStatus: true,
    },
    {
        label: 'Voice Generation',
        filterList: [PipelineShortForm.AudioGeneration],
        checkStatus: true,
    },
    {
        label: 'Lip Synchronization',
        filterList: [PipelineShortForm.Lipsync],
        checkStatus: true,
    },
]

const MediaOption = [
    {
        label: 'All',
        filterList: [
            ProjectType.Audio,
            ProjectType.Video,
            ProjectType.Text,
        ] as MediaType[],
        checkStatus: false,
    },
    {
        label: 'Video',
        filterList: [ProjectType.Video] as MediaType[],
        checkStatus: false,
    },
    {
        label: 'Text',
        filterList: [ProjectType.Text] as MediaType[],
        checkStatus: false,
    },
    {
        label: 'Audio',
        filterList: [ProjectType.Audio] as MediaType[],
        checkStatus: false,
    },
]

const getStatusOptions = (theme: Theme) => [
    {
        label: 'All',
        filterList: [
            ProjectStatus.Failed,
            ProjectStatus.Processing,
            ProjectStatus.Raw,
            ProjectStatus.Succeeded,
        ],
        checkStatus: true,
        color: theme.palette.text.secondary,
    },
    {
        label: 'Succeeded',
        color: theme.palette.success.main,
        filterList: [ProjectStatus.Succeeded],
        checkStatus: true,
    },
    {
        label: 'Processing',
        color: theme.palette.warning.main,
        filterList: [ProjectStatus.Processing],
        checkStatus: true,
    },
    {
        label: 'Failed',
        color: theme.palette.error.main,
        filterList: [ProjectStatus.Failed],
        checkStatus: true,
    },
    {
        label: 'Raw',
        color: theme.palette.neutral.main,
        filterList: [ProjectStatus.Raw],
        checkStatus: true,
    },
]

interface ComponentProps {
    inputOption: categoryProjectType | categoryProjectStatus
    labelProps?: SxProps
    color: string
}

function CheckboxComponent({
    inputOption,
    labelProps,
    color,
    onCheck,
    onUncheck,
}: ComponentProps & {
    onCheck: () => void
    onUncheck: () => void
}) {
    const theme = useTheme()
    const handleChange = () => {
        if (!inputOption.checkStatus) {
            onCheck()
        } else {
            onUncheck()
        }
    }

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={inputOption.checkStatus}
                    onChange={handleChange}
                    sx={{
                        color: color,
                        '&.Mui-checked': {
                            color: color,
                        },
                        height: '2.625rem',
                    }}
                />
            }
            sx={{
                margin: '0',
                color: theme.palette.text.secondary,
                ...labelProps,
            }}
            label={<Typography sx={labelProps}>{inputOption.label}</Typography>}
        />
    )
}

const Storage = () => {
    const theme = useTheme()
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''
    const [displayProjects, setDisplayProjects] = useState<Project[]>([])

    // State for filter options
    const [pipelineOption, setPipelineOption] = useState(() => PipelineOption)
    const [mediaOption, setMediaOption] = useState(() => MediaOption)
    const [statusOption, setStatusOption] = useState(() =>
        getStatusOptions(theme),
    )
    const [projectTypeFilter, setProjectTypeFilter] = useState<
        Set<PipelineShortForm>
    >(new Set(PipelineOption.flatMap((opt) => opt.filterList)))
    const [mediaTypeFilter, setMediaTypeFilter] = useState<Set<MediaType>>(
        new Set(MediaOption.flatMap((opt) => opt.filterList as MediaType[])),
    )
    const [projectStatusFilter, setProjectStatusFilter] = useState<
        Set<ProjectStatus>
    >(new Set(getStatusOptions(theme).flatMap((opt) => opt.filterList)))

    // State for favorite projects
    // const [isFavorite, setIsFavorite] = useState(false)

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
                ProjectStatus.Raw,
                ProjectStatus.Failed,
                ProjectStatus.Processing,
                ProjectStatus.Succeeded,
            ],
            offset: 0,
            limit: 9,
        })

    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)
    const [totalCount, setTotalCount] = useState(0)
    const currentPage =
        Math.floor(getProjectRequest.offset / getProjectRequest.limit) + 1
    const totalPages = Math.ceil(totalCount / getProjectRequest.limit)
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

    useEffect(() => {
        setGetProjectRequest((prev) => ({
            ...prev,
            project_type: Array.from(projectTypeFilter),
            media_type: Array.from(mediaTypeFilter),
            status: Array.from(projectStatusFilter),
            offset: 0,
        }))
    }, [projectTypeFilter, mediaTypeFilter, projectStatusFilter])

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

    const handleFilterChange = useCallback(
        <T extends { label: string; filterList: any[]; checkStatus: boolean }>(
            optionToToggle: T,
            allOptions: T[],
            setOptions: React.Dispatch<React.SetStateAction<T[]>>,
            setFilterSet: React.Dispatch<React.SetStateAction<Set<any>>>,
            category: 'Pipeline' | 'Media' | 'Status',
        ) => {
            const isChecking = !optionToToggle.checkStatus
            let newOptions = [...allOptions]

            if (optionToToggle.label === 'All') {
                newOptions = allOptions.map((opt) => ({
                    ...opt,
                    checkStatus: isChecking,
                }))
            } else {
                newOptions = allOptions.map((opt) =>
                    opt.label === optionToToggle.label
                        ? { ...opt, checkStatus: isChecking }
                        : opt,
                )
                // Check if all other options are checked to update the "All" checkbox
                const allOthersChecked = newOptions
                    .filter((opt) => opt.label !== 'All')
                    .every((opt) => opt.checkStatus)
                newOptions = newOptions.map((opt) =>
                    opt.label === 'All'
                        ? { ...opt, checkStatus: allOthersChecked }
                        : opt,
                )
            }

            setOptions(newOptions)

            // Update the master filter Set based on all checked options
            const newFilterSet = new Set(
                newOptions
                    .filter((opt) => opt.checkStatus && opt.label !== 'All')
                    .flatMap((opt) => opt.filterList),
            )
            setFilterSet(newFilterSet)
            if (category === 'Media') {
                setPipelineOption((opts) =>
                    opts.map((opt) => ({ ...opt, checkStatus: false })),
                )
                setProjectTypeFilter(new Set())
            } else if (category === 'Pipeline') {
                setMediaOption((opts) =>
                    opts.map((opt) => ({ ...opt, checkStatus: false })),
                )
                setMediaTypeFilter(new Set())
            }
        },
        [],
    )

    const handleCardClick = (project: Project) => {
        setSelectedProject(project)
        setIsPopUpOpen(true)
    }

    const handleClosePopUp = () => {
        setIsPopUpOpen(false)
        setSelectedProject(null)
    }

    return (
        <Layout>
            <Box display="flex" padding={2}>
                <Box
                    width="18rem"
                    padding="20px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '2rem',
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            marginBottom: '30px',
                        }}
                    >
                        My Storage
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        <Divider
                            orientation="horizontal"
                            flexItem
                            sx={{ borderBottomWidth: 1, marginY: '15px' }}
                        />

                        <Typography
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                            }}
                        >
                            Pipeline Projects
                        </Typography>

                        {/* Checkbox filter: Project Type */}
                        {pipelineOption.map((option, index) => (
                            <CheckboxComponent
                                key={option.label}
                                inputOption={option}
                                labelProps={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '0.9rem',
                                }}
                                color={theme.palette.text.secondary}
                                onCheck={() => {
                                    // resetMedia()
                                    handleFilterChange(
                                        option,
                                        pipelineOption,
                                        setPipelineOption,
                                        setProjectTypeFilter,
                                        'Pipeline',
                                    )
                                }}
                                onUncheck={() =>
                                    handleFilterChange(
                                        option,
                                        pipelineOption,
                                        setPipelineOption,
                                        setProjectTypeFilter,
                                        'Pipeline',
                                    )
                                }
                            />
                        ))}

                        <Divider
                            orientation="horizontal"
                            flexItem
                            sx={{ borderBottomWidth: 1, marginY: '15px' }}
                        />

                        <Typography
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                            }}
                        >
                            Media Projects
                        </Typography>

                        {/* Checkbox filter: Project Type */}
                        {mediaOption.map((option, index) => (
                            <CheckboxComponent
                                key={option.label}
                                inputOption={option}
                                labelProps={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '0.9rem',
                                }}
                                color={theme.palette.text.secondary}
                                onCheck={() => {
                                    // resetPipeline()
                                    handleFilterChange(
                                        option,
                                        mediaOption,
                                        setMediaOption,
                                        setMediaTypeFilter,
                                        'Media',
                                    )
                                }}
                                onUncheck={() =>
                                    handleFilterChange(
                                        option,
                                        mediaOption,
                                        setMediaOption,
                                        setMediaTypeFilter,
                                        'Media',
                                    )
                                }
                            />
                        ))}

                        {/* Status Option */}
                        <Divider
                            orientation="horizontal"
                            flexItem
                            sx={{ borderBottomWidth: 1, marginY: '15px' }}
                        />

                        <Typography
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                            }}
                        >
                            Status
                        </Typography>

                        {/* Checkbox filter: Project Status */}
                        <Box display="flex" flexDirection="column">
                            {statusOption.map((option, index) => (
                                <CheckboxComponent
                                    key={option.label}
                                    inputOption={option}
                                    labelProps={{
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '0.9rem',
                                    }}
                                    color={
                                        option.color ||
                                        theme.palette.text.secondary
                                    }
                                    onCheck={() =>
                                        handleFilterChange(
                                            option,
                                            statusOption,
                                            setStatusOption,
                                            setProjectStatusFilter,
                                            'Status',
                                        )
                                    }
                                    onUncheck={() =>
                                        handleFilterChange(
                                            option,
                                            statusOption,
                                            setStatusOption,
                                            setProjectStatusFilter,
                                            'Status',
                                        )
                                    }
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Main Content */}
                <Box
                    flex="1"
                    paddingTop="20px"
                    paddingLeft="40px"
                    paddingRight="4rem"
                >
                    {/* Search and filter bar */}
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        margin="0.5rem auto"
                        gap={2}
                        sx={{ alignItems: 'center' }}
                        padding="0 0.8rem"
                    >
                        {/* <CustomSearchBar /> */}
                        <Box sx={{ width: '80%' }}>
                            <SearchBar
                                placeholder="Search"
                                onKeyDown={handleSearchKeyDown}
                                searchBarWidth="20rem"
                            />
                        </Box>
                        <AlignHorizontalRightIcon
                            fontSize="medium"
                            sx={{ cursor: 'pointer' }}
                        />
                    </Box>

                    {/* Grid of videos */}
                    <Grid container rowSpacing={3} sx={{ marginTop: '1rem' }}>
                        {displayProjects.map((project) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={project.type_project + project.id}
                                container
                                justifyContent="center"
                                alignItems="center"
                            >
                                <CardFeature
                                    project={project}
                                    onclick={() => handleCardClick(project)}
                                />
                            </Grid>
                        ))}
                    </Grid>

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
                </Box>
            </Box>
            {selectedProject && (
                <ProcessedVideoPopUp
                    inputObject={selectedProject}
                    isOpen={isPopUpOpen}
                    onClose={handleClosePopUp}
                    type={selectedProject.type_project}
                />
            )}
        </Layout>
    )
}

export default Storage

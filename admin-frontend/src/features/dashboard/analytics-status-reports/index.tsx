import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import {
    ApiResponse,
    StatsData,
    useStatsData,
} from '../../../hooks/use-stats-data'
import { useTheme } from '../../../theme'
import PieChart, { PieData } from './d3-pie-chart'
import StatusCard from './status-card'

interface AnalyticsReportProps {
    fetchReport: () => Promise<ApiResponse>
    title: string
}

const AnalyticsReport: React.FC<AnalyticsReportProps> = ({
    fetchReport,
    title,
}) => {
    const theme = useTheme()
    const { data, loading, error } = useStatsData(fetchReport)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    )

    useEffect(() => {
        if (data && !selectedCategory) {
            const firstKey = Object.keys(data)[0]
            if (firstKey) setSelectedCategory(firstKey)
        }
    }, [data, selectedCategory])

    /* ---------- pick the category ---------- */
    const stats: StatsData | null = useMemo(() => {
        if (!data || !selectedCategory) return null
        return data[selectedCategory] || null
    }, [data, selectedCategory])

    /* ---------- build the pie data ---------- */
    const chartData: PieData[] = useMemo(() => {
        if (!stats) return []
        return [
            { label: 'count', value: stats.count },
            { label: 'succeeded', value: stats.succeeded },
            { label: 'failed', value: stats.failed },
        ]
    }, [stats])

    if (loading)
        return (
            <Typography
                gutterBottom
                sx={{
                    fontFamily: theme.typography.body2.fontFamily,
                    fontSize: '1.5em',
                    fontWeight: '700',
                    color: theme.status.inProgress.backgroundColor,
                    textAlign: 'left',
                }}
            >
                Loading&nbsp;{title}…
            </Typography>
        )
    if (error)
        return <Typography color="error">Error: {error.message}</Typography>

    return (
        <Box
            sx={{
                background:
                    'linear-gradient(to right, rgba(44,62,80,0.8) 40%,rgba(44,62,80,0.2) 70%)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: 3.5,
                borderRadius: 4,
            }}
        >
            <Box
                display={'flex'}
                flexDirection="row"
                gap={2}
                mb={4}
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography
                    gutterBottom
                    sx={{
                        fontFamily: theme.typography.body2.fontFamily,
                        fontSize: '1.5em',
                        fontWeight: '700',
                        color: '#BCFFB9',
                        textAlign: 'left',
                    }}
                >
                    {title}
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, auto)',
                        gap: 2,
                        mb: 2,
                    }}
                >
                    {data &&
                        Object.keys(data).map((cat) => (
                            <Button
                                key={cat}
                                variant={
                                    cat === selectedCategory
                                        ? 'contained'
                                        : 'text'
                                }
                                onClick={() => setSelectedCategory(cat)}
                                sx={{
                                    // full-width inside its grid cell
                                    width: '100%',
                                    backgroundColor:
                                        cat === selectedCategory
                                            ? theme.background.lightPurple
                                            : 'transparent',
                                    color:
                                        cat === selectedCategory
                                            ? theme.fontColor.black
                                            : theme.background.lightPink,
                                    fontFamily: 'IBM Plex Mono',
                                    fontWeight: 600,
                                    ':focus': { outline: 'none' },
                                }}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </Button>
                        ))}
                </Box>
            </Box>

            {stats && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <StatusCard status="all" count={stats.count} />
                        <StatusCard
                            status="completed"
                            count={stats.succeeded}
                        />
                        <StatusCard status="failed" count={stats.failed} />
                    </Box>
                    <PieChart data={chartData} />
                </Box>
            )}
        </Box>
    )
}

export default AnalyticsReport

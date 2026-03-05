import { Box, CircularProgress, Typography } from '@mui/material'
import { format } from 'date-fns/format'
import { useEffect, useState } from 'react'
import { fetchTrafficReport } from '../../../api/dashboard.api'
import { CalendarPicker } from '../../../components/calendar-pickers'
import PeriodSelector from '../../../components/period-selector'
import { useTheme } from '../../../theme'
import { transformTrafficData } from '../../../utils/transform-traffic'
import { D3LineChart } from './d3-line-chart'

const mapFilterToType = (
    filter: 'By Day' | 'By Week' | 'By Year',
): 'day' | 'week' | 'year' => {
    switch (filter) {
        case 'By Day':
            return 'day'
        case 'By Week':
            return 'week'
        case 'By Year':
            return 'year'
        default:
            return 'day'
    }
}

export default function WebTraffic() {
    const today = format(new Date(), 'yyyy-MM-dd')
    const [currentDay, setCurrentDay] = useState<string>(today)
    const [filter, setFilter] = useState<'By Day' | 'By Week' | 'By Year'>(
        'By Day',
    )
    const [reportData, setReportData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const theme = useTheme()

    const handleFilterSelect = (selectedFilter: string) => {
        setFilter(selectedFilter as 'By Day' | 'By Week' | 'By Year')
    }

    const handleDateChange = (date: Date | null) => {
        if (date) {
            const formattedDate = format(date, 'yyyy-MM-dd')
            setCurrentDay(formattedDate)
        }
    }

    const handleFetchReport = async () => {
        setLoading(true)

        const MIN_LOAD_TIME = 1000
        const MAX_LOAD_TIME = 10000
        const startTime = Date.now()

        try {
            const fetchPromise = fetchTrafficReport({
                current_day: currentDay,
                type: mapFilterToType(filter),
            })

            const fetchWithTimeout = Promise.race([
                fetchPromise,
                new Promise<never>((_, reject) =>
                    setTimeout(
                        () => reject(new Error('Request timed out')),
                        MAX_LOAD_TIME,
                    ),
                ),
            ])

            const data = await fetchWithTimeout
            const fetchDuration = Date.now() - startTime
            const remainingTime = MIN_LOAD_TIME - fetchDuration

            if (remainingTime > 0) {
                await new Promise((resolve) =>
                    setTimeout(resolve, remainingTime),
                )
            }

            setReportData(transformTrafficData(data))
        } catch (error) {
            console.error('Error fetching traffic report:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (currentDay) {
            handleFetchReport()
        }
    }, [currentDay, filter])

    return (
        <Box
            padding={3.5}
            sx={{
                width: '100%',
                height: '100%',
                background:
                    'linear-gradient(to right, rgba(44,62,80,0.8) 20%,rgba(44,62,80,0) 70%)',
                borderRadius: 4,
            }}
        >
            <Typography
                gutterBottom
                sx={{
                    fontFamily: theme.typography.body2.fontFamily,
                    fontSize: '1.5em',
                    fontWeight: '700',
                    color: '#FBF46D',
                    textAlign: 'left',
                    mb: '1em',
                }}
            >
                WEB TRAFFIC
            </Typography>
            <Box
                sx={{
                    paddingBottom: '1em',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1em',
                }}
            >
                <PeriodSelector onFilterSelect={handleFilterSelect} />
                <CalendarPicker
                    filter={filter}
                    onDateChange={handleDateChange}
                />
                {loading && (
                    <CircularProgress
                        sx={{ display: 'block', margin: '0', color: '#EC994B' }}
                    />
                )}
            </Box>
            {reportData && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <D3LineChart data={reportData} width={1000} height={500} />
                </Box>
            )}
        </Box>
    )
}

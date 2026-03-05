import OverallStatistic from './overall-statistic';
import WebTraffic from './web-traffic';
import { fetchMediaReport, fetchPipelineReport } from '../../api/dashboard.api';
import AnalyticsReport from './analytics-status-reports';
import { Box } from '@mui/material';
import LollipopChart from './analytics-types-reports/lollipop-chart';
import PipelineAnnotation from '../dashboard/pipeline-annotation';
import { useEffect, useState } from 'react';
import { StatsResponse } from '../../types/stats';


const Dashboard = () => {
    const [mediaStats, setMediaStats] = useState<StatsResponse | null>(null);
    const [articleStats, setArticleStats] = useState<StatsResponse | null>(null);

    useEffect(() => {
        fetchMediaReport().then(setMediaStats);
        fetchPipelineReport().then(setArticleStats);
    }, []);

    return (
        <Box sx={{
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2em',
            px: '1em',
        }}>
            <OverallStatistic />
            <WebTraffic />
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2}>
                <AnalyticsReport
                    fetchReport={fetchMediaReport}
                    title="MEDIA REPORT"
                />

                {mediaStats && <LollipopChart data={mediaStats} width={500} height={300} />}
            </Box>
            <PipelineAnnotation />
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2}>
                <AnalyticsReport
                    fetchReport={fetchPipelineReport}
                    title="PIPELINE REPORT"
                />
                {articleStats && <LollipopChart data={articleStats} width={500} height={300} />}
            </Box>
        </Box>
    );
}

export default Dashboard;
import { Box } from '@mui/material';
import React from 'react';

interface Props {
    metrics: string[];
    current: string;
    onChange: (m: string) => void;
}

export const metricColorMap: Record<string, string> = {
    count: '#0096FF',
    succeeded: '#82CD47',
    failed: '#F44336',
}

const textMap: Record<string, string> = {
    count: 'All',
    succeeded: 'Completed',
    failed: 'Failed',
}

const MetricToggle: React.FC<Props> = ({ metrics, current, onChange }) => (
    <Box paddingTop={3.5} display="flex" gap={1}>
        {metrics.map(m => {
            const isActive = m === current;
            const color = metricColorMap[m] ?? '#111';

            return (

                <button
                    key={m}
                    onClick={() => onChange(m)}
                    style={{
                        flex: 1,
                        borderRadius: 4,
                        background: isActive ? color : 'transparent',
                        color: isActive ? '#FCFCFC' : color,
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9em',
                        transition: 'background 0.3s, color 0.3s',
                        fontFamily: 'Poppins, sans-serif',
                        border: 'none',
                        outline: 'none',
                        textAlign: 'center',
                    }}
                >
                    {textMap[m] ?? m}
                </button>

            );
        })}
    </Box>
);

export default MetricToggle;

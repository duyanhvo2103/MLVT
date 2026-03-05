import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { flattenStats, getMetrics } from '../../../../utils/transform-stats';
import MetricToggle from '../metric-toggle/index';
import { StatsResponse } from '../../../../types/stats';
import { Box } from '@mui/material';
import { metricColorMap } from '../metric-toggle/index';
import { smartCap } from '../../../../utils/string';

interface Props {
    data: StatsResponse;
    width?: number;
    height?: number;
}

const LollipopChart: React.FC<Props> = ({ data, width = 520, height = 240 }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    const metrics = getMetrics(data);
    const [metric, setMetric] = useState<string>(metrics[0]);

    /* flatten once per render */
    const flat = flattenStats(data);

    useEffect(() => {
        if (!svgRef.current) return;

        /* ---- scaffolding ---- */
        const margin = { top: 10, right: 40, bottom: 30, left: 90 };
        const iw = width - margin.left - margin.right;
        const ih = height - margin.top - margin.bottom;

        const x = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(flat, d => Number(d[metric])) || 0
            ])
            .nice()
            .range([0, iw]);

        const y = d3
            .scaleBand<string>()
            .domain(flat.map(d => d.media))
            .range([0, ih])
            .padding(0.5);

        const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);
        let g = svg.select<SVGGElement>('g#root');
        if (g.empty()) g = svg.append('g').attr('id', 'root');
        g.attr('transform', `translate(${margin.left},${margin.top})`);

        /* ---- axes ---- */
        const xAxis = d3.axisBottom(x)
            .ticks(5)
            .tickSizeOuter(0)
            .tickSizeInner(0)
            .tickPadding(10);
        const yAxis = d3.axisLeft(y)
            .tickSizeOuter(0)
            .tickSizeInner(0)
            .tickPadding(15)
            .tickFormat(d => smartCap(String(d)));

        // X-axis
        g.selectAll<SVGGElement, null>('.x-axis')
            .data([null])
            .join('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${ih})`)
            .transition()
            .duration(600)
            .style('font-family', 'Poppins, sans-serif')
            .style('font-size', '0.8em')
            .style('font-weight', '600')
            .style('fill', '#F0EBE3')
            .call(sel => (xAxis as any)(sel));

        // Y-axis
        g.selectAll<SVGGElement, null>('.y-axis')
            .data([null])
            .join('g')
            .attr('class', 'y-axis')
            .transition()
            .duration(600)
            .style('font-family', 'Poppins, sans-serif')
            .style('font-size', '0.8em')
            .style('font-weight', '600')
            .style('fill', '#F0EBE3')
            .call(sel => (yAxis as any)(sel));

        /* ---- stems ---- */
        const baseDotColor = metricColorMap[metric] ?? '#82CD47';

        /* build a stem color that’s ~40 % lighter & 50 % desaturated */
        const stemColor = (() => {
            if (baseDotColor === '#82CD47') return '#AAC8A7';
            if (baseDotColor === '#F44336') return '#F8B2B2';
            if (baseDotColor === '#0096FF') return '#A4C8E1';
            return '#CCCCCC';
        })();

        const stems = g
            .selectAll<SVGLineElement, typeof flat[number]>('.stem')
            .data(flat, d => d.media);

        stems
            .join(
                enter => enter.append('line').attr('class', 'stem').attr('x1', 0),
                update => update,
                exit => exit.transition().duration(600).attr('x2', 0).remove()
            )
            .transition()
            .duration(600)
            .attr('x1', 0)
            .attr('y1', d => y(d.media)! + y.bandwidth() / 2)
            .attr('x2', d => x(Number(d[metric])))
            .attr('y2', d => y(d.media)! + y.bandwidth() / 2)
            .attr('stroke', stemColor)
            .attr('stroke-width', 2);

        /* ---- dots ---- */
        const dots = g
            .selectAll<SVGCircleElement, typeof flat[number]>('.dot')
            .data(flat, d => d.media);

        dots
            .join(
                enter => enter.append('circle')
                    .attr('class', 'dot')
                    .attr('cy', d => y(d.media)! + y.bandwidth() / 2)
                    .attr('r', 0),
                update => update,
                exit => exit.transition().duration(600).attr('r', 0).remove()
            )
            .transition()
            .duration(600)
            .attr('cx', d => x(Number(d[metric])))          // ← cast to number
            .attr('cy', d => y(d.media)! + y.bandwidth() / 2)
            .attr('r', 6)
            .attr('fill', baseDotColor);

    }, [flat, metric, width, height]);

    return (
        <Box sx={{
            padding: '0',
            background: 'linear-gradient(to left, rgba(44,62,80,0.8) 40%,rgba(44,62,80,0.2) 70%)',
            borderRadius: 4,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <MetricToggle metrics={metrics} current={metric} onChange={setMetric} />
            <Box sx={{ flex: 1, width: '100%', height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                <svg ref={svgRef} width={width} height={height} />
            </Box>
        </Box>
    );
};

export default LollipopChart;

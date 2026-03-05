import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export interface PieData {
    label: string;
    value: number;
}

interface PieChartProps {
    data: PieData[];
    width?: number;
    height?: number;
}

const PieChart: React.FC<PieChartProps> = ({
    data,
    width = 350,
    height = 250,
}) => {
    const ref = useRef<SVGSVGElement | null>(null);
    const previousData = useRef<PieData[]>([]);

    useEffect(() => {
        if (!ref.current) return;

        // ─── 1. Clean-slate ──────────────────────────────────────────────────────────
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();

        // ─── 2. Derived geometry ────────────────────────────────────────────────────
        const margin = Math.min(width, height) * 0.05;
        const radius = Math.max(Math.min(width, height) / 2 - margin, 15);
        const innerRadius = radius * 0.75;
        const outerLabelR = radius + margin * 0.1;
        const total = d3.sum(data, d => d.value);

        // ─── 3. Generators ──────────────────────────────────────────────────────────
        const pie = d3
            .pie<PieData>()
            .value(d => d.value)
            .padAngle(0.04)
            .sort(null);

        const arc = d3
            .arc<d3.PieArcDatum<PieData>>()
            .innerRadius(innerRadius)
            .outerRadius(radius)
            .cornerRadius((radius - innerRadius) / 2);

        const outerArc = d3
            .arc<d3.PieArcDatum<PieData>>()
            .innerRadius(outerLabelR)
            .outerRadius(outerLabelR);

        const colour = d3
            .scaleOrdinal<string>()
            .range(['#D84040', '#6EACDA', '#9AE66E', '#fbbf24']);

        const midAngle = (d: d3.PieArcDatum<PieData>) =>
            d.startAngle + (d.endAngle - d.startAngle) / 2;

        // ─── 4. Root <g> translated to the true centre ──────────────────────────────
        const g = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr(
                'transform',
                `translate(${width / 2},${height / 2})`
            );

        // ─── 5. Slices with smoother transition ────────────────────────────────────
        const arcs = g.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('fill', d => colour(d.data.label))
            .style('cursor', 'pointer')
            .attr('stroke', '#fff')
            .attr('stroke-width', 0.5)
            .attr('d', arc as any);

        if (previousData.current.length > 0) {
            arcs.each(function (d, i) {
                const previous = pie(previousData.current)[i];
                if (previous) {
                    const startAngle = previous.startAngle;
                    d3.select(this)
                        .attr('d', arc({
                            ...d,
                            startAngle,
                            endAngle: startAngle 
                        }) as any)
                        .transition()
                        .duration(1000)
                        .ease(d3.easeExpOut)
                        .attrTween('d', function () {
                            const interpolate = d3.interpolate(
                                { startAngle, endAngle: startAngle },
                                d
                            );
                            return (t: number) => arc(interpolate(t)) as string;
                        });
                }
            });
        }

        // ─── 6. Centre total with smoother transition ────────────────────────────
        const centerText = g.append('g');

        const totalText = centerText.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '-0.2em')
            .style('font-size', '2.4rem')
            .style('fill', '#fff')
            .style('font-weight', 700)
            .style('font-family', 'Sora, Poppins, sans-serif');

        centerText.append('text')
            .text('projects')
            .attr('text-anchor', 'middle')
            .attr('dy', '1.2em')
            .style('font-size', '0.9rem')
            .style('fill', '#9ca3af')
            .style('font-weight', 500)
            .style('font-family', 'Sora, Poppins, sans-serif');

        // Animate total text
        totalText
            .transition()
            .duration(1200)
            .ease(d3.easeExpOut)
            .tween("text", function () {
                const previousTotal = d3.sum(previousData.current, d => d.value) || 0;
                const interpolator = d3.interpolateNumber(previousTotal, total);
                return function (t) {
                    totalText.text(Math.round(interpolator(t)).toString());
                };
            });

        // ─── 7. Leader lines with smoother transition ──────────────────────────────
        const polylines = g
            .selectAll<SVGPolylineElement, d3.PieArcDatum<PieData>>('polyline')
            .data(pie(data))
            .enter()
            .append('polyline')
            .attr('fill', 'none')
            .attr('stroke', '#9ca3af')
            .attr('stroke-width', 1)
            .style('opacity', 0)
            .attr('points', d => {
                const pos = outerArc.centroid(d);             
                const mid = arc.centroid(d);                  
                const off = outerLabelR * 0.15 *
                    (midAngle(d) < Math.PI ? 1 : -1); 
                const target: [number, number] = [pos[0] + off, pos[1]];

                // ► "x1,y1 x2,y2 x3,y3"
                return [mid, pos, target]
                    .map(p => p.join(','))   
                    .join(' ');              
            });


        // Animate polylines if we have previous data
        if (previousData.current.length > 0) {
            polylines.each(function (d, i) {
                const previous = pie(previousData.current)[i];
                if (previous) {
                    d3.select(this)
                        .attr('points', () => {
                            const pos = outerArc.centroid(previous);
                            const mid = arc.centroid(previous);
                            const off = outerLabelR * 0.15 * (midAngle(previous) < Math.PI ? 1 : -1);
                            const points = [
                                mid,
                                pos,
                                [pos[0] + off, pos[1]]
                            ];
                            return points.map(p => Array.isArray(p) ? p.join(',') : p).join(' ');
                        })
                        .transition()
                        .duration(1000)
                        .ease(d3.easeExpOut)
                        .attrTween('points', function () {
                            const interpolate = d3.interpolate(previous, d);
                            return (t: number) => {
                                const d = interpolate(t);
                                const pos = outerArc.centroid(d);
                                const mid = arc.centroid(d);
                                const off = outerLabelR * 0.15 * (midAngle(d) < Math.PI ? 1 : -1);
                                const points = [
                                    mid,
                                    pos,
                                    [pos[0] + off, pos[1]]
                                ];
                                return points.map(p => Array.isArray(p) ? p.join(',') : p).join(' ');
                            };
                        });
                }
            });
        }

        // ─── 8. % labels with smoother transition ──────────────────────────────────
        const labels = g
            .selectAll<SVGTextElement, d3.PieArcDatum<PieData>>('text.slice-label')
            .data(pie(data))
            .enter()
            .append('text')
            .attr('class', 'slice-label')
            .style('text-anchor', d => midAngle(d) < Math.PI ? 'start' : 'end')
            .style('alignment-baseline', 'middle')
            .style('font-size', '0.8rem')
            .style('fill', '#e5e7eb')
            .style('font-family', 'Sora, Poppins, sans-serif')
            .style('opacity', 0)
            .attr('transform', d => {
                const pos = outerArc.centroid(d);
                const off = outerLabelR * 0.18 * (midAngle(d) < Math.PI ? 1 : -1);
                pos[0] += off;
                return `translate(${pos})`;
            })
            .text(d => `${((d.data.value / total) * 100).toFixed(1)}%`);

        // Animate labels if we have previous data
        if (previousData.current.length > 0) {
            labels.each(function (d, i) {
                const previous = pie(previousData.current)[i];
                if (previous) {
                    const previousPos = outerArc.centroid(previous);
                    const previousOff = outerLabelR * 0.18 * (midAngle(previous) < Math.PI ? 1 : -1);
                    previousPos[0] += previousOff;

                    d3.select(this)
                        .attr('transform', `translate(${previousPos})`)
                        .text(`${((previous.data.value / d3.sum(previousData.current, dd => dd.value)) * 100).toFixed(1)}%`)
                        .transition()
                        .duration(1000)
                        .ease(d3.easeExpOut)
                        .attrTween('transform', function () {
                            const interpolate = d3.interpolate(previous, d);
                            return (t: number) => {
                                const d = interpolate(t);
                                const pos = outerArc.centroid(d);
                                const off = outerLabelR * 0.18 * (midAngle(d) < Math.PI ? 1 : -1);
                                pos[0] += off;
                                return `translate(${pos})`;
                            };
                        })
                        .tween('text', function () {
                            const node = this;
                            const previousValue = previous.data.value;
                            const previousTotal = d3.sum(previousData.current, dd => dd.value);
                            const startPercent = (previousValue / previousTotal) * 100;
                            const endPercent = (d.data.value / total) * 100;
                            const interpolator = d3.interpolateNumber(startPercent, endPercent);
                            return function (t) {
                                node.textContent = `${interpolator(t).toFixed(1)}%`;
                            };
                        });
                }
            });
        }

        // ─── 9. Hover interactions ─────────────────────────────────────────────────
        g.selectAll<SVGPathElement, d3.PieArcDatum<PieData>>('path')
            .on('mouseenter', function (_, d) {
                const i = d.index;
                polylines.filter((_, j) => j === i).style('opacity', 1);
                labels.filter((_, j) => j === i).style('opacity', 1);

                // Add subtle grow effect on hover
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('transform', 'scale(1.02)');
            })
            .on('mouseleave', () => {
                polylines.style('opacity', 0);
                labels.style('opacity', 0);

                // Reset scale
                g.selectAll('path')
                    .transition()
                    .duration(200)
                    .attr('transform', 'scale(1)');
            });

        // Store current data for next transition
        previousData.current = data;
    }, [data, width, height]);

    return <svg ref={ref} />;
};

export default PieChart;
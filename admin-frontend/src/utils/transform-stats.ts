import { StatsResponse } from '../types/stats';

export interface FlatDatum {
  media: string;                 
  [metric: string]: number | string;      
}

export function flattenStats(res: StatsResponse): FlatDatum[] {
  return Object.entries(res).map(([media, bucket]) => ({
    media,
    ...bucket,
  }));
}

export function getMetrics(res: StatsResponse): string[] {
  const first = Object.values(res)[0] ?? {};
  return Object.keys(first);
}

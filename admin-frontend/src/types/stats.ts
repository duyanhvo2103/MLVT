
export interface MediaBucket {
    [metric: string]: number;      // count, succeeded, failed, …
}

export type StatsResponse = Record<string, MediaBucket>;

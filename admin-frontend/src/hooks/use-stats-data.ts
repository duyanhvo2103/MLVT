import { useState, useEffect } from 'react';


export interface StatsData {
    count: number;
    succeeded: number;
    failed: number;
}
export type ApiResponse = Record<string, StatsData>;

interface UseStatsDataResult {
    data: ApiResponse | null;
    loading: boolean;
    error: Error | null;
}

export function useStatsData(
    fetcher: () => Promise<ApiResponse>
): UseStatsDataResult {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let canceled = false;
        async function load() {
            setLoading(true);
            try {
                const json = await fetcher();
                if (!canceled) setData(json);
            } catch (err) {
                if (!canceled) setError(err as Error);
            } finally {
                if (!canceled) setLoading(false);
            }
        }
        load();
        return () => { canceled = true; };
    }, [fetcher]);

    return { data, loading, error };
}
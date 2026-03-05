export interface TrafficItem {
    cell: string;
    value: number;
}

export interface TrafficApiResponse {
    count: number;
    traffic: TrafficItem[];
}

export const transformTrafficData = (
    resp: TrafficApiResponse,
): { date: string; value: number }[] => {
    return resp.traffic.map(( { cell, value }) => ({
        date: cell,
        value,
    }));
}
import baseApi from './base.api';

export interface TrafficReportPayload {
  current_day: string;
  type: 'By Day' | 'By Week' | 'By Year' | string;
}

export async function fetchTrafficReport(payload: TrafficReportPayload): Promise<any> {
  try {
    const response = await baseApi.post('/admin/2/monitor/traffic-report', payload);
    return response.data;
  } catch (error) {
    console.error('Error fetching traffic report:', error);
    throw error;
  }
}

export async function fetchPipelineReport() {
  try {
    const response = await baseApi.post('/admin/2/monitor/pipeline-report');
    console.log('Pipeline report response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching pipeline report:', error);
    throw error;
  }
}

export async function fetchMediaReport() {
  try {
    const response = await baseApi.post('/admin/2/monitor/media-report');
    console.log('Media report response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching media report:', error);
    throw error;
  }
}

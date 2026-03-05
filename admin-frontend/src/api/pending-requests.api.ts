import { PendingRequests } from "../types/pending-requets";
import apiClient from './base.api';

export const getAllPendingRequests = async(): Promise<PendingRequests[]> => {
    try {
        const response = await apiClient.get<PendingRequests[]>('/payment/pending');
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch pending requests: ${error}`);
    }
}

export const approvePendingRequest = async(requestId: string): Promise<void> => {
    try {
       await apiClient.post(`/payment/confirm/${requestId}`);
    } catch (error) {
        throw new Error(`Failed to approve pending request: ${error}`);
    }
}

export const cancelPendingRequest = async(requestId: string): Promise<void> => {
    try {
       await apiClient.post(`/payment/cancel/${requestId}`);
    } catch (error) {
        throw new Error(`Failed to approve pending request: ${error}`);
    }
}
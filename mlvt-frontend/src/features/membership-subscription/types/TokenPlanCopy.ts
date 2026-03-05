export type PlanId = 'standard' | 'monthly' | 'annual';

export interface PlanDetails {
    id: PlanId;
    title: string;
    price: number; 
    priceString: string; 
    period: string;
    perks: string[];
    priceColor?: string;
    buttonText: string;
    discount: number; 
}

export const PLANS_DATA: Record<PlanId, PlanDetails> = {
    standard: {
        id: 'standard',
        title: 'Standard Membership',
        price: 0,
        priceString: '$0',
        period: 'per month',
        perks: [
            'Access to basic features and tools',
            'Standard support',
            'Regular content updates',
            'Basic access to community features',
        ],
        buttonText: 'Get started',
        discount: 0,
    },
    monthly: {
        id: 'monthly',
        title: 'Monthly Membership',
        price: 15.99, 
        priceString: '$15.99', 
        period: 'per month',
        perks: [
            'Access to all premium features and tools',
            'Priority support',
            'Exclusive content and updates',
            'Ad-free experience',
        ],
        priceColor: '#8DC6FF', 
        buttonText: 'Subscribe now',
        discount: 2.01,
    },
    annual: {
        id: 'annual',
        title: 'Annual Membership',
        price: 159.99, 
        priceString: '$159.99',
        period: 'per year',
        perks: [
            'All features of Premium Membership',
            'Personalized support',
            'Early access to new features',
            'Exclusive community events',
        ],
        priceColor: '#8EAC50',
        buttonText: 'Subscribe now',
        discount: 30.00, 
    },
};
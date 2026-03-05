import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export type PlanType = 'MONTHLY PREMIUM' | 'ANNUAL PREMIUM'
export type SubscriptionSubView = 'planSummary' | 'purchasePlan' | null
interface SubscriptionPlanCardProps {
    remainingToken: number
    onClick?: () => void
    onManagePlanClick?: () => void
}

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
    remainingToken,
    onClick = () => {},
    onManagePlanClick = () => {},
}) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.tertiary.main,
                padding: 3,
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <Box>
                <Typography
                    sx={{
                        color: theme.palette.text.secondary,
                        fontSize: '0.8rem',
                        paddingBottom: 1,
                    }}
                >
                    Manage your Plan – Token wallet
                </Typography>

                <Typography
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        fontSize: '1.8rem',
                        paddingBottom: 1,
                    }}
                >
                    TOKEN WALLET
                </Typography>

                <Typography
                    sx={{
                        fontSize: '0.9rem',
                        color: theme.palette.text.primary,
                        marginTop: 1,
                    }}
                >
                    Remaining tokens
                </Typography>

                <Typography
                    sx={{
                        fontSize: '2.5rem',
                        color: theme.palette.text.primary,
                        marginTop: 1,
                    }}
                >
                    {remainingToken}
                </Typography>
            </Box>

            <Typography
                component={Link}
                to="/premium-plan"
                sx={{
                    fontSize: '0.85rem',
                    color: theme.palette.primary.main,
                    textAlign: 'right',
                    marginTop: 2,
                    '& span:hover': {
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    },
                }}
            >
                <span>View our purchase plan</span>
            </Typography>
        </Box>
    )
}

export default SubscriptionPlanCard

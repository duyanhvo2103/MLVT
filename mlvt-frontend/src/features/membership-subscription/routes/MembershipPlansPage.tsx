import { Box, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomLoadingDot from 'src/components/CustomLoadingDot'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { CustomButton } from '../../../components/CustomButton'
import HomePage from '../../../layout/HomePage'
import { getTokenPlans } from '../apis/tokenPlan.api'
import TokenPlanCard from '../components/TokenPlanCard'
import { TokenPlan } from '../types/TokenPlan'

const MembershipPlansPage: React.FC = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [plans, setPlans] = useState<TokenPlan[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const { data } = useGetUserDetails()
    const user = data?.user

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await getTokenPlans()
                setPlans(data)
            } catch (e: any) {
                setError(e.message || 'Failed to fetch membership plans.')
                console.error('Fetch error:', e)
            } finally {
                setLoading(false)
            }
        }

        fetchPlans()
    }, [])

    const handleBuyClick = (plan: TokenPlan) => {
        if (!user?.id) {
            alert('Please log in to make a purchase.')
            return
        }
        navigate(`/checkout/${plan.option}`, { state: { plan } })
    }

    const renderContent = () => {
        if (loading) {
            return (
                <Box display="flex" justifyContent="center" my={10}>
                    <CustomLoadingDot />
                </Box>
            )
        }

        if (error) {
            return (
                <Typography color="error" align="center" my={10}>
                    Could not load membership plans. Please try again later.
                </Typography>
            )
        }
        return (
            <Box
                display="flex"
                flexDirection="row"
                alignItems="stretch"
                justifyContent="center"
                flexWrap="wrap"
                gap={8}
            >
                {plans.map((plan) => (
                    <TokenPlanCard
                        key={plan.option}
                        option={plan.option}
                        token_amount={plan.token_amount}
                        onButtonClick={() => handleBuyClick(plan)}
                    />
                ))}
            </Box>
        )
    }

    return (
        <HomePage>
            <Box p={8}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        marginBottom: 10,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 550,
                            fontSize: '1rem',
                            color: '#E79CC2',
                        }}
                    >
                        Pricing
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 550,
                            fontSize: '2.5rem',
                            color: theme.palette.primary.main,
                        }}
                    >
                        Membership Plans
                    </Typography>
                </Box>

                {renderContent()}
            </Box>
            <Box
                sx={{
                    background:
                        'linear-gradient(to left, #FFE1FF,#ECECEC, #D69ADE)',
                    paddingY: 8,
                    paddingX: 4,
                    marginY: 4,
                    marginBottom: 13,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    display={'flex'}
                    flexDirection="column"
                    alignItems="flex-start"
                    gap={2}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 450,
                            fontSize: '1.2rem',
                            color: '#001D57',
                        }}
                    >
                        Start your journey with fascinating
                        <span
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 600,
                                fontSize: '1.5rem',
                                marginInline: '0.5rem',
                            }}
                        >
                            90-day
                        </span>
                        free trial.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 400,
                            fontSize: '0.88rem',
                            color: 'black',
                        }}
                    >
                        Experience our service - Global Voices, Seamless
                        Transitions
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <CustomButton
                        text="Learn more"
                        loading={false}
                        onClick={() => {
                            console.log('Learn more about membership')
                        }}
                        sx={{
                            bgcolor: 'white',
                            border: '1px solid #001D57',
                            color: '#001D57',
                        }}
                    />
                    <CustomButton
                        text="Get started"
                        loading={false}
                        onClick={() => {
                            console.log('Learn more about membership')
                        }}
                        sx={{
                            bgcolor: '#001D57',
                            color: 'white',
                        }}
                    />
                </Box>
            </Box>
        </HomePage>
    )
}
export default MembershipPlansPage

import CreditCardIcon from '@mui/icons-material/CreditCard'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import ReceiptIcon from '@mui/icons-material/Receipt'
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import UploadNotification from '../../../../components/UploadNotification'
import { useAuth } from '../../../../contexts/AuthContext'
import { getWalletBalance } from '../../apis/wallet.api'
import OrderHistory from './components/OrderHistory'
import { RedeemCode } from './components/RedeemCode'
import SubscriptionPlanCard from './components/SubscriptionPlanCard'
import PaymentPlan from './components/SubscriptionPlanCard/components/PaymentPlan'
import PlanSummaryCard from './components/SubscriptionPlanCard/components/PlanSummaryCard'

interface ErrNoti {
    isOpen: boolean
    status: 'fail' | 'success'
    content: string
}
interface ActionCardProps {
    icon: ReactNode
    label: string
    onClick: () => void
}

const listItemCommonSx = {
    cursor: 'pointer',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
}

const ActionCard: React.FC<ActionCardProps> = ({ icon, label, onClick }) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.tertiary.main,
                padding: 3,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%',
                textAlign: 'center',
                cursor: 'pointer',
            }}
            onClick={onClick}
        >
            {/* icon is passed in already sized & colored */}
            {icon}
            <Typography
                sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                {label}
            </Typography>
        </Box>
    )
}

type PlanManagementTabKey = 'planSummary' | 'paymentPlan' | 'backToVoucher'

const PLAN_MANAGEMENT_TABS: {
    key: PlanManagementTabKey
    label: string
    icon: React.ReactNode
}[] = [
    { key: 'planSummary', label: 'Plan Summary', icon: <ReceiptIcon /> },
    { key: 'paymentPlan', label: 'Payment Plan', icon: <CreditCardIcon /> },
    {
        key: 'backToVoucher',
        label: 'Back to Voucher',
        icon: <KeyboardReturnIcon />,
    },
]

const TokenWallet: React.FC = () => {
    const theme = useTheme()
    type ViewType =
        | 'subscription'
        | 'orderHistory'
        | 'redeemCode'
        | 'planManagement'
    const [currentView, setCurrentView] = useState<ViewType>('subscription')
    const [activePlanTab, setActivePlanTab] =
        useState<PlanManagementTabKey>('planSummary')
    const [errNoti, setErrNoti] = useState<ErrNoti>({
        isOpen: false,
        status: 'success',
        content: '',
    })

    const { remainingToken, SetRemainingToken } = useAuth()
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''

    /* ------------------ callbacks ------------------ */
    const handleViewChange = (view: ViewType) => {
        setCurrentView(view)
        if (view === 'planManagement') {
            setActivePlanTab('planSummary') // Default to summary when entering this view
        }
    }
    const handleCloseNotiPopup = () =>
        setErrNoti((prev) => ({ ...prev, isOpen: false }))

    const handlePlanTabClick = (tabKey: PlanManagementTabKey) => {
        if (tabKey === 'backToVoucher') {
            setCurrentView('subscription')
        } else {
            setActivePlanTab(tabKey)
        }
    }

    const handleUpdatePaymentMethod = () => {
        setActivePlanTab('paymentPlan')
    }

    /* ------------------ data load ------------------ */
    useEffect(() => {
        const fetchWalletBalance = async () => {
            if (userId) {
                try {
                    const walletBalance = await getWalletBalance(userId)
                    SetRemainingToken(walletBalance)
                } catch {
                    setErrNoti({
                        isOpen: true,
                        status: 'fail',
                        content: 'Cannot fetch wallet balance',
                    })
                }
            }
        }
        if (currentView === 'subscription' && userId) {
            fetchWalletBalance()
        }
    }, [userId, SetRemainingToken, currentView])

    /* ------------------ early-returns ------------------ */

    if (currentView === 'orderHistory')
        return (
            <OrderHistory
                handleChangeView={() => handleViewChange('subscription')}
                userId={typeof userId === 'number' ? userId : Number(userId)}
            />
        )
    if (currentView === 'redeemCode')
        return (
            <RedeemCode
                handleChangeView={() => handleViewChange('subscription')}
            />
        )

    if (currentView === 'planManagement') {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingX: 4,
                    height: '100%',
                    gap: 2,
                    width: '90%',
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            fontSize: '2rem',
                            fontFamily: 'Poppins, sans-serif',
                            mt: 5,
                            mb: 0.5,
                        }}
                    >
                        Manage Subscription
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            mt: 0.5,
                            mb: 4,
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        View details or return to wallet.
                    </Typography>

                    <List
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: theme.spacing(1.5),
                            padding: 0,
                            width: '100%',
                            overflowX: 'auto',
                            marginBottom: theme.spacing(2),
                        }}
                    >
                        {PLAN_MANAGEMENT_TABS.map(({ key, label, icon }) => {
                            const isActive =
                                activePlanTab === key && key !== 'backToVoucher'

                            return (
                                <ListItem
                                    key={key}
                                    onClick={() => handlePlanTabClick(key)}
                                    sx={{
                                        ...listItemCommonSx,
                                        backgroundColor: isActive
                                            ? theme.palette.primary.main
                                            : 'transparent',
                                        ...(key === 'backToVoucher' && {
                                            marginTop: 'auto',
                                        }), // Push back button down if desired, or style differently
                                    }}
                                >
                                    <ListItemIcon>
                                        {React.cloneElement(
                                            icon as React.ReactElement,
                                            {
                                                sx: {
                                                    color: isActive
                                                        ? theme.palette
                                                              .secondary.main
                                                        : theme.palette.text
                                                              .disabled,
                                                },
                                            },
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={label}
                                        sx={{
                                            color: isActive
                                                ? theme.palette.secondary.main
                                                : theme.palette.text.disabled,
                                            '& .MuiTypography-root': {
                                                fontFamily: 'inherit',
                                            },
                                        }}
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>

                <Box sx={{ flex: 1, overflowY: 'auto' }}>
                    {activePlanTab === 'planSummary' && (
                        <>
                            <PlanSummaryCard
                                nextChargeDate={
                                    new Date(
                                        Date.now() + 30 * 24 * 60 * 60 * 1000,
                                    )
                                }
                                nextChargeAmount={remainingToken}
                                benefits={[
                                    'Benefit 1',
                                    'Benefit 2',
                                    'Benefit 3',
                                ]}
                                paymentMethod="Credit Card"
                                paymentLogo={
                                    <CreditCardIcon
                                        sx={{
                                            fontSize: '2rem',
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                }
                                onUpdatePaymentClick={handleUpdatePaymentMethod}
                            />
                        </>
                    )}
                    {activePlanTab === 'paymentPlan' && <PaymentPlan />}
                </Box>
            </Box>
        )
    }
    if (errNoti.isOpen) {
        return (
            <UploadNotification
                isOpen={errNoti.isOpen}
                onClose={handleCloseNotiPopup}
                status={errNoti.status}
                content={errNoti.content}
                okButtonVisible
                navigateStorage={false}
            />
        )
    }

    /* ------------------ render ------------------ */
    return (
        <Box sx={{ padding: 4 }}>
            {/* header */}
            <Typography
                sx={{
                    mb: 1,
                    fontWeight: 600,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '2rem',
                    color: theme.palette.primary.main,
                }}
            >
                Your Token Wallet
            </Typography>
            <Typography
                sx={{
                    mb: 4,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    color: theme.palette.text.secondary,
                }}
            >
                Manage your token and redeem-code history in a convenient way
            </Typography>

            {/* content */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Box width="75%">
                    <SubscriptionPlanCard
                        remainingToken={remainingToken}
                        onManagePlanClick={() =>
                            handleViewChange('planManagement')
                        }
                    />
                </Box>

                {/* right : two action cards */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        flexGrow: 1,
                    }}
                >
                    <ActionCard
                        icon={
                            <ReceiptIcon
                                sx={{
                                    fontSize: '2rem',
                                    color: theme.palette.primary.main,
                                    mb: 1,
                                }}
                            />
                        }
                        label="Order History"
                        onClick={() => handleViewChange('orderHistory')}
                    />
                    <ActionCard
                        icon={
                            <CreditCardIcon
                                sx={{
                                    fontSize: '2rem',
                                    color: theme.palette.primary.main,
                                    mb: 1,
                                }}
                            />
                        }
                        label="Redeem Code"
                        onClick={() => handleViewChange('redeemCode')}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default TokenWallet

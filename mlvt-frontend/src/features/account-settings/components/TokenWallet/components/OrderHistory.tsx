import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CircleIcon from '@mui/icons-material/Circle'
import {
    Box,
    CircularProgress,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import {
    getUserPayments,
    PaymentHistory,
} from 'src/features/account-settings/apis/payment-history.api'

const headerStyle = {
    fontWeight: '600',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.9rem',
}

const cellStyle = {
    fontWeight: '400',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.85rem',
}

interface orderHistoryProps {
    handleChangeView: (view: string) => void
    userId: number
}

const OrderHistory: React.FC<orderHistoryProps> = ({
    handleChangeView,
    userId,
}) => {
    const theme = useTheme()
    // State to hold payment history, loading status, and errors
    const [payments, setPayments] = useState<PaymentHistory[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // pagination
    const rowsPerPage = 10
    const [page, setPage] = useState(1)
    const pageCount = Math.ceil(payments.length / rowsPerPage)

    useEffect(() => {
        setPage(1)
    }, [payments])

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchPaymentHistory = async () => {
            if (!userId) {
                setError('User not identified.')
                setIsLoading(false)
                return
            }

            try {
                const data = await getUserPayments(userId)
                setPayments(data)
            } catch (err) {
                console.error('Failed to fetch payment history:', err)
                setError(
                    'Could not load your order history. Please try again later.',
                )
            } finally {
                setIsLoading(false)
            }
        }

        fetchPaymentHistory()
    }, [userId]) // Re-run the effect if the userId changes

    // Updated function to handle new statuses from the API
    const getStatusChip = (status: PaymentHistory['status']) => {
        let color
        switch (status) {
            case 'completed':
                color = theme.palette.success.main
                break
            case 'failed':
                color = theme.palette.error.main
                break
            case 'pending':
                color = theme.palette.warning.main
                break
            case 'canceled':
                color = theme.palette.text.secondary
                break
            default:
                color = theme.palette.text.disabled
        }

        const capitalizedStatus =
            status.charAt(0).toUpperCase() + status.slice(1)

        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircleIcon
                    sx={{ color, fontSize: 'small', marginRight: 0.5 }}
                />
                <Typography sx={cellStyle}>{capitalizedStatus}</Typography>
            </Box>
        )
    }

    // Display a loading spinner while fetching data
    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4,
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <CircularProgress />
                <Typography>Loading Order History...</Typography>
            </Box>
        )
    }

    // Display an error message if the API call fails
    if (error) {
        return (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
                <Typography color="error">{error}</Typography>
            </Box>
        )
    }

    const startIdx = (page - 1) * rowsPerPage
    const paginated = payments.slice(startIdx, startIdx + rowsPerPage)

    return (
        <Box sx={{ padding: 4 }}>
            <Typography
                sx={{
                    mb: 1,
                    fontWeight: 600,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '2rem',
                    color: theme.palette.primary.main,
                }}
            >
                Order History
            </Typography>
            <Typography
                sx={{
                    mb: 6,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    color: theme.palette.text.secondary,
                }}
            >
                Your order history is saved and displayed here
            </Typography>
            {payments.length > 0 ? (
                <>
                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{ border: 0 }}
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={headerStyle}>
                                        Date Issued
                                    </TableCell>
                                    <TableCell sx={headerStyle}>
                                        Transaction ID
                                    </TableCell>
                                    <TableCell sx={headerStyle}>
                                        Package
                                    </TableCell>
                                    <TableCell sx={headerStyle}>
                                        VND Amount
                                    </TableCell>
                                    <TableCell sx={headerStyle}>
                                        Token Retrieved
                                    </TableCell>
                                    <TableCell sx={headerStyle}>
                                        Status
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Map over the fetched payment data */}
                                {paginated.map((payment) => (
                                    <TableRow
                                        key={payment.id}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell sx={cellStyle}>
                                            {new Date(
                                                payment.updated_at,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell sx={cellStyle}>
                                            {payment.transaction_id}
                                        </TableCell>
                                        <TableCell sx={cellStyle}>
                                            {payment.payment_option}
                                        </TableCell>
                                        <TableCell sx={cellStyle}>
                                            {payment.vnd_amount.toLocaleString(
                                                'vi-VN',
                                                {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                },
                                            )}
                                        </TableCell>
                                        <TableCell sx={cellStyle}>
                                            {payment.token_amount.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusChip(payment.status)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination controls */}
                    {pageCount > 1 && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 2,
                            }}
                        >
                            <Pagination
                                count={pageCount}
                                page={page}
                                onChange={(_, value) => setPage(value)}
                                color="primary"
                            />
                        </Box>
                    )}
                </>
            ) : (
                <Typography
                    sx={{
                        color: 'gray',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1rem',
                        fontWeight: 500,
                        textAlign: 'center',
                        marginTop: '2rem',
                        marginBottom: '2rem',
                    }}
                >
                    No orders found.
                </Typography>
            )}
            <Typography
                onClick={() => handleChangeView('subscription')}
                sx={{
                    marginTop: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: '500',
                    mb: 2,
                    fontFamily: 'Poppins, sans-serif',
                    '&:hover': {
                        textDecoration: 'underline',
                        color: theme.palette.primary.main,
                    },
                }}
            >
                <ArrowBackIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
                Back
            </Typography>
        </Box>
    )
}

export default OrderHistory

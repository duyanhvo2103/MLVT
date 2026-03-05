import {
    Alert,
    AlertColor,
    Box,
    CircularProgress,
    Snackbar,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import {
    approvePendingRequest,
    cancelPendingRequest,
    getAllPendingRequests,
} from '../../api/pending-requests.api'
import { PendingRequests } from '../../types/pending-requets'
import PendingRequestsTable from './pending-requests-table'

const PendingRequestsPage = () => {
    const [requests, setRequests] = useState<PendingRequests[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // --- 1. State for the Snackbar ---
    const [snackbar, setSnackbar] = useState<{
        open: boolean
        message: string
        severity: AlertColor // 'success' | 'error' | 'info' | 'warning'
        reloadOnClose?: boolean
    } | null>(null)

    useEffect(() => {
        // Define an async function to fetch data
        const fetchRequests = async () => {
            try {
                setLoading(true) // Set loading to true before the API call
                setError(null) // Clear any previous errors

                const data = await getAllPendingRequests()
                console.log('Fetched requests:', data) // Log the fetched data
                setRequests(data)
            } catch (err) {
                // If the API call throws an error, catch it
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError(
                        'An unexpected error occurred while fetching data.',
                    )
                }
            } finally {
                // This will run after the try or catch block is finished
                setLoading(false)
            }
        }

        fetchRequests() // Call the function
    }, [])

    // --- 2. Updated Action Handlers ---
    const handleApproveRequest = async (requestId: string) => {
        console.log(`Approving request with ID: ${requestId}`)
        try {
            await approvePendingRequest(requestId)
            setSnackbar({
                open: true,
                message: 'Request approved successfully!',
                severity: 'success',
            })
        } catch (error) {
            console.error('Error approving request:', error)
        }
    }

    const handleRejectRequest = async (requestId: string) => {
        console.log(`Rejecting request with ID: ${requestId}`)
        try {
            await cancelPendingRequest(requestId)
            setSnackbar({
                open: true,
                message: 'Request has been rejected.',
                severity: 'error',
            })
        } catch (error) {
            console.error('Error approving request:', error)
        }
    }

    // --- 3. Handler to close the Snackbar ---
    const handleCloseSnackbar = () => {
        setSnackbar(null)
        window.location.reload()
    }

    const renderContent = () => {
        // 1. Show a loading spinner while fetching data
        if (loading) {
            return (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '50vh' }}
                >
                    <CircularProgress sx={{ color: 'white' }} />
                    <Typography sx={{ color: 'white', ml: 2 }}>
                        Loading Requests...
                    </Typography>
                </Box>
            )
        }

        // 2. Show an error message if the API call failed
        if (error) {
            return (
                <Alert
                    severity="error"
                    sx={{
                        mt: 4,
                        mx: 'auto',
                        maxWidth: '600px',
                        backgroundColor: '#5c3c3c',
                        color: 'white',
                    }}
                >
                    {error}
                </Alert>
            )
        }

        // 3. Show a message if there are no requests to display
        if (!requests.length) {
            return (
                <Typography
                    align="center"
                    sx={{ color: '#ccc', mt: 5, fontStyle: 'italic' }}
                >
                    No pending requests found.
                </Typography>
            )
        }

        // 4. If everything is fine, show the table
        return (
            <PendingRequestsTable
                requests={requests}
                onApprove={handleApproveRequest}
                onReject={handleRejectRequest}
            />
        )
    }

    return (
        <Box>
            <Typography
                variant="h4"
                align="center"
                sx={{
                    color: 'white',
                    mb: 3,
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                Pending Membership Requests
            </Typography>

            {/* Render the content based on the current state */}
            {renderContent()}

            {/* The Snackbar for user feedback remains unchanged */}
            {snackbar && (
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: '100%', fontWeight: 600 }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    )
}

export default PendingRequestsPage

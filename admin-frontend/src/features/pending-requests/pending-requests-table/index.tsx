import {
    Box,
    Button,
    Chip,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
} from '@mui/material'
import React, { useState } from 'react'
import { PendingRequests } from '../../../types/pending-requets'

// --- Type Definitions ---
// Define the possible statuses for a request
export type RequestStatus = 'pending' | 'approved' | 'rejected'

// Props for our new component
interface PendingRequestsTableProps {
    requests: PendingRequests[]
    onApprove: (requestId: string) => void
    onReject: (requestId: string) => void
}

// --- Style Constants (reused and adapted from your original component) ---

// Map statuses to colors for the Chip component
const statusColors: Record<RequestStatus, string> = {
    pending: '#ffc107', // Yellow
    approved: '#4caf50', // Green
    rejected: '#f44336', // Red
}

const headerStyle = {
    color: '#ECDFCC',
    borderBottom: 'none',
    fontWeight: 600,
    padding: '20px 30px 6px 30px',
    fontSize: '0.9rem',
    fontFamily: 'Poppins, sans-serif',
}

const cellStyle = {
    color: 'white',
    borderBottom: 'none',
    padding: '6px 30px',
    fontSize: '0.8em',
    fontFamily: 'Poppins, sans-serif',
    verticalAlign: 'middle',
}

const footerStyle = {
    color: '#F0EB8D',
    padding: '20px 24px 20px 24px',
    fontSize: '0.875rem',
    textAlign: 'left',
    fontWeight: 500,
    fontFamily: 'Poppins, sans-serif',
}

// --- The Component ---

const PendingRequestsTable: React.FC<PendingRequestsTableProps> = ({
    requests,
    onApprove,
    onReject,
}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const requestsPerPage = 8
    const pageCount = Math.ceil(requests.length / requestsPerPage)

    // Pagination logic
    const indexOfLastRequest = currentPage * requestsPerPage
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage
    const currentRequests = requests.slice(
        indexOfFirstRequest,
        indexOfLastRequest,
    )

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
    }

    return (
        <Box p={3} sx={{ backgroundColor: 'transparent', border: 'none' }}>
            <TableContainer
                component={Paper}
                sx={{
                    backgroundColor: 'transparent',
                    border: '0.6px solid white',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    width: '100%',
                }}
            >
                <Table sx={{ width: '100%', border: 'none' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={headerStyle}>User ID</TableCell>
                            <TableCell sx={headerStyle}>
                                Transaction ID
                            </TableCell>
                            <TableCell sx={headerStyle}>Created At</TableCell>
                            <TableCell sx={headerStyle} align="right">
                                Token Amount
                            </TableCell>
                            <TableCell sx={headerStyle} align="right">
                                VND Amount
                            </TableCell>
                            <TableCell sx={headerStyle}>Status</TableCell>
                            <TableCell sx={headerStyle} align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRequests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell sx={cellStyle}>
                                    {request.user_id}
                                </TableCell>
                                <TableCell sx={cellStyle}>
                                    {request.transaction_id}
                                </TableCell>
                                <TableCell sx={cellStyle}>
                                    {request.created_at}
                                </TableCell>
                                <TableCell
                                    sx={{ ...cellStyle, textAlign: 'right' }}
                                >
                                    {request.token_amount.toLocaleString()}
                                </TableCell>
                                <TableCell
                                    sx={{ ...cellStyle, textAlign: 'right' }}
                                >
                                    {request.vnd_amount.toLocaleString(
                                        'vi-VN',
                                        {
                                            style: 'currency',
                                            currency: 'VND',
                                        },
                                    )}
                                </TableCell>
                                <TableCell sx={cellStyle}>
                                    <Chip
                                        label={request.status.toUpperCase()}
                                        sx={{
                                            color: statusColors[request.status],
                                            borderColor:
                                                statusColors[request.status],
                                            borderWidth: '1.5px',
                                            fontWeight: 700,
                                            minWidth: '90px',
                                            fontFamily: 'Poppins, sans-serif',
                                        }}
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell sx={cellStyle} align="center">
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        justifyContent="center"
                                    >
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            onClick={() =>
                                                onApprove(
                                                    request.transaction_id,
                                                )
                                            }
                                            sx={{
                                                fontFamily:
                                                    'Poppins, sans-serif',
                                                textTransform: 'none',
                                            }}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() =>
                                                onReject(request.transaction_id)
                                            }
                                            sx={{
                                                fontFamily:
                                                    'Poppins, sans-serif',
                                                textTransform: 'none',
                                            }}
                                        >
                                            Reject
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter
                        sx={{
                            '& .MuiTableCell-root': { borderBottom: 'none' },
                        }}
                    >
                        <TableRow>
                            <TableCell sx={footerStyle} colSpan={6}>
                                Total: {requests.length} request(s) across all
                                pages
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                p={2}
                sx={{ borderBottom: 'none' }}
            >
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: 'white',
                            backgroundColor: 'transparent',
                            borderRadius: 2,
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.8em',
                            fontWeight: 600,
                        },
                        '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: 'white',
                            color: 'black',
                            '&:hover': { backgroundColor: 'white' },
                        },
                        '& .MuiPaginationItem-previousNext': { color: 'white' },
                    }}
                />
            </Box>
        </Box>
    )
}

export default PendingRequestsTable

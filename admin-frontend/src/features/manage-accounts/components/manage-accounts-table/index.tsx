import EditIcon from '@mui/icons-material/Edit'
import {
    Box,
    Chip,
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
} from '@mui/material'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { ListUser } from '../../../../types/user'

export type AccountStatus = 'ACTIVE' | 'DELETED' | 'SUSPENDED'

const brightColors: Record<AccountStatus, string> = {
    ACTIVE: '#4caf50',
    DELETED: '#f44336',
    SUSPENDED: '#ffc107',
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
    align: 'left',
}

const footerStyle = {
    color: '#F0EB8D',
    padding: '20px 24px 20px 24px',
    fontSize: '0.875rem',
    textAlign: 'left',
    fontWeight: 500,
    colSpan: 6,
    fontFamily: 'Poppins, sans-serif',
}

interface ManageAccountsTableProps extends ListUser {
    onEdit: (userId: number) => void
}

const ManageAccountsTable: React.FC<ManageAccountsTableProps> = ({
    users,
    onEdit,
}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const accountsPerPage = 10
    const pageCount = Math.ceil(users.length / accountsPerPage)

    // Get current accounts to display
    const indexOfLastAccount = currentPage * accountsPerPage
    const indexOfFirstAccount = indexOfLastAccount - accountsPerPage
    const currentAccounts = users.slice(indexOfFirstAccount, indexOfLastAccount)

    const handlePageChange = (
        _: React.ChangeEvent<unknown>,
        page: number,
    ) => {
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
                            <TableCell sx={headerStyle}>Edit</TableCell>
                            <TableCell sx={headerStyle}>ID</TableCell>
                            <TableCell sx={headerStyle}>Username</TableCell>
                            <TableCell sx={headerStyle}>Fullname</TableCell>
                            <TableCell sx={headerStyle}>Created date</TableCell>
                            <TableCell sx={headerStyle}>Role</TableCell>
                            <TableCell sx={headerStyle}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentAccounts.map((user, index) => {
                            const isDeleted = user.status === 'DELETED'
                            return (
                                <TableRow key={index}>
                                    <TableCell sx={cellStyle}>
                                        <IconButton
                                            sx={{
                                                color: 'white',
                                                '&.Mui-disabled': {
                                                    color: 'white',
                                                    opacity: 0.4,
                                                },
                                            }}
                                            onClick={() => onEdit(user.id)}
                                            disabled={isDeleted}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell sx={cellStyle}>
                                        {user.id}
                                    </TableCell>
                                    <TableCell sx={cellStyle}>
                                        {user.username}
                                    </TableCell>
                                    <TableCell sx={cellStyle}>
                                        {user.first_name + ' ' + user.last_name}
                                    </TableCell>
                                    <TableCell sx={cellStyle}>
                                        {dayjs(user.created_at).format(
                                            'DD MMM YYYY HH:mm',
                                        )}
                                    </TableCell>
                                    <TableCell sx={cellStyle}>
                                        {user.role}
                                    </TableCell>
                                    <TableCell sx={cellStyle}>
                                        <Chip
                                            label={user.status}
                                            sx={{
                                                color: brightColors[
                                                    user.status as AccountStatus
                                                ],
                                                borderColor:
                                                    brightColors[
                                                        user.status as AccountStatus
                                                    ],
                                                borderWidth: '1.5px',
                                                fontWeight: 700,
                                                minWidth: '80px',
                                                fontFamily:
                                                    'Poppins, sans-serif',
                                            }}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter
                        sx={{
                            '& .MuiTableCell-root': {
                                borderBottom: 'none',
                            },
                        }}
                    >
                        <TableRow>
                            <TableCell sx={footerStyle} colSpan={7}>
                                Total: {users.length} account(s) across all
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
                            '&:hover': {
                                backgroundColor: 'white',
                            },
                        },
                        '& .MuiPaginationItem-previousNext': {
                            color: 'white',
                        },
                    }}
                />
            </Box>
        </Box>
    )
}

export default ManageAccountsTable

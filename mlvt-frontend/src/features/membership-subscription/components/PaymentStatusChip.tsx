import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { Chip } from '@mui/material'

type PaymentStatus = 'pending' | 'completed' | 'failed' | 'canceled'

interface PaymentStatusChipProps {
    status: PaymentStatus
}

const PaymentStatusChip: React.FC<PaymentStatusChipProps> = ({ status }) => {
    const statusConfig = {
        completed: {
            label: 'Completed',
            color: 'success',
            icon: <CheckCircleOutlineIcon fontSize="small" />,
        },
        pending: {
            label: 'Pending',
            color: 'info',
            icon: <HourglassEmptyIcon fontSize="small" />,
        },
        failed: {
            label: 'Failed',
            color: 'error',
            icon: <ErrorOutlineIcon fontSize="small" />,
        },
        canceled: {
            label: 'Canceled',
            color: 'default',
            icon: <CancelOutlinedIcon fontSize="small" />,
        },
    }

    const config = statusConfig[status]

    if (!config) {
        return <Chip label={status} size="small" variant="outlined" />
    }

    return (
        <Chip
            label={config.label}
            color={config.color as 'success' | 'info' | 'error' | 'default'}
            icon={config.icon}
            size="small"
            sx={{ fontWeight: 500 }}
        />
    )
}

export default PaymentStatusChip

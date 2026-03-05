import { CurrencyExchange, Groups2, OnlinePrediction, Stream } from "@mui/icons-material"
import DateRangePicker from "../../../components/date-range-picker"
import { Box } from "@mui/material"
import StatCard from "./stat-card"

const OverallStatistic = () => {
    return (
        <Box gap={1}>
            <Box display="flex" gap={2} mb={2} >
                <DateRangePicker />
            </Box>
            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-between">
                <StatCard
                    icon={<span><Groups2 sx={{ fontSize: '3.5em' }}/></span>}
                    title="TOTAL USERS"
                    value="1,234"
                    percentage="+5%"
                    description="from last month"
                    isPositive={true}
                />
                <StatCard
                    icon={<span><Stream sx={{ fontSize: '3.5em' }}/></span>}
                    title="TOTAL USAGES"
                    value="567"
                    percentage="-2%"
                    description="from last month"
                    isPositive={false}
                />
                <StatCard
                    icon={<span><CurrencyExchange sx={{ fontSize: '3.5em' }}/></span>}
                    title="REVENUE"
                    value="89"
                    percentage="+10%"
                    description="from last month"
                    isPositive={true}
                />
                <StatCard
                    icon={<span><OnlinePrediction sx={{ fontSize: '3.5em' }}/></span>}
                    title="ONLINE"
                    value="123"
                    percentage="-1%"
                    description="from last month"
                    isPositive={false}
                />
            </Box>
        </Box>
    )
}

export default OverallStatistic;
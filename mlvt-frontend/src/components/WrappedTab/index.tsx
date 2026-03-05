import { Tab, Tabs } from '@mui/material'
import { styled } from '@mui/material/styles'

export const WrappedTabs = styled(Tabs)({
    '& .MuiTabs-flexContainer': {
        flexWrap: 'wrap',
    },
    '& .MuiTabs-scrollButtons': {
        display: 'none',
    },
    '& .MuiTabs-indicator': {
        display: 'none',
    },
})

export const WrappedTab = styled(Tab)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(0.5),
    '&:hover': {
        // Target the hover state
        borderColor: theme.palette.primary.light,
        backgroundColor: theme.palette.action.hover,
        cursor: 'pointer',
    },
    '&.Mui-selected': {
        // Target the selected state
        borderColor: theme.palette.primary.main,
    },
    '&.Mui-disabled': {
        opacity: 0.5, // Grey out the tab
        cursor: 'not-allowed', // Show a 'not-allowed' cursor
        // Ensure disabled tabs don't show hover effects
        '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.text.secondary,
        },
    },
}))

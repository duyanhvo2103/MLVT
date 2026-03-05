import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined'
import { Box, Card, CardContent, Typography, useTheme } from '@mui/material'
import React from 'react'
import { CustomButton } from '../../../components/CustomButton'

interface TokenPlanProps {
    option: string
    token_amount: number
    onButtonClick: () => void
    loading?: boolean
}

const TokenPlanCard: React.FC<TokenPlanProps> = ({
    option,
    token_amount,
    onButtonClick,
    loading = false,
}) => {
    const theme = useTheme()
    const formatNumber = (num: number) => num.toLocaleString('en-US')
    return (
        <Card
            sx={{
                borderRadius: '15px',
                boxShadow:
                    theme.palette.mode === 'light'
                        ? '0px 4px 8px rgba(0, 0, 0, 0.25)'
                        : '0px 4px 8px rgba(220, 196, 196, 0.09)',
                width: 370,
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    my: 1.2,
                }}
            >
                {/* 1) Header icon, centered */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <LayersOutlinedIcon
                        sx={{
                            fontSize: '2.5rem',
                            color: '#2E073F',
                            bgcolor: '#C8A1E0',
                            borderRadius: '50%',
                            padding: '0.35rem',
                            border: `5px solid #EBD3F8`,
                        }}
                    />
                </Box>

                {/* 2) Card title */}
                <Typography
                    variant="h2"
                    align="center"
                    sx={{
                        color: '#A9C52F',
                        fontWeight: 600,
                        fontFamily: 'Poppins, sans-serif',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        gap: 1.5,
                    }}
                >
                    <span>{`${option}`.toUpperCase()}</span>{' '}
                    <Typography
                        component="span"
                        sx={{
                            fontSize: '1.2rem',
                            color: theme.palette.text.secondary,
                            fontWeight: 500,
                        }}
                    >
                        PACKAGE
                    </Typography>
                </Typography>

                {/* 3) Price */}
                <Box gap={0.9} mb={1.5}>
                    <Typography
                        variant="body2"
                        align="center"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 400,
                        }}
                    >
                        You will receive{' '}
                    </Typography>
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{
                            color: '#6EACDA',
                            fontWeight: 600,
                            fontFamily: 'Poppins, sans-serif',
                            lineHeight: 1.1,
                        }}
                    >
                        {formatNumber(token_amount)}
                        <Typography
                            component="span"
                            sx={{
                                fontSize: '1rem',
                                color: theme.palette.text.secondary,
                                fontWeight: 500,
                            }}
                        >
                            {' tokens'}
                        </Typography>
                    </Typography>
                </Box>

                {/* 4) Vertical list of perks */}
                {/* <List sx={{ mt: 1, px: 1, gap: 1 }}>
                    {perks.map((perk, idx) => (
                        <ListItem
                            key={idx}
                            disableGutters
                            sx={{
                                alignItems: "flex-start",
                                py: 0.5,
                                gap: 1.3,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 32,
                                    mt: "2px",
                                    paddingInline: 1,
                                }}
                            >
                                <CheckRoundedIcon
                                    sx={{
                                        color: "#2E073F",
                                        bgcolor: "#EBD3F8",
                                        fontSize: "1.5rem",
                                        borderRadius: "50%",
                                        padding: "0.2rem",
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={perk}
                                primaryTypographyProps={{
                                    sx: {
                                        color: theme.palette.text.primary,
                                        fontFamily: "Poppins, sans-serif",
                                        fontSize: "0.8rem",
                                    },
                                }}
                            />
                        </ListItem>
                    ))}
                </List> */}

                {/* 5) “Get started” button */}
                <CustomButton
                    text={'Buy Now'}
                    onClick={onButtonClick}
                    variant="contained"
                    loading={loading}
                    disabled={loading}
                />
            </CardContent>
        </Card>
    )
}

export default TokenPlanCard

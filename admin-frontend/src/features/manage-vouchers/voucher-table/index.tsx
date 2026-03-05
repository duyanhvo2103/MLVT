import React, { useState, useEffect, useRef } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Typography,
    IconButton,
    Box,
    TextField,
    ChipProps,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { GetAllVoucherResponse, Voucher } from "../../../types/Response/Vouchers";
import dayjs from "dayjs";
import { useTheme } from "../../../theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField, TimeField } from "@mui/x-date-pickers";
import { voucherSortOption, voucherTableHeader } from "../../../types/voucher";

const getStatus = (used: number, max: number, expired: string): { label: string; color: ChipProps["color"] } => {
    const now = new Date();
    const exp = new Date(expired);
    if (used >= max) return { label: "USED", color: "warning" };
    if (exp < now) return { label: "EXPIRED", color: "error" };
    return { label: "ACTIVE", color: "success" };
};

interface VoucherTableProps {
    data?: GetAllVoucherResponse | null;
    handleChangeVoucher: (voucher: Voucher) => void;
    sortProps: voucherSortOption;
    handleChangeSortOption: (sortBy: voucherSortOption["sortBy"], sort: voucherSortOption["sort"]) => void;
}

interface RowData {
    isEdited: boolean
    rowData: Voucher | null
}

const VoucherTable: React.FC<VoucherTableProps> = ({
    data,
    handleChangeVoucher,
    handleChangeSortOption,
    sortProps,
}) => {
    const [editRow, setEditRow] = useState<RowData>({ isEdited: false, rowData: null });

    const theme = useTheme();
    const editRowRef = useRef<HTMLTableRowElement | null>(null);

    // useEffect for edit row
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const isClickOnCheckIcon = (event.target as HTMLElement).closest(
                '[data-checkicon="true"]',
            )
            // check if the click is outside of the edited row
            if (
                editRow.isEdited &&
                editRowRef.current &&
                !editRowRef.current.contains(event.target as Node)
            ) {
                setEditRow({ isEdited: false, rowData: null })
            } else if (isClickOnCheckIcon && editRow.rowData) {
                handleChangeVoucher(editRow.rowData)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [editRow]);

    const handleEditClick = (row: Voucher) => {
        setEditRow({
            isEdited: !editRow.isEdited,
            rowData: row,
        })
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Voucher,
    ) => {
        if (!editRow.rowData) return

        let value: string | number = e.target.value

        // Ép kiểu đúng cho từng field
        if (["token", "max_usage", "used_count"].includes(field)) {
            const parsed = parseInt(value, 10);
            value = isNaN(parsed) ? 0 : parsed;
        }

        setEditRow((prev) => ({
            ...prev,
            rowData: {
                ...prev.rowData!,
                [field]: value,
            },
        }))
    }

    const handleDateChange = (date: Date, field: keyof Voucher) => {
        setEditRow({
            ...editRow,
            rowData: {
                ...editRow.rowData!,
                [field]: date.toISOString(),
            },
        })
    }

    const textFieldInputSx = {
        color: theme.fontColor.white,
        fontFamily: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        lineHeight: "inherit",
        padding: "0px",
    };
    const textFieldSx = {
        "& .MuiOutlinedInput-root": {
            padding: 0,

            "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #1976d2",
            },
        },
        "& .MuiOutlinedInput-input": {
            padding: 0,
        },
    };

    if (!data || !Array.isArray(data.vouchers)) {
        return <Typography>No vouchers found</Typography>;
    }

    const handleSortClick = (sortBy: voucherSortOption["sortBy"]) => {
        let nextSort: voucherSortOption["sort"];
        if (sortProps.sortBy !== sortBy) {
            nextSort = "ASC";
        } else {
            nextSort = sortProps.sort === "" ? "ASC" : sortProps.sort === "ASC" ? "DESC" : "";
        }
        handleChangeSortOption(sortBy, nextSort);
    };

    return (
        <Box sx={{ p: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TableContainer
                    component={Paper}
                    sx={{
                        backgroundColor: "inherit",
                        // borderRadius: 2,
                        width: "100%",
                        overflowX: "auto",
                    }}
                >
                    {/* ======================================  */}
                    {/* =                                    =  */}
                    {/* =          Table Header              =  */}
                    {/* =                                    =  */}
                    {/* ======================================  */}
                    <Table size="small" sx={{ minWidth: 1000, width: "100%" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: theme.fontColor.white, fontSize: "0.75rem" }}>Edit</TableCell>
                                {voucherTableHeader.map((header) => (
                                    <TableCell
                                        key={header.label}
                                        onClick={() => handleSortClick(header.sortBy as voucherSortOption["sortBy"])}
                                        sx={{
                                            cursor: "pointer",
                                            color: theme.fontColor.white,
                                            fontSize: "0.75rem",
                                            fontWeight: sortProps["sortBy"] === header["sortBy"] ? "bold" : "normal",
                                        }}
                                    >
                                        {header.label}
                                        {sortProps["sortBy"] === header["sortBy"] &&
                                            (sortProps["sort"] === "ASC"
                                                ? " 🔼"
                                                : sortProps["sort"] === "DESC"
                                                ? " 🔽"
                                                : "")}
                                    </TableCell>
                                ))}
                                <TableCell sx={{ color: theme.fontColor.white, fontSize: "0.75rem" }}>Status</TableCell>
                            </TableRow>
                        </TableHead>

                        {/* ======================================  */}
                        {/* =                                    =  */}
                        {/* =          Table Body                =  */}
                        {/* =                                    =  */}
                        {/* ======================================  */}
                        {data && (
                            <TableBody>
                                {data.vouchers.map((row) => {
                                    const status = getStatus(row.used_count, row.max_usage, row.expired_time);
                                    return (
                                        <TableRow
                                            key={row.id}
                                            ref={
                                                editRow.isEdited &&
                                                editRow.rowData?.id === row.id
                                                    ? editRowRef
                                                    : null
                                            }
                                        >
                                            <TableCell>
                                                <IconButton size="small" onClick={() => handleEditClick(row)}>
                                                    {editRow.isEdited && editRow.rowData?.id === row.id ? (
                                                        <CheckIcon
                                                            data-checkicon="true"
                                                            sx={{ color: theme.fontColor.white, fontSize: "1rem" }}
                                                        />
                                                    ) : (
                                                        <EditIcon
                                                            sx={{ color: theme.fontColor.white, fontSize: "1rem" }}
                                                        />
                                                    )}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell sx={{ color: theme.fontColor.white, fontSize: "0.75rem" }}>
                                                {row.id}
                                            </TableCell>
                                            <TableCell sx={{ color: theme.fontColor.white, fontSize: "0.75rem" }}>
                                                {editRow.isEdited && editRow.rowData?.id === row.id ? (
                                                    <TextField
                                                        value={editRow.rowData?.code}
                                                        onChange={(e) => handleInputChange(e, "code")}
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        slotProps={{
                                                            input: {
                                                                sx: textFieldInputSx,
                                                            },
                                                        }}
                                                        sx={textFieldSx}
                                                    />
                                                ) : (
                                                    row.code
                                                )}
                                            </TableCell>
                                            <TableCell sx={{ color: theme.fontColor.white, fontSize: "0.75rem" }}>
                                                {editRow.isEdited && editRow.rowData?.id === row.id ? (
                                                    <TextField
                                                        value={editRow.rowData?.token}
                                                        onChange={(e) => handleInputChange(e, "token")}
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        slotProps={{
                                                            input: {
                                                                sx: textFieldInputSx,
                                                            },
                                                        }}
                                                        sx={textFieldSx}
                                                    />
                                                ) : (
                                                    row.token
                                                )}
                                            </TableCell>
                                            <TableCell sx={{ color: theme.fontColor.white, fontSize: "0.75rem" }}>
                                                {editRow.isEdited && editRow.rowData?.id === row.id ? (
                                                    <TextField
                                                        value={editRow.rowData?.max_usage}
                                                        onChange={(e) => handleInputChange(e, "max_usage")}
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        slotProps={{
                                                            input: {
                                                                sx: textFieldInputSx,
                                                            },
                                                        }}
                                                        sx={textFieldSx}
                                                    />
                                                ) : (
                                                    row.max_usage
                                                )}
                                            </TableCell>
                                            <TableCell sx={{ color: theme.fontColor.white, fontSize: "0.75rem" }}>
                                                {editRow.isEdited && editRow.rowData?.id === row.id ? (
                                                    <TextField
                                                        value={editRow.rowData?.used_count}
                                                        onChange={(e) => handleInputChange(e, "used_count")}
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        slotProps={{
                                                            input: {
                                                                sx: textFieldInputSx,
                                                            },
                                                        }}
                                                        sx={textFieldSx}
                                                    />
                                                ) : (
                                                    row.used_count
                                                )}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    color: theme.fontColor.white,
                                                    fontSize: "0.75rem",
                                                    whiteSpace: "nowrap",
                                                    p: 0.5,
                                                    width: 120,
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {editRow.isEdited && editRow.rowData?.id === row.id ? (
                                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.1 }}>
                                                        <DateField
                                                            value={dayjs(
                                                                editRow.rowData
                                                                    .expired_time,
                                                            )}
                                                            sx={{ margin: 0 }}
                                                            onChange={(
                                                                newDate,
                                                            ) => {
                                                                if (newDate) {
                                                                    const old = dayjs(editRow.rowData?.expired_time);
                                                                    const merged = old
                                                                        .year(newDate.year())
                                                                        .month(newDate.month())
                                                                        .date(newDate.date());
                                                                    handleDateChange(merged.toDate(), "expired_time");
                                                                }
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    size: "small",
                                                                    variant: "standard",
                                                                    fullWidth: true,
                                                                    sx: { maxWidth: 120, fontSize: "0.75rem" },
                                                                    InputProps: {
                                                                        disableUnderline: true,
                                                                        sx: {
                                                                            color: theme.fontColor.white,
                                                                            fontSize: "0.75rem",
                                                                            p: 0,
                                                                        },
                                                                    },
                                                                    inputProps: {
                                                                        sx: {
                                                                            color: theme.fontColor.white,
                                                                            fontSize: "0.75rem",
                                                                            p: 0,
                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                        <TimeField
                                                            value={dayjs(
                                                                editRow.rowData
                                                                    .expired_time,
                                                            )}
                                                            sx={{ margin: 0 }}
                                                            onChange={(
                                                                newTime,
                                                            ) => {
                                                                if (newTime) {
                                                                    const old = dayjs(editRow.rowData?.expired_time);
                                                                    const merged = old
                                                                        .hour(newTime.hour())
                                                                        .minute(newTime.minute())
                                                                        .second(newTime.second());
                                                                    handleDateChange(merged.toDate(), "expired_time");
                                                                }
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    size: "small",
                                                                    variant: "standard",
                                                                    fullWidth: true,
                                                                    sx: { maxWidth: 120, fontSize: "0.75rem" },
                                                                    InputProps: {
                                                                        disableUnderline: true,
                                                                        sx: {
                                                                            color: theme.fontColor.white,
                                                                            fontSize: "0.75rem",
                                                                            p: 0,
                                                                        },
                                                                    },
                                                                    inputProps: {
                                                                        sx: {
                                                                            color: theme.fontColor.white,
                                                                            fontSize: "0.75rem",
                                                                            p: 0,
                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </Box>
                                                ) : (
                                                    <>
                                                        {dayjs(row.expired_time).format("DD/MM/YYYY")}
                                                        <br />
                                                        {dayjs(row.expired_time).format("HH:mm:ss")}
                                                    </>
                                                )}
                                            </TableCell>

                                            <TableCell sx={{ color: theme.fontColor.white, fontSize: "0.75rem" }}>
                                                {dayjs(row.created_at).format("DD/MM/YYYY")}
                                                <br />
                                                {dayjs(row.created_at).format("HH:mm:ss")}
                                            </TableCell>
                                            <TableCell sx={{ color: theme.fontColor.white, fontSize: "0.75rem" }}>
                                                {dayjs(row.updated_at).format("DD/MM/YYYY")}
                                                <br />
                                                {dayjs(row.updated_at).format("HH:mm:ss")}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={status.label}
                                                    color={status.color}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ fontSize: "0.7rem", height: "22px" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </LocalizationProvider>
        </Box>
    )
}

export default VoucherTable

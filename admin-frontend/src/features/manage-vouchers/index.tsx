import { Box, Typography, Button, MenuItem, TextField, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../theme";
// import DownloadIcon from "@mui/icons-material/Download";
import VoucherTable from "../manage-vouchers/voucher-table";
import { GetAllVoucherResponse, Voucher } from "../../types/Response/Vouchers";
import { createVoucherAPI, editVoucherAPI, getAllVouchersAPI } from "../../api/voucher.api";
import { CreateVoucherPopup } from "./create-voucher-popup";
import { voucherSearchCriteria, voucherSortOption } from "../../types/voucher";
import JumpingDotsString from "../../components/jumping-dot-string";
// import { ExportFilePopup } from "./export-file-popup";

export const VoucherManagement: React.FC = () => {
    const theme = useTheme();
    const [status, setStatus] = useState("");
    const [voucherTable, setVoucherTable] = useState<GetAllVoucherResponse>({
        vouchers: [],
        total_count: 0,
    });

    const [openCreateVoucherPopup, setOpenCreateVoucherPopup] = useState<boolean>(false);
    // const [openExportFilePopup, setOpenExportFilePopup] = useState<boolean>(false);
    const [sort, setSort] = useState<voucherSortOption>({
        sort: "",
        sortBy: "",
    });
    // these two use for local variable
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputSearchKey, setInputSearchKey] = useState<string>("");
    const [inputSearchCriteria, setInputSearchCriteria] = useState<string>("");
    // these two used for send request
    const [searchCriteria, setSearchCriteria] = useState<string>("");
    const [searchKey, setSearchKey] = useState<string>("");
    const rowsPerPage = 5;
    const [page, setPage] = useState<number>(1);

    // popup for create voucher
    const handleOpenCreateVoucherPopup = () => setOpenCreateVoucherPopup(true);
    const handleCloseCreateVoucherPopup = () => setOpenCreateVoucherPopup(false);

    // popup for export file
    // const handleOpenExportFile = () => setOpenExportFilePopup(true);
    // const handleCloseExportFile = () => setOpenExportFilePopup(false);

    // function when clicking search button
    const onSearchButtonClick = () => {
        setSearchKey(inputSearchKey);
        setSearchCriteria(inputSearchCriteria);
        setPage(1);
        fetchAllVoucher();
    };

    // change table page function
    const onChangeTablePage = (page: number) => {
        setPage(page);
        setInputSearchCriteria(searchKey);
        setInputSearchCriteria(searchCriteria);
    };

    // get place holder for each search criteria
    const getPlaceholder = () => {
        const selected = voucherSearchCriteria.find((item) => item.label === searchCriteria);
        return selected?.placeHolder || "Search by selected criteria";
    };

    // change sort option when clicking table header
    const handleChangeSortOption = (sortBy: voucherSortOption["sortBy"], sort: voucherSortOption["sort"]) => {
        setSort({
            sortBy: sortBy,
            sort: sort,
        });
    };

    // function for calling Get All Vouchers API
    const fetchAllVoucher = async () => {
        try {
            setIsLoading(true);
            const offset = (page - 1) * rowsPerPage;
            const allVouchers = await getAllVouchersAPI(
                status,
                sort["sort"],
                sort["sortBy"],
                searchKey,
                searchCriteria,
                offset,
                rowsPerPage
            );
            setVoucherTable(allVouchers);
        } catch (error) {
            console.error("Failed to fetch vouchers:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // function for calling Create Voucher API
    const handleSumbitCreateVoucher = async (voucher: {
        code: string
        token: number
        max_usage: number
        expired_time: string
    }) => {
        try {
            await createVoucherAPI(voucher)
            fetchAllVoucher()
        } catch (error) {
            console.error("Failed to create vouchers:", error);
        }
        handleCloseCreateVoucherPopup()
    }

    // function for calling Edit Voucher API
    const handleSubmitEditVoucher = async (voucher: Voucher) => {
        try {
            await editVoucherAPI(voucher)
            fetchAllVoucher()
        } catch (error) {
            console.error("Failed to create vouchers:", error);
        }
        handleCloseCreateVoucherPopup();
    };

    useEffect(() => {
        fetchAllVoucher();
    }, [status, sort, page]);

    return (
        <Box
            sx={{
                zoom: 0.87,
            }}
        >
            <Box
                sx={{
                    marginTop: "0.2rem",
                    marginBottom: "0.2rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                }}
            >
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <Typography
                        sx={{
                            color: theme.fontColor.greyWhite,
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            "&:hover": {
                                textDecoration: "underline",
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        Pages
                    </Typography>
                </Link>
                <Typography>/</Typography>
                <Link to="/manage_vouchers" style={{ textDecoration: "none" }}>
                    <Typography
                        sx={{
                            color: theme.fontColor.white,
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            "&:hover": {
                                textDecoration: "underline",
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        Manage Voucher
                    </Typography>
                </Link>
            </Box>
            <Typography
                sx={{
                    color: theme.fontColor.white,
                }}
            >
                Manage Voucher
            </Typography>

            {/* ======================================  */}
            {/* =                                    =  */}
            {/* =          Search Section            =  */}
            {/* =                                    =  */}
            {/* ======================================  */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 2,
                    borderRadius: 2,
                    marginTop: "1.5rem",
                }}
            >
                {/* Left section */}
                <Box sx={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap", gap: 2, marginBottom: "1rem" }}>
                    {/* Search box */}
                    <Box sx={{ marginRight: "1.5rem" }}>
                        <Typography sx={{ color: "white", fontSize: "0.9rem", mb: 0.5 }}>
                            What are you looking for?
                        </Typography>
                        <TextField
                            placeholder={getPlaceholder()}
                            size="small"
                            value={inputSearchKey}
                            onChange={(e) => setInputSearchKey(e.target.value)}
                            sx={{
                                minWidth: "15rem",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    color: "white",
                                    fontSize: "0.9rem",
                                    backgroundColor: "#1e293b",
                                },
                                input: { color: "white" },
                            }}
                        />
                    </Box>

                    {/* Search criteria dropdown */}
                    <Box sx={{ marginRight: "1.5rem" }}>
                        <Typography sx={{ color: "white", fontSize: "0.9rem", mb: 0.5 }}>Search Criteria</Typography>
                        <TextField
                            select
                            size="small"
                            value={inputSearchCriteria}
                            onChange={(e) => setInputSearchCriteria(e.target.value)}
                            sx={{
                                minWidth: 160,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    color: "white",
                                    fontSize: "0.9rem",
                                    backgroundColor: "#1e293b",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "white",
                                },
                            }}
                        >
                            {voucherSearchCriteria.map((option) => (
                                <MenuItem key={option.key} value={option.key}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    {/* Status dropdown */}
                    <Box sx={{ marginRight: "1.5rem" }}>
                        <Typography sx={{ color: "white", fontSize: "0.9rem", mb: 0.5 }}>Status</Typography>
                        <TextField
                            select
                            size="small"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            sx={{
                                minWidth: 120,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    color: "white",
                                    fontSize: "0.9rem",
                                    backgroundColor: "#1e293b",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "white",
                                },
                            }}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="ACTIVE">Active</MenuItem>
                            <MenuItem value="EXPIRED">Expired</MenuItem>
                            <MenuItem value="USED">Used</MenuItem>
                        </TextField>
                    </Box>

                    {/* Search button */}
                    <Button
                        variant="contained"
                        sx={{
                            height: 40,
                            borderRadius: "8px",
                            fontSize: "0.9rem",
                            textTransform: "none",
                        }}
                        onClick={onSearchButtonClick}
                    >
                        Search
                    </Button>
                </Box>

                {/* Right section: Export
                <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    sx={{
                        color: "white",
                        borderColor: "#3b82f6",
                        fontSize: "0.9rem",
                        borderRadius: "8px",
                        textTransform: "none",
                        marginRight: "50px",
                        "&:hover": {
                            backgroundColor: "#1e40af",
                            borderColor: "#3b82f6",
                        },
                    }}
                    onClick={handleOpenExportFile}
                >
                    EXPORT
                </Button> */}
            </Box>
            <Button
                variant="contained"
                sx={{
                    height: 35,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    backgroundColor: theme.background.darkBlue,
                    marginBottom: "1rem",
                }}
                onClick={() => handleOpenCreateVoucherPopup()}
            >
                ADD NEW VOUCHER
            </Button>

            {/* ======================================  */}
            {/* =                                    =  */}
            {/* =          Table Section             =  */}
            {/* =                                    =  */}
            {/* ======================================  */}

            <VoucherTable
                data={voucherTable}
                handleChangeVoucher={handleSubmitEditVoucher}
                sortProps={sort}
                handleChangeSortOption={handleChangeSortOption}
            />

            {/* ======================================  */}
            {/* =                                    =  */}
            {/* =          Pagination                =  */}
            {/* =                                    =  */}
            {/* ======================================  */}

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Typography sx={{ color: "#ccc" }}>Total: {voucherTable?.total_count ?? 0} voucher(s)</Typography>
                {voucherTable && (
                    <Pagination
                        count={Math.ceil((voucherTable?.total_count ?? 0) / rowsPerPage)}
                        page={page}
                        onChange={(_, value) => onChangeTablePage(value)}
                        variant="outlined"
                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: "white",
                                borderColor: "white",
                            },
                            "& .MuiPaginationItem-root:hover": {
                                backgroundColor: "white",
                                borderColor: "black",
                                color: "black",
                            },
                            "& .MuiPaginationItem-root.Mui-selected": {
                                backgroundColor: "white",
                                color: "black",
                                "&:hover": {
                                    backgroundColor: "white",
                                },
                            },
                        }}
                    />
                )}
            </Box>
            <Box display="flex" justifyContent="center">
                {isLoading && (
                    <JumpingDotsString
                        text="Loading"
                        textColor={theme.fontColor.babyBlue}
                        dotColor={theme.fontColor.babyBlue}
                    />
                )}
            </Box>

            <CreateVoucherPopup
                open={openCreateVoucherPopup}
                onClose={handleCloseCreateVoucherPopup}
                onSubmit={handleSumbitCreateVoucher}
            />

            {/*<ExportFilePopup
                open={openExportFilePopup}
                onClose={handleCloseExportFile}
                searchCriteria={searchCriteria}
                searchKey={searchKey}
                sort={sort["sort"]}
                sortBy={sort["sortBy"]}
                rowPerPage={rowsPerPage}
                status={status}
                from={(page - 1) * rowsPerPage}
                limit={rowsPerPage}
            /> */}
        </Box>
    )
}

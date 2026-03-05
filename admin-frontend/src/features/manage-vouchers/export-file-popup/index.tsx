// import React, { useState } from "react";
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Button,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Select,
// } from "@mui/material";
// import { useTheme } from "../../../theme";
// import { voucherSortOption } from "../../../types/voucher";
// import { Voucher } from "../../../types/Response/Vouchers";
// import { getAllVouchersAPI } from "../../../api/voucher.api";
// import * as XLSX from "xlsx";

// interface ExportPopupProps {
//     open: boolean;
//     onClose: () => void;
//     from: number;
//     limit: number;
//     sort: voucherSortOption;
//     sortBy: string;
//     searchKey: string;
//     searchCriteria: string;
//     status: string;
//     rowPerPage: number;
// }

// export const ExportFilePopup: React.FC<ExportPopupProps> = ({
//     open,
//     onClose,
//     from,
//     limit,
//     sort,
//     sortBy,
//     searchKey,
//     searchCriteria,
//     status,
//     rowPerPage,
// }) => {
//     const [fileName, setFileName] = useState("");
//     const [fileType, setFileType] = useState("xlsx");
//     const [exportOption, setExportOption] = useState("current");
//     const [totalPages, setTotalPages] = useState<number | undefined>();
//     const [startPage, setStartPage] = useState<number | undefined>();

//     const isExportAll = exportOption === "all";
//     const theme = useTheme();

//     const textFieldInputSx = {
//         sx: {
//             // use for text field component
//             // label color
//             "& .MuiInputLabel-root": {
//                 color: "#FFFF",
//             },
//             // border color
//             "& .MuiOutlinedInput-root": {
//                 color: "#FFFF",
//                 "& fieldset": {
//                     borderColor: "#FFFF",
//                 },
//                 "&:hover fieldset": {
//                     borderColor: "#0041C2",
//                 },
//                 "&.Mui-focused fieldset": {
//                     borderColor: "primary",
//                 },
//             },
//         },
//     };

//     const selectInputSx = {
//         "& .MuiInputLabel-root": {
//             color: "#FFFF",
//         },
//         "& .MuiOutlinedInput-root": {
//             color: "#FFFF",
//             "& fieldset": {
//                 borderColor: "#FFFF",
//             },
//             "&:hover fieldset": {
//                 borderColor: "#0041C2",
//             },
//             "&.Mui-focused fieldset": {
//                 borderColor: theme.palette.primary.main,
//             },
//         },
//         "& .MuiSelect-icon": {
//             color: "#FFFF",
//         },
//     };

//     const getDefaultFileName = () => {
//         const now = new Date();
//         const pad = (n: number) => n.toString().padStart(2, "0");
//         const ss = pad(now.getSeconds());
//         const MM = pad(now.getMinutes());
//         const HH = pad(now.getHours());
//         const dd = pad(now.getDate());
//         const mm = pad(now.getMonth() + 1);
//         const yy = pad(now.getFullYear() % 100);
//         const timestamp = `${ss}:${MM}:${HH}T${dd}/${mm}/${yy}`;
//         const fromPage = startPage ?? from;
//         return `Voucher-${timestamp}-FromPage(${fromPage})-TotalRecords(${limit})`;
//     };

//     function exportVouchers(vouchers: Voucher[], fileName: string, fileType: "csv" | "xlsx"): void {
//         // Helper: chuyển Voucher[] thành CSV text
//         const toCSV = (data: Voucher[]): string => {
//             const header = [
//                 "id",
//                 "code",
//                 "token",
//                 "max_usage",
//                 "used_count",
//                 "expired_time",
//                 "created_at",
//                 "updated_at",
//             ];
//             const rows = data.map((v) =>
//                 [v.id, v.code, v.token, v.max_usage, v.used_count, v.expired_time, v.created_at, v.updated_at]
//                     .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
//                     .join(",")
//             );
//             return [header.join(","), ...rows].join("\r\n");
//         };

//         // Tạo blob theo loại file
//         let blob: Blob;
//         if (fileType === "csv") {
//             const csv = toCSV(vouchers);
//             blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//         } else {
//             // Excel: dùng SheetJS
//             const ws = XLSX.utils.json_to_sheet(vouchers);
//             const wb = XLSX.utils.book_new();
//             XLSX.utils.book_append_sheet(wb, ws, "Vouchers");
//             const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//             blob = new Blob([wbout], {
//                 type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//             });
//         }

//         // Tạo link ẩn để download
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `${fileName}.${fileType}`;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         window.URL.revokeObjectURL(url);
//     }

//     const handleExport = async () => {
//         const finalFileName = fileName || getDefaultFileName();

//         const exportParams = {
//             fileName: finalFileName,
//             fileType,
//             exportOption,
//             ...(isExportAll && {
//                 totalPages,
//                 startPage,
//             }),
//             from,
//             limit,
//             sort,
//             sortBy,
//             searchKey,
//             searchCriteria,
//             status,
//             rowPerPage,
//         };

//         console.log("Exporting with params:", exportParams);

//         try {
//             const allVouchers = await getAllVouchersAPI(
//                 status,
//                 sort["sort"],
//                 sort["sortBy"],
//                 searchKey,
//                 searchCriteria,
//                 from,
//                 rowPerPage
//             );
//             const blob = await allVouchers.vouchers.blob();
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement("a");
//             a.href = url;
//             a.download = `${finalFileName}.${fileType}`;
//             a.click();
//             window.URL.revokeObjectURL(url);
//             onClose();
//         } catch (error) {
//             console.error("Export error:", error);
//             alert("Export failed. Please try again.");
//         }
//     };

//     return (
//         <Dialog
//             open={open}
//             onClose={onClose}
//             maxWidth="sm"
//             fullWidth
//             sx={{
//                 "& .MuiPaper-root": {
//                     background: `linear-gradient(180deg, ${theme.background.dark} 0%, ${theme.background.lightDark} 100%)`,
//                     color: "#ffff",
//                 },
//             }}
//         >
//             <DialogTitle>Export File</DialogTitle>
//             <DialogContent>
//                 <TextField
//                     label="File Name"
//                     fullWidth
//                     margin="normal"
//                     value={fileName}
//                     onChange={(e) => setFileName(e.target.value)}
//                     placeholder={getDefaultFileName()}
//                     slotProps={{ inputLabel: { shrink: true } }}
//                     {...textFieldInputSx}
//                 />
//                 <FormControl fullWidth margin="normal" sx={selectInputSx}>
//                     <InputLabel>File Type</InputLabel>
//                     <Select value={fileType} label="File Type" onChange={(e) => setFileType(e.target.value)}>
//                         <MenuItem value="xlsx">Excel (.xlsx)</MenuItem>
//                         <MenuItem value="csv">CSV</MenuItem>
//                     </Select>
//                 </FormControl>

//                 <FormControl fullWidth margin="normal" sx={selectInputSx}>
//                     <InputLabel>Export Option</InputLabel>
//                     <Select
//                         value={exportOption}
//                         label="Export Option"
//                         onChange={(e) => setExportOption(e.target.value)}
//                     >
//                         <MenuItem value="current">Current page</MenuItem>
//                         <MenuItem value="all">All pages (max 1000 records)</MenuItem>
//                     </Select>
//                 </FormControl>

//                 {isExportAll && (
//                     <>
//                         <TextField
//                             label="Total Records"
//                             type="number"
//                             fullWidth
//                             margin="normal"
//                             value={totalPages || ""}
//                             onChange={(e) => setTotalPages(Number(e.target.value))}
//                             {...textFieldInputSx}
//                         />
//                         <TextField
//                             label="Start page"
//                             type="number"
//                             fullWidth
//                             margin="normal"
//                             value={startPage || ""}
//                             onChange={(e) => setStartPage(Number(e.target.value))}
//                             {...textFieldInputSx}
//                         />
//                     </>
//                 )}
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose}>Cancel</Button>
//                 <Button
//                     variant="contained"
//                     onClick={handleExport}
//                     disabled={isExportAll && (!totalPages || !startPage)}
//                 >
//                     Export
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

export const NotDevelop = () => {}
import React from "react";
import {
    Select,
    MenuItem,
    FormControl,
    SelectChangeEvent,
} from "@mui/material";

interface SingleSelectProps {
    choices: string[];
    handleChangeOption: (value: string) => void;
    customSx?: object;
    value: string;
    disabled?: boolean;
}

export const SingleOptionBox: React.FC<SingleSelectProps> = ({
    choices,
    handleChangeOption,
    customSx = {},
    value,
    disabled,
}) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        handleChangeOption(event.target.value);
    };

    return (
        <FormControl
            sx={{ m: 1, width: "100%", marginLeft: "0px", ...customSx }}
        >
            <Select
                labelId="single-select-label"
                id="single-select"
                size="small"
                value={value}
                onChange={handleChange}
                MenuProps={{
                    disablePortal: true,
                    sx: { zIndex: (theme) => theme.zIndex.modal + 1 },
                }}
                sx={{
                    "& .MuiSelect-select": {
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.9rem",
                    },
                }}
                disabled={disabled}
            >
                {choices.map((choice) => (
                    <MenuItem
                        key={choice}
                        value={choice}
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.9rem",
                        }}
                    >
                        {choice}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

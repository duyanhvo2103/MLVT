import React, { useState } from "react";
import { Box, Button } from "@mui/material";

interface Views {
    text: string;
    viewState: string;
}

interface ChangeViewBoxProps {
    Views: Views[];
    setViewState: (method: string) => void;
}

const ChangeViewBox: React.FC<ChangeViewBoxProps> = ({
    Views,
    setViewState,
}) => {
    const [activeTab, setActiveTab] = useState<string>(Views[0]?.text || "");

    return (
        <Box
            sx={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
                outline: 2,
                borderRadius: 1.5,
                padding: 0.5,
                outlineColor: (theme) => theme.palette.primary.main,
                outlineWidth: 1.5,
                backgroundColor: (theme) => theme.palette.background.paper,
            }}
        >
            {Views.map((subView, index) => (
                <Button
                    key={index}
                    variant={activeTab === subView.text ? "contained" : "text"}
                    sx={{
                        backgroundColor:
                            activeTab === subView.text
                                ? (theme) =>
                                      theme.palette.secondary.contrastText
                                : "none",
                        color:
                            activeTab === subView.text
                                ? (theme) => theme.palette.background.paper
                                : (theme) => theme.palette.text.primary,
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        flex: 1,
                        borderRadius: 1.5,
                    }}
                    onClick={() => {
                        setActiveTab(subView.text);
                        setViewState(subView.viewState);
                    }}
                >
                    {subView.text}
                </Button>
            ))}
        </Box>
    );
};

export default ChangeViewBox;

// ColorModeContext.tsx (Improved Version)
import React, {
    ReactNode,
    useState,
    useMemo,
    createContext,
    useContext,
    useEffect,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createAppTheme } from "./createAppTheme";
import type { PaletteMode } from "@mui/material";

const THEME_STORAGE_KEY = "appThemeMode";


const getInitialMode = (): PaletteMode => {
    try {
        const storedMode = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (storedMode === "light" || storedMode === "dark") {
            return storedMode as PaletteMode;
        }
    } catch (error) {
        // set palette mode to light if localStorage access fails
        console.warn("Could not access localStorage for theme preference:", error);
        return "light";
    }

    // Check for the user's system preference
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        return "dark";
    }

    // Fallback to light mode
    return "light";
};

interface ColorModeContextType {
    toggle: () => void;
    mode: PaletteMode;
}
export const ColorModeContext = createContext<ColorModeContextType>({
    toggle: () => {},
    mode: "light",
});
export const useColorMode = () => useContext(ColorModeContext);

interface ColorModeProviderProps {
    children: ReactNode;
}

export const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
    const [mode, setMode] = useState<PaletteMode>(getInitialMode);

    useEffect(() => {
        try {
            // 1. Save to localStorage
            window.localStorage.setItem(THEME_STORAGE_KEY, mode);

            // 2. Update the data-theme attribute on the root element
            document.documentElement.setAttribute("data-theme", mode);
        } catch (error) {
            console.warn("Could not save theme preference:", error);
        }
    }, [mode]);

    const colorMode = useMemo(
        () => ({
            toggle: () => setMode((m) => (m === "light" ? "dark" : "light")),
            mode,
        }),
        [mode]
    );

    const theme = useMemo(() => createAppTheme(mode), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme /> 
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

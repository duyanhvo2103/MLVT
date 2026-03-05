// components/ThemeSwitch.tsx
import * as React from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { useColorMode } from "../../themes/ColorModeContext";

const getSunSvg = (color: string) => `
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <circle cx='12' cy='12' r='5' fill='${color}'/>
    <g stroke='${color}' stroke-width='2' stroke-linecap='round'>
      <path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'/>
    </g>
  </svg>
`;

const getMoonSvg = (color: string) => `
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <path fill='${color}' d='M12 2.5A9.5 9.5 0 1 0 21.5 12A9.5 9.5 0 0 1 12 2.5z'/>
  </svg>
`;

const getSvgUrl = (svgString: string) =>
    `url("data:image/svg+xml,${encodeURIComponent(
        svgString.replace(/\s+/g, " ")
    )}")`;

const WIDTH = 60;
const HEIGHT = 34;
const THUMB_SIZE = HEIGHT - 6;

const ThemeSwitchStyled = styled(Switch)(({ theme }) => ({
    width: WIDTH,
    height: HEIGHT,
    padding: 0,

    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 3,
        transitionDuration: "300ms",

        "&.Mui-checked": {
            transform: `translateX(${WIDTH - THUMB_SIZE - 6}px)`, 
            "& .MuiSwitch-thumb:before": {
                backgroundImage: getSvgUrl(getMoonSvg("#fff")), 
            },
            "& + .MuiSwitch-track": {
                backgroundColor: "#424242", 
                opacity: 1,
            },
        },
    },

    "& .MuiSwitch-thumb": {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: "50%",
        backgroundColor: theme.palette.mode === "dark" ? "#212121" : "#fff",
        boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)", 
        position: "relative",

        "&:before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "70% 70%",
            backgroundImage: getSvgUrl(getSunSvg("#FB9E3A")), 
        },
    },

    "& .MuiSwitch-track": {
        borderRadius: HEIGHT / 2,
        backgroundColor: "#E9E9EA", 
        opacity: 1,
    },
}));

const ThemeSwitch: React.FC = () => {
    const { mode, toggle } = useColorMode();

    return (
        <ThemeSwitchStyled
            checked={mode === "dark"}
            onChange={toggle}
            disableRipple
            inputProps={{ "aria-label": "theme switch" }}
        />
    );
};

export default ThemeSwitch;

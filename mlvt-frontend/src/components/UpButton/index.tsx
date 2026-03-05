import { Box } from "@mui/material";
import StraightIcon from "@mui/icons-material/Straight";

const UpButton = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "#7A2EFF",
        color: "white",
        borderRadius: "50%",
        width: 50,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <StraightIcon fontSize="large" />
    </Box>
  );
};

export default UpButton;

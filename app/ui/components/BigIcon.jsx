import Box from "@mui/material/Box";

export default function BigIcon({ children }) {
    return (
        <Box sx={{
            "& .MuiSvgIcon-root": {
                color: "grey.400",
                fontSize: 80
            }
        }}>
            {children}
        </Box>
    )
}
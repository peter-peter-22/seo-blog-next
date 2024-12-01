import Paper from "@mui/material/Paper";

export function ToolbarBackground({ children }) {
    return (
        <Paper sx={{ m: 1, border: 1, borderColor: "divider" }}>
            {children}
        </Paper>
    )
}
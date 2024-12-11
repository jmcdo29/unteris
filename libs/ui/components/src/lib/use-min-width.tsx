import { useMediaQuery } from "@mui/material";

export const useMinWidth = (): boolean => useMediaQuery("(min-width:600px)");

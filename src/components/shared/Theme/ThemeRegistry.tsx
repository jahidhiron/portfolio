"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme from "@/theme";
import { TailwindThemeProvider } from "./TailwindThemeProvider";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <TailwindThemeProvider>
          <CssBaseline />
          {children}
        </TailwindThemeProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

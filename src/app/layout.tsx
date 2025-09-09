// src/app/layout.tsx
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import MuiProviders from "@/providers/MuiProviders";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daniel Burlacu — Portfolio",
  description: "Security, Blockchain & Full-Stack Work",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <MuiProviders>
            {/* Flex column wrapper that fills the viewport */}
            <Box sx={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}>
              <Header />
              {/* Main grows to push the footer down when content is short */}
              <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </MuiProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

// src/app/layout.tsx
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import MuiProviders from "@/providers/MuiProviders";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";
import "./globals.css";
import GenieMountClient  from "@/components/GenieMountClient";
 // const GenieMount = dynamic(() => import("@/features/AI/genie/GenieMount"), { ssr: false });

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
            <Box sx={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}>
              <Header />
              <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {children}
              </Box>
              <Footer />
            </Box>

            {/* 🔮 Genie lives globally, themed by MUI, client-only */}
            <GenieMountClient />
          </MuiProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

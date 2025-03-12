import "@/app/locales/i18n";
import "./globals.css";
import "antd/dist/reset.css";
import { QueryProvider } from "./providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import Menu from "@/app/components/shared/Menu";
import { ThemeProvider } from "./providers/ThemeProvider";
import { SystemThemeProvider } from "./providers/SystemThemeProvider";
import { DragDropProvider } from "./providers/DragDropContext";

export const metadata = {
  title: "Smart Insurance Portal",
  description: "Dynamic insurance form application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
      <body className="dark:bg-[#303030]">
        <SystemThemeProvider>
          <ThemeProvider>
            <DragDropProvider>
              <Menu />
              <QueryProvider>{children}</QueryProvider>
              <Toaster />
            </DragDropProvider>
          </ThemeProvider>
        </SystemThemeProvider>
      </body>
    </html>
  );
}

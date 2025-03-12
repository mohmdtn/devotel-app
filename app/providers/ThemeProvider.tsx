"use client";

import React, { ReactNode } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "./SystemThemeProvider";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
          colorBgBase: theme === "dark" ? "#535353" : "#ffffff",
          colorText: theme === "dark" ? "#c8c8c8" : "#000000",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

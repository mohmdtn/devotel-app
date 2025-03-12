"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type Theme = "light" | "dark";
type UserPreference = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  userPreference: UserPreference;
  setUserPreference: React.Dispatch<React.SetStateAction<UserPreference>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): Theme => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

const getInitialUserPreference = (): UserPreference => {
  if (typeof window !== "undefined") {
    const savedPreference = localStorage.getItem("user-theme");
    return savedPreference ? (savedPreference as UserPreference) : "system";
  }
  return "system";
};

interface SystemThemeProviderProps {
  children: ReactNode;
}

export const SystemThemeProvider: React.FC<SystemThemeProviderProps> = ({
  children,
}) => {
  const [userPreference, setUserPreference] =
    useState<UserPreference>("system");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initialUserPreference = getInitialUserPreference();
    setUserPreference(initialUserPreference);

    if (initialUserPreference === "system") {
      setTheme(getSystemTheme());
    } else {
      setTheme(initialUserPreference);
    }
  }, []);

  useEffect(() => {
    if (userPreference === "system" && typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);

      return () =>
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  }, [userPreference]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user-theme", userPreference);
    }

    if (userPreference === "system") {
      setTheme(getSystemTheme());
    } else {
      setTheme(userPreference);
    }
  }, [userPreference]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, userPreference, setUserPreference }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within SystemThemeProvider.");
  }
  return context;
};

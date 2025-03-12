import { useState, useEffect, ReactNode } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { MdSettingsBrightness } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useTheme } from "@/app/providers/SystemThemeProvider";
import { Button } from "antd";

type UserPreference = "light" | "system" | "dark";

const ThemeSetting = () => {
  const { theme, userPreference, setUserPreference } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  interface ThemeItem {
    id: string;
    value: UserPreference;
    icon: ReactNode;
  }

  const items: ThemeItem[] = [
    { id: "light", value: "light", icon: <FiSun size={17} /> },
    { id: "system", value: "system", icon: <MdSettingsBrightness size={17} /> },
    { id: "dark", value: "dark", icon: <FiMoon size={17} /> },
  ];

  const handleChangeTheme = (val: UserPreference) => {
    setUserPreference(val);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".theme-dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="relative flex justify-center theme-dropdown">
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        icon={<FiSun size={21} />}
      ></Button>
      <div
        className={`absolute w-36 z-40 divide-y overflow-hidden border border-gray-200 rounded-md shadow-2xl duration-200 right-0 md:right-auto ${
          isOpen
            ? "top-full opacity-100 pointer-events-auto"
            : "top-[85px] opacity-0 pointer-events-none"
        } ${
          theme === "dark"
            ? "bg-zinc-700 divide-gray-500"
            : "bg-white divide-gray-200"
        }`}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleChangeTheme(item.value)}
            className={`w-full flex start ps-8 py-3 items-center gap-2 p-2 duration-100 cursor-pointer ${
              theme === "dark" ? "hover:bg-gray-500" : "hover:bg-gray-100"
            } ${
              userPreference === item.id
                ? theme === "dark"
                  ? "bg-zinc-600"
                  : "bg-gray-50"
                : ""
            }`}
          >
            <div>{item.icon}</div>
            <div>{item.value}</div>
            {userPreference === item.id && (
              <FaCheck
                size={10}
                className={theme === "dark" ? "text-blue-400" : "text-blue-600"}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ThemeSetting;

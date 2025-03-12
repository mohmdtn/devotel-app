"use client";

import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";

export default function useTranslations() {
  const { i18n, t } = useTranslation();
  const [currentLang, setCurrentLang] = useState<string>("en");
  const [dir, setDir] = useState<"rtl" | "ltr">("ltr");

  const allLangs = [
    { name: "English", alias: "en", icon: "/pictures/flags/uk.svg" },
    { name: "فارسی", alias: "fa", icon: "/pictures/flags/ir.svg" },
  ];

  // Change language function
  const onChangeLang = useCallback(
    (newLang: string) => {
      if (newLang !== currentLang) {
        i18n.changeLanguage(newLang);
        if (typeof window !== "undefined") {
          localStorage.setItem("i18nextLng", newLang);
        }
        setCurrentLang(newLang);
        setDir(newLang === "ar" || newLang === "fa" ? "rtl" : "ltr");
      }
    },
    [i18n, currentLang]
  );

  // Initialize language
  useEffect(() => {
    const lng =
      typeof window !== "undefined"
        ? localStorage.getItem("i18nextLng") || "en"
        : "en";
    if (lng !== i18n.language) {
      i18n.changeLanguage(lng);
    }
    setCurrentLang(lng);
    setDir(lng === "ar" || lng === "fa" ? "rtl" : "ltr");
  }, [i18n]);

  return {
    allLangs,
    t,
    currentLang,
    onChangeLang,
    dir,
  };
}

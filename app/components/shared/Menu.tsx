"use client";

import Link from "next/link";
import React from "react";
import ThemeSetting from "./ThemeSetting";

const Menu = () => {
  return (
    <section className="flex gap-4 justify-between items-center px-6 py-4">
      <div className="flex gap-4 justify-center">
        <Link
          className="text-lg font-bold duration-150 text-gray-500 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-lg font-bold duration-150 text-gray-500 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400"
          href="/submissions"
        >
          Submissions
        </Link>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <ThemeSetting />
        <div className="text-2xl font-bold mb-0 text-gray-900 dark:text-gray-300 hidden md:inline-block">
          Insurance Application
        </div>
      </div>
    </section>
  );
};

export default Menu;

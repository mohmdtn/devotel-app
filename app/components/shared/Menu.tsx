"use client";

import ThemeSetting from "./ThemeSetting";
import MenuItem from "./MenuItem";

const menuItems = [
  { name: "Home", link: "/" },
  { name: "Submissions", link: "/submissions" },
];

const Menu = () => {
  return (
    <section className="flex gap-4 justify-between items-center px-6 py-4">
      <div className="flex gap-4 justify-center">
        {menuItems.map((item, index) => (
          <MenuItem key={index} name={item.name} link={item.link} />
        ))}
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

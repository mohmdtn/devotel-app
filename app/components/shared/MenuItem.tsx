import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  link: string;
  name: string;
}

const MenuItem = ({ link, name }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      className={`text-lg font-bold duration-150 ${
        pathname === link ? "text-blue-500" : "text-gray-500"
      } dark:${
        pathname === link ? "text-blue-300" : "text-gray-200"
      } hover:text-gray-900 dark:hover:text-gray-400`}
      href={link}
    >
      {name}
    </Link>
  );
};

export default MenuItem;

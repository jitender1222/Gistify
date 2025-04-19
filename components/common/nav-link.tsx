"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href != "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={`transition-colors text-sm duration-200
       text-gray-600 hover:text-rose-500 ${className} ${
        isActive && "text-rose-500"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;

import { Link, NavLink } from "react-router";
import { useThemeStore } from "../../store/theme-store";
import { sidebarLinks } from "../../data/links";
import clsx from "clsx";
import { Button } from "antd";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";

export function Sidebar() {
  const [isToggled, setIsToggled] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <nav
      className={clsx(
        "lg:flex flex-col border-r dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-white h-full transition-[width] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] min-w-[16rem] w-[16rem] lg:relative absolute hidden z-50",
        isToggled && "absolute"
      )}
    >
      <div className="flex self-center items-center h-28 py-6">
        <Link to="/" className="lg:block hidden">
          {/* TODO: Replace PNG logo with single SVG variant for better interactivity */}
          <img
            src="/logo.png"
            alt="techinnover logo"
            width={170}
            className={clsx(isDark && "hidden")}
          />
          <img
            src="/logo-white.png"
            alt="techinnover logo"
            width={170}
            className={clsx(!isDark && "hidden")}
          />
        </Link>
        <div className="lg:hidden block absolute right-4">
          <Button
            onClick={() => setIsToggled((prev) => !prev)}
            icon={<BiArrowBack />}
            shape="circle"
            size="small"
          >
            <span className="sr-only">Sidebar Toggle</span>
          </Button>
        </div>
      </div>
      <ul className="flex flex-col">
        {sidebarLinks.map((link) => (
          <li key={link.slug}>
            <NavLink
              to={`/dashboard${link.slug ? "/" : ""}${link.slug}`}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-4 py-3 px-4 border-r-2 hover:dark:text-zinc-400 hover:text-primary-500 text-sm font-semibold",
                  isActive
                    ? "border-r-2 border-primary-400 dark:hover:text-white dark:text-white text-primary-600 dark:bg-zinc-800 bg-primary-50"
                    : "border-transparent"
                )
              }
              end
            >
              {<link.icon className="size-5 shrink-0" />}{" "}
              <span
                className={clsx(
                  "lg:inline hidden flex-shrink-0",
                  isToggled && "inline"
                )}
              >
                {link.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

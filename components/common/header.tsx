import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";

const Header = () => {
  const isLoggedIn = false;
  return (
    <nav className="container flex items-center justify-between py-4 px-2 lg:px-8 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink className="flex items-center gap-1 lg:gap-2 shrink-0" href="/">
          <FileText
            className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 
          transform transition duration-200 ease-in-out"
          />
          <span className="font-extrabold lg:text-xl text-gray-900">
            Gistify
          </span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        {isLoggedIn ? (
          <NavLink href="/dashboard">Your Summaries</NavLink>
        ) : (
          <NavLink href="/#pricing">Pricing</NavLink>
        )}
      </div>

      <div className="flex lg:justify-end lg:flex-1">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div>Pro</div>
            <Button>SignOut</Button>
          </div>
        ) : (
          <div>
            <NavLink href="/sign-in">Sign In</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;

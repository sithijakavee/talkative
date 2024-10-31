import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
    {
      label: "Learn with AI",
      href: "/chat",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ];

  
  return (
    <div className="flex items-center justify-between w-full bg-primary text-white h-[70px] p-3 fixed top-0 left-0 right-0">
      <div>
        <Link to={"/"} className="font-bold text-[25px] text-secondary">
          Talakative
        </Link>
      </div>

      <div className="flex items-center gap-10">
        {links.map((link, i) => (
          <Link
            to={link.href}
            key={i}
            className="font-light text-[25px] text-secondary"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div>
        <div className="">
          <Link
            to={"/sign-in"}
            className="bg-secondary px-4 py-2 text-primary font-bold rounded-md"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

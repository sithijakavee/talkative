import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [popUp, setPopUp] = useState(false);

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

  useEffect(() => {
    setUser({
      email: localStorage.getItem("user"),
      username: localStorage.getItem("username"),
      pp: localStorage.getItem("pp"),
    });
  }, []);

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("pp");
    localStorage.removeItem("expire");
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between !z-[9999] w-full bg-primary text-white h-[70px] p-3 fixed top-0 left-0 right-0">
      <div>
        <a href={"/"} className="font-bold text-[25px] text-secondary">
          Talakative
        </a>
      </div>

      <div className="hidden sm:flex items-center gap-10">
        {links.map((link, i) => (
          <a
            href={link.href}
            key={i}
            className="font-light text-[25px] text-secondary"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          {user?.email ? (
            <>
              <button
                className="bg-secondary px-4 py-2 text-primary font-bold rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="bg-secondary px-4 py-2 text-primary font-bold rounded-md"
            >
              Sign In
            </Link>
          )}
        </div>
        <div className="relative">
          <FaBars
            className="size-5 cursor-pointer relative"
            onClick={() => setPopUp(!popUp)}
          />

          {popUp && (
            <div className="absolute bg-white p-2 top-5 right-0 max-w-[300px] min-w-[300px] h-auto rounded-md">
              {user?.email ? (
                <div className="flex gap-2 flex-col">
                  <div className="flex gap-2">
                    <FaUserCircle color="black" size={40} />
                    <div className="flex flex-col">
                      <span className="text-sm font-light text-dark">
                        {user.username}
                      </span>
                      <span className="text-sm font-light text-dark">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <button
                    className="bg-secondary p-1 text-primary text-sm font-normal rounded-md"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 flex-col">
                  <div className="flex gap-2">
                    <FaUserCircle color="black" size={40} />
                    <div className="flex flex-col">
                      <span className="text-md font-normal text-dark">
                        Welcome To Talkative
                      </span>
                      <span className="text-sm font-light text-dark">
                        Learn English with AI
                      </span>
                    </div>
                  </div>

                  <a
                    href={"/sign-in"}
                    className="bg-secondary px-4 py-2 text-center text-primary font-normal rounded-md"
                  >
                    Sign In
                  </a>
                </div>
              )}

              <ul className="list-none mt-3">
                {links.map((link, i) => (
                  <li key={i} className="mb-2">
                    <a
                      href={link.href}
                      key={i}
                      className="font-normal text-[15px] text-dark"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* <div className="absolute bg-white p-2 top-5 right-0 max-w-[300px] min-w-[300px] h-[400px]">

            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

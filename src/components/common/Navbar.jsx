import React, { lazy, useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDrowDown from "../core/Auth/ProfileDrowDown";
import { apiconnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ACCOUNT_TYPE } from "../../utils/constants";

// const subLinks = [
//   {
//     title: "python",
//     link: "/catalog/python",
//   },

//   {
//     title: "web dev",
//     link: "/catalog/web-development",
//   },
// ];

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiconnector("GET", categories.CATEGORIES_API);
      console.log("Printing sublinks results", result.data.allCategorys);
      setSubLinks(result.data.allCategorys);
    } catch (error) {
      console.log("could not fetch the category list");
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className="h-14 flex items-center justify-center border-b-[1px] border-richblack-700">
      <div className="flex w-11/12 max-w-[1260px] items-center justify-between ">
        {/* Image */}
        <Link to={"/"}>
          <img src={logo} alt="" width={160} height={42} loading="lazy" />
        </Link>

        {/* nav links */}
        <nav>
          <ul className="flex gap-6 text-richblack-25 ">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className=" relative flex items-center gap-2 group ">
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />

                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                      {subLinks?.length ? (
                        subLinks.map((sublink, index) => (
                          <Link
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            key={index}
                            to={`/catalog/${sublink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                          >
                            <p className="p-2"> {sublink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-5"
                          : "text-richblue-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login / signup / dashboard */}

        <div className="flex gap-4 items-center">
        {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token == null && (
            <Link to={"/login"}>
              <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-300 rounded-lg">
                Log In
              </button>
            </Link>
          )}
          {token == null && (
            <Link to={"/signup"}>
              <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-300 rounded-lg">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDrowDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

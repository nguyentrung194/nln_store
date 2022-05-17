import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import environment from "../../config";
// import { PhongContext } from "../../contexts/reducer";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import { classNames } from "../../common/lib";
import { CartContext } from "../../contexts/context";
import { stringAvatar } from "../../common/lib";

const navigations = [
  { name: "Home", to: "/home", current: false },
  { name: "Admin", to: "/admin", current: false },
];

export const Nav = () => {
  const { isLogin, login, user, isAdmin } = useContext(CartContext);
  const location = useLocation();
  console.log(location.pathname);
  const navigation = isAdmin
    ? navigations
    : navigations.filter((el) => el.name !== "Admin");
  console.log(user);
  return (
    <Disclosure
      as="nav"
      id="nav-thanh"
      className={`shadow-sm backdrop-blur-3xl py-2 bg-white/30 z-10 fixed top-0 right-0 w-full`}
    >
      {({ open }: any) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 
                rounded-md text-gray-700 hover:text-black hover:bg-gray-300
                 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center text-black">
                  Roza
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-2">
                    {navigation.map((item, index) => {
                      return (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            (item.to === "/" && location.pathname === "/") ||
                              (location.pathname.match(
                                new RegExp(`\\` + item.to + "*")
                              ) &&
                                item.to !== "/")
                              ? "bg-gray-200 text-black"
                              : "text-gray-600 hover:bg-gray-300 hover:text-black",
                            "px-2 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={
                            (item.to === "/" && location.pathname === "/") ||
                            (location.pathname.match(
                              new RegExp(`\\` + item.to + "*")
                            ) &&
                              item.to !== "/")
                              ? "page"
                              : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              {!!isLogin ? (
                <div
                  className="absolute inset-y-0 right-0 flex items-center 
              pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                >
                  <button
                    type="button"
                    className="bg-gray-200 p-1 rounded-full text-gray-700 
                  hover:text-black focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-offset-gray-200 
                  focus:ring-black"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3 z-10">
                    <div>
                      <Menu.Button
                        className="bg-gray-200 flex text-sm 
                    rounded-full focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-offset-gray-200 
                    focus:ring-black"
                      >
                        <span className="sr-only">Open user menu</span>
                        <Avatar
                          className="h-8 w-8 rounded-full"
                          {...stringAvatar(
                            { name: user.name, url: user.image },
                            {
                              width: 40,
                              height: 40,
                            }
                          )}
                          variant="circular"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/home/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={async () => {
                                await axios({
                                  url: `${environment.api}logout`,
                                  method: "POST",
                                  withCredentials: true,
                                })
                                  .then((res) => {
                                    console.log(res);
                                    login({ isLogin: false });
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                                // logout();
                              }}
                            >
                              Logout
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div
                  className="absolute inset-y-0 right-0 flex items-center 
              pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                >
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3 z-10">
                    <div>
                      <Menu.Button
                        className="bg-gray-200 flex text-sm 
                    rounded-full focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-offset-gray-200 
                    focus:ring-black"
                      >
                        <span className="sr-only">Open user menu</span>
                        <Avatar
                          className="h-8 w-8 rounded-full"
                          {...stringAvatar(
                            { name: "Normal", url: "" },
                            {
                              width: 40,
                              height: 40,
                            }
                          )}
                          variant="circular"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/home/login"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Login
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/home/register"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Register
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                return (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.to}
                    className={classNames(
                      (item.to === "/" && location.pathname === "/") ||
                        (location.pathname.match(
                          new RegExp(`\\` + item.to + "*")
                        ) &&
                          item.to !== "/")
                        ? "bg-gray-200 text-black"
                        : "text-gray-600 hover:bg-gray-300 hover:text-black",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={
                      (item.to === "/" && location.pathname === "/") ||
                      (location.pathname.match(
                        new RegExp(`\\` + item.to + "*")
                      ) &&
                        item.to !== "/")
                        ? "page"
                        : undefined
                    }
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

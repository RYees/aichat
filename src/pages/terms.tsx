import React from "react";
import Link from "next/link";
const documentURL =
  "https://docs.google.com/document/d/1XrnU2wwJihV17SMvvBS9rjPEitSlrmkH7750nJ5q_Bs/edit?usp=sharing";

const Terms = () => {
  return (
    <div>
      {/* <header className="fixed z-30 mb-28 w-full transition duration-300 ease-in-out md:bg-opacity-90">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex h-16 items-center justify-between md:h-20">
            <div className="mr-4 shrink-0">
              <a className="block" aria-label="Cruip" href="/">

                <h1 className="bold text-3xl">INCHY</h1>

              </a>
            </div>
            <nav className="hidden md:flex md:grow">
              <ul className="flex grow flex-wrap items-center justify-end">
                <li>
                  <a
                    className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                    href="/signin"
                  >
                    Sign in
                  </a>
                </li>
                <li>
                  <a
                    className="btn-sm ml-3 bg-gray-900 text-gray-200 hover:bg-gray-800"
                    href="/signup"
                  >
                    <span>Sign up</span>
                    <svg
                      className="-mr-1 ml-2 h-3 w-3 shrink-0 fill-current text-gray-400"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
            <div className="flex md:hidden">
              <button
                className="hamburger false"
                aria-controls="mobile-nav"
                aria-expanded="false"
              >
                <span className="sr-only">Menu</span>
                <svg
                  className="h-6 w-6 fill-current text-gray-900"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect y={4} width={24} height={2} />
                  <rect y={11} width={24} height={2} />
                  <rect y={18} width={24} height={2} />
                </svg>
              </button>
              <div />
            </div>
          </div>
        </div>
      </header> */}
      <iframe
        src={documentURL}
        width="70%"
        height="600px"
        className="mx-auto "
      />
    </div>
  );
};

export default Terms;

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import Header from "~/components/Header/Header";
import Sidebar from "~/components/Sidebar/Sidebar";
import Characters from "~/components/Characters/Characters";
import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import FancyTestimonialsSlider from "~/components/testimonials";
import AuthModal from "~/components/helper/AuthModal";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import analytics from "~/utils/analytics";

function HomePage(props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  const { data: session, status } = useSession();
  const user = session?.user;
  // console.log("connected", user);

  useEffect(() => {
    analytics.identify(user?.id, {
      email: user?.email,
    });
    analytics.track("page_viewed", {
      flow: "landing",
      time: new Date(),
    });
  }, []);

  return (
    <>
      <>
        <AuthModal show={showModal} onClose={closeModal} />
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          <header className="fixed z-30 w-full transition duration-300 ease-in-out md:bg-opacity-90 ">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <div className="flex h-16 items-center md:justify-between md:h-20 mb-96">
                <div className="mr-4 shrink-0">
                  <a className="block" aria-label="Cruip" href="/">
                    {/* <svg
                      className="h-8 w-8"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <radialGradient
                          cx="21.152%"
                          cy="86.063%"
                          fx="21.152%"
                          fy="86.063%"
                          r="79.941%"
                          id="footer-logo"
                        >
                          <stop stopColor="#4FD1C5" offset="0%" />
                          <stop stopColor="#81E6D9" offset="25.871%" />
                          <stop stopColor="#338CF5" offset="100%" />
                        </radialGradient>
                      </defs>
                      <rect
                        width={32}
                        height={32}
                        rx={16}
                        fill="url(#footer-logo)"
                        fillRule="nonzero"
                      />
                    </svg> */}
                    {/* <h1 className="bold text-3xl">INCHY</h1> */}
                    <Image src={"/logo.svg"} height="200" width="200"></Image>
                    {/* <svg
                      className="h-8 w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 0 800 800"
                    >
                      <defs>
                        <filter
                          id="bbblurry-filter"
                          x="-100%"
                          y="-100%"
                          width="400%"
                          height="400%"
                          filterUnits="objectBoundingBox"
                          primitiveUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feGaussianBlur
                            stdDeviation="24"
                            x="0%"
                            y="0%"
                            width="100%"
                            height="100%"
                            in="SourceGraphic"
                            edgeMode="none"
                            result="blur"
                          ></feGaussianBlur>
                        </filter>
                      </defs>
                      <g filter="url(#bbblurry-filter)">
                        <ellipse
                          rx="149.5"
                          ry="150"
                          cx="483.0638732910156"
                          cy="487.22449497402647"
                          fill="hsla(48, 100%, 50%, 1.00)"
                        ></ellipse>
                        <ellipse
                          rx="149.5"
                          ry="150"
                          cx="248.89759674871152"
                          cy="481.3116603671567"
                          fill="hsla(0, 70%, 65%, 1.00)"
                        ></ellipse>
                        <ellipse
                          rx="149.5"
                          ry="150"
                          cx="370.3514798948279"
                          cy="276.64311609717566"
                          fill="hsla(138, 67%, 66%, 1.00)"
                        ></ellipse>
                      </g>
                    </svg> */}
                  </a>
                </div>
                {!user ? (
                  <nav className="md:flex md:grow">
                    <ul className="flex grow flex-wrap items-center justify-end">
                      {/* <li>
                      <a
                        className="flex cursor-pointer items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        // href="/signin"
                        onClick={openModal}
                      >
                        Sign in
                      </a>
                    </li> */}
                      <li>
                        <a
                          className="btn-sm ml-3 cursor-pointer bg-gray-900 text-gray-200 hover:bg-gray-800"
                          //href="/signup"
                          onClick={openModal}
                        >
                          <span style={{ fontFamily: "Unbounded, sans-serif" }} className="text-sm md:text-lg">
                            Sign In
                          </span>
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
                      ) : (
                        <Link
                          className="btn-sm ml-3 cursor-pointer bg-gray-900 text-gray-200 hover:bg-gray-800"
                          href="/dashboard"
                        >
                          <span className="text-sm md:text-lg">Go to app</span>
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
                        </Link>
                      )}
                {/* <div className="flex md:hidden">
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
                </div> */}
              </div>
            </div>
          </header>
          <main className="grow bg-gray-50">
            <section
              className="relative flex  min-h-screen items-center justify-center bg-gray-50"
              id="hero"
            >
              <div
                className="-z-1 pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 transform"
                aria-hidden="true"
              >
                <svg
                  width={1360}
                  height={578}
                  viewBox="0 0 1360 578"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      x1="50%"
                      y1="0%"
                      x2="50%"
                      y2="100%"
                      id="illustration-01"
                    >
                      <stop stopColor="#FFF" offset="0%" />
                      <stop stopColor="#EAEAEA" offset="77.402%" />
                      <stop stopColor="#DFDFDF" offset="100%" />
                    </linearGradient>
                  </defs>
                  <g fill="url(#illustration-01)" fillRule="evenodd">
                    <circle cx={1232} cy={128} r={128} />
                    <circle cx={155} cy={443} r={64} />
                  </g>
                </svg>
              </div>
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="pb-12 pt-32 md:pb-20 md:pt-40">
                  <div className="pb-12 text-center md:pb-16">
                    <h1
                      style={{ fontFamily: "Unbounded, sans-serif" }}
                      className="leading-tighter font-unbounded  aos-init aos-animate mb-4 text-5xl text-6xl font-extrabold tracking-tighter"
                      data-aos="zoom-y-out"
                    >
                      Double Your Earnings with
                      <br />
                      <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                        Digital Replica
                      </span>
                    </h1>
                    <div className="mx-auto max-w-3xl">
                      <p
                        style={{ fontFamily: "Unbounded, sans-serif" }}
                        className="aos-init aos-animate mb-8 text-xl text-gray-600"
                        data-aos="zoom-y-out"
                        data-aos-delay={150}
                      >
                        Create a unique digital version of yourself and engage
                        with fans like never before.
                      </p>
                      <div
                        className="aos-init aos-animate mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                        data-aos="zoom-y-out"
                        data-aos-delay={300}
                      >
                        <div>
                          <Link
                            className="btn mb-4 w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:bg-orange-700 sm:mb-0 sm:w-auto"
                            // target="_blank"
                            href="/start"
                            style={{ fontFamily: "Unbounded, sans-serif" }}
                          >
                            Get Started for Free
                          </Link>
                        </div>
                        {/* <div>
                          <a
                            className="btn w-full bg-gray-900 text-white hover:bg-gray-800 sm:ml-4 sm:w-auto"
                            href="#0"
                          >
                            Learn more
                          </a>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div
                        className="aos-init aos-animate relative mb-8 flex justify-center"
                        data-aos="zoom-y-out"
                        data-aos-delay={450}
                      >
                        <div className="flex flex-col justify-center">
                          {/* <svg
                            width={768}
                            height={432}
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            viewBox="0 0 800 800"
                          >
                            <defs>
                              <linearGradient
                                x1="50%"
                                y1="0%"
                                x2="50%"
                                y2="100%"
                                id="hhhorizon-grad"
                              >
                                <stop
                                  stopColor="hsl(37, 99%, 67%)"
                                  stop-opacity="1"
                                  offset="25%"
                                ></stop>
                                <stop
                                  stopColor="hsl(316, 73%, 52%)"
                                  stop-opacity="1"
                                  offset="100%"
                                ></stop>
                              </linearGradient>
                              <linearGradient
                                x1="50%"
                                y1="0%"
                                x2="50%"
                                y2="100%"
                                id="hhhorizon-grad2"
                              >
                                <stop
                                  stopColor="hsl(316, 73%, 52%)"
                                  stop-opacity="1"
                                  offset="0%"
                                ></stop>
                                <stop
                                  stopColor="hsl(37, 99%, 67%)"
                                  stop-opacity="1"
                                  offset="75%"
                                ></stop>
                              </linearGradient>
                              <clipPath id="SvgjsClipPath1023">
                                <rect
                                  width="800"
                                  height="35"
                                  x="0"
                                  y="0"
                                ></rect>
                                <rect
                                  width="800"
                                  height="34"
                                  x="0"
                                  y="24"
                                ></rect>
                                <rect
                                  width="800"
                                  height="33"
                                  x="0"
                                  y="47"
                                ></rect>
                                <rect
                                  width="800"
                                  height="32"
                                  x="0"
                                  y="71"
                                ></rect>
                                <rect
                                  width="800"
                                  height="31"
                                  x="0"
                                  y="94"
                                ></rect>
                                <rect
                                  width="800"
                                  height="30"
                                  x="0"
                                  y="118"
                                ></rect>
                                <rect
                                  width="800"
                                  height="29"
                                  x="0"
                                  y="141"
                                ></rect>
                                <rect
                                  width="800"
                                  height="28"
                                  x="0"
                                  y="165"
                                ></rect>
                                <rect
                                  width="800"
                                  height="27"
                                  x="0"
                                  y="188"
                                ></rect>
                                <rect
                                  width="800"
                                  height="26"
                                  x="0"
                                  y="212"
                                ></rect>
                                <rect
                                  width="800"
                                  height="25"
                                  x="0"
                                  y="235"
                                ></rect>
                                <rect
                                  width="800"
                                  height="24"
                                  x="0"
                                  y="259"
                                ></rect>
                                <rect
                                  width="800"
                                  height="23"
                                  x="0"
                                  y="282"
                                ></rect>
                                <rect
                                  width="800"
                                  height="22"
                                  x="0"
                                  y="306"
                                ></rect>
                                <rect
                                  width="800"
                                  height="21"
                                  x="0"
                                  y="329"
                                ></rect>
                                <rect
                                  width="800"
                                  height="20"
                                  x="0"
                                  y="353"
                                ></rect>
                                <rect
                                  width="800"
                                  height="19"
                                  x="0"
                                  y="376"
                                ></rect>
                                <rect
                                  width="800"
                                  height="18"
                                  x="0"
                                  y="400"
                                ></rect>
                                <rect
                                  width="800"
                                  height="17"
                                  x="0"
                                  y="424"
                                ></rect>
                                <rect
                                  width="800"
                                  height="16"
                                  x="0"
                                  y="447"
                                ></rect>
                                <rect
                                  width="800"
                                  height="15"
                                  x="0"
                                  y="471"
                                ></rect>
                                <rect
                                  width="800"
                                  height="14"
                                  x="0"
                                  y="494"
                                ></rect>
                                <rect
                                  width="800"
                                  height="13"
                                  x="0"
                                  y="518"
                                ></rect>
                                <rect
                                  width="800"
                                  height="12"
                                  x="0"
                                  y="541"
                                ></rect>
                                <rect
                                  width="800"
                                  height="11"
                                  x="0"
                                  y="565"
                                ></rect>
                                <rect
                                  width="800"
                                  height="10"
                                  x="0"
                                  y="588"
                                ></rect>
                                <rect
                                  width="800"
                                  height="9"
                                  x="0"
                                  y="612"
                                ></rect>
                                <rect
                                  width="800"
                                  height="8"
                                  x="0"
                                  y="635"
                                ></rect>
                                <rect
                                  width="800"
                                  height="7"
                                  x="0"
                                  y="659"
                                ></rect>
                                <rect
                                  width="800"
                                  height="6"
                                  x="0"
                                  y="682"
                                ></rect>
                                <rect
                                  width="800"
                                  height="5"
                                  x="0"
                                  y="706"
                                ></rect>
                                <rect
                                  width="800"
                                  height="4"
                                  x="0"
                                  y="729"
                                ></rect>
                                <rect
                                  width="800"
                                  height="3"
                                  x="0"
                                  y="753"
                                ></rect>
                                <rect
                                  width="800"
                                  height="2"
                                  x="0"
                                  y="776"
                                ></rect>
                                <rect
                                  width="800"
                                  height="1"
                                  x="0"
                                  y="800"
                                ></rect>
                              </clipPath>
                              <clipPath>
                                <rect
                                  width="800"
                                  height="1"
                                  x="0"
                                  y="35"
                                ></rect>
                                <rect
                                  width="800"
                                  height="2"
                                  x="0"
                                  y="70"
                                ></rect>
                                <rect
                                  width="800"
                                  height="3"
                                  x="0"
                                  y="105"
                                ></rect>
                                <rect
                                  width="800"
                                  height="4"
                                  x="0"
                                  y="140"
                                ></rect>
                                <rect
                                  width="800"
                                  height="5"
                                  x="0"
                                  y="175"
                                ></rect>
                                <rect
                                  width="800"
                                  height="6"
                                  x="0"
                                  y="210"
                                ></rect>
                                <rect
                                  width="800"
                                  height="7"
                                  x="0"
                                  y="245"
                                ></rect>
                                <rect
                                  width="800"
                                  height="8"
                                  x="0"
                                  y="280"
                                ></rect>
                                <rect
                                  width="800"
                                  height="9"
                                  x="0"
                                  y="315"
                                ></rect>
                                <rect
                                  width="800"
                                  height="10"
                                  x="0"
                                  y="350"
                                ></rect>
                                <rect
                                  width="800"
                                  height="11"
                                  x="0"
                                  y="385"
                                ></rect>
                                <rect
                                  width="800"
                                  height="12"
                                  x="0"
                                  y="420"
                                ></rect>
                                <rect
                                  width="800"
                                  height="13"
                                  x="0"
                                  y="455"
                                ></rect>
                                <rect
                                  width="800"
                                  height="14"
                                  x="0"
                                  y="490"
                                ></rect>
                                <rect
                                  width="800"
                                  height="15"
                                  x="0"
                                  y="525"
                                ></rect>
                                <rect
                                  width="800"
                                  height="16"
                                  x="0"
                                  y="560"
                                ></rect>
                                <rect
                                  width="800"
                                  height="17"
                                  x="0"
                                  y="595"
                                ></rect>
                                <rect
                                  width="800"
                                  height="18"
                                  x="0"
                                  y="630"
                                ></rect>
                                <rect
                                  width="800"
                                  height="19"
                                  x="0"
                                  y="665"
                                ></rect>
                                <rect
                                  width="800"
                                  height="20"
                                  x="0"
                                  y="700"
                                ></rect>
                                <rect
                                  width="800"
                                  height="21"
                                  x="0"
                                  y="735"
                                ></rect>
                                <rect
                                  width="800"
                                  height="22"
                                  x="0"
                                  y="770"
                                ></rect>
                                <rect
                                  width="800"
                                  height="23"
                                  x="0"
                                  y="805"
                                ></rect>
                              </clipPath>
                            </defs>
                            <rect
                              width="800"
                              height="800"
                              fill="url(#hhhorizon-grad)"
                              clip-path='url("#SvgjsClipPath1023")'
                            ></rect>
                            <circle
                              r="400"
                              cx="800"
                              cy="400"
                              fill="url(#hhhorizon-grad2)"
                              clip-path='url("#SvgjsClipPath1023")'
                            ></circle>
                            <circle
                              r="400"
                              cx="0"
                              cy="400"
                              fill="url(#hhhorizon-grad2)"
                              clip-path='url("#SvgjsClipPath1023")'
                            ></circle>
                          </svg> */}
                          {/* <svg
                            className="absolute inset-0 mx-auto h-auto max-w-full md:max-w-none"
                            width={768}
                            height={432}
                            viewBox="0 0 768 432"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <defs>
                              <linearGradient
                                x1="50%"
                                y1="0%"
                                x2="50%"
                                y2="100%"
                                id="hero-ill-a"
                              >
                                <stop stopColor="#FFF" offset="0%" />
                                <stop stopColor="#EAEAEA" offset="77.402%" />
                                <stop stopColor="#DFDFDF" offset="100%" />
                              </linearGradient>
                              <linearGradient
                                x1="50%"
                                y1="0%"
                                x2="50%"
                                y2="99.24%"
                                id="hero-ill-b"
                              >
                                <stop stopColor="#FFF" offset="0%" />
                                <stop stopColor="#EAEAEA" offset="48.57%" />
                                <stop
                                  stopColor="#DFDFDF"
                                  stopOpacity={0}
                                  offset="100%"
                                />
                              </linearGradient>
                              <radialGradient
                                cx="21.152%"
                                cy="86.063%"
                                fx="21.152%"
                                fy="86.063%"
                                r="79.941%"
                                id="hero-ill-e"
                              >
                                <stop stopColor="#4FD1C5" offset="0%" />
                                <stop stopColor="#81E6D9" offset="25.871%" />
                                <stop stopColor="#338CF5" offset="100%" />
                              </radialGradient>
                              <circle
                                id="hero-ill-d"
                                cx={384}
                                cy={216}
                                r={64}
                              />
                            </defs>
                            <g fill="none" fillRule="evenodd">
                              <circle
                                fillOpacity=".04"
                                fill="url(#hero-ill-a)"
                                cx={384}
                                cy={216}
                                r={128}
                              />
                              <circle
                                fillOpacity=".16"
                                fill="url(#hero-ill-b)"
                                cx={384}
                                cy={216}
                                r={96}
                              />
                              <g fillRule="nonzero">
                                <use fill="#000" xlinkHref="#hero-ill-d" />
                                <use
                                  fill="url(#hero-ill-e)"
                                  xlinkHref="#hero-ill-d"
                                />
                              </g>
                            </g>
                          </svg> */}
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            className="absolute inset-0 mx-auto h-auto max-w-full md:max-w-none"
                            width={768}
                            height={432}
                            viewBox="0 0 800 800"
                          >
                            <defs>
                              <radialGradient
                                id="sssurface-grad-dark"
                                r="75%"
                                cx="20%"
                                cy="20%"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="hsla(30, 100%, 50%, 1.00)"
                                  stop-opacity="0"
                                ></stop>
                                <stop
                                  offset="100%"
                                  stopColor="#c55100"
                                  stop-opacity="1"
                                ></stop>
                              </radialGradient>
                              <radialGradient
                                id="sssurface-grad-light"
                                r="25%"
                                cx="30%"
                                cy="30%"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#ffb143"
                                  stop-opacity="0.75"
                                ></stop>
                                <stop
                                  offset="100%"
                                  stopColor="hsla(30, 100%, 50%, 1.00)"
                                  stop-opacity="0"
                                ></stop>
                              </radialGradient>
                              <filter
                                id="sssurface-blur"
                                x="-100%"
                                y="-100%"
                                width="400%"
                                height="400%"
                                filterUnits="objectBoundingBox"
                                primitiveUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                              >
                                <feGaussianBlur
                                  stdDeviation="30"
                                  x="0%"
                                  y="0%"
                                  width="100%"
                                  height="100%"
                                  in="SourceGraphic"
                                  edgeMode="none"
                                  result="blur"
                                ></feGaussianBlur>
                              </filter>
                            </defs>
                            <g>
                              <ellipse
                                rx="150"
                                ry="75"
                                cx="450"
                                cy="500"
                                fill="#8e2100"
                                opacity="0.25"
                                filter="url(#sssurface-blur)"
                              ></ellipse>
                              <circle
                                r="150"
                                cx="400"
                                cy="400"
                                fill="hsla(30, 100%, 50%, 1.00)"
                              ></circle>
                              <circle
                                r="150"
                                cx="400"
                                cy="400"
                                fill="url(#sssurface-grad-dark)"
                              ></circle>
                              <circle
                                r="150"
                                cx="400"
                                cy="400"
                                fill="url(#sssurface-grad-light)"
                              ></circle>
                            </g>
                          </svg> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="relative">
              <div
                className="pointer-events-none absolute inset-0 mb-16 "
                aria-hidden="true"
              />
              <div className="absolute left-0 right-0 m-auto h-20 w-px -translate-y-1/2 transform  p-px" />
              <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                <div className="pt-12 md:pt-20">
                  <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
                    <h2
                      style={{ fontFamily: "Unbounded, sans-serif" }}
                      className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
                    >
                      Benefits
                    </h2>
                    {/* <p className="text-xl text-gray-600">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur excepteur sint
                      occaecat cupidatat.
                    </p> */}
                  </div>
                  <div className="md:grid md:grid-cols-12 md:gap-6">
                    <div
                      className="aos-init mx-auto h-screen max-w-xl md:col-span-7 md:mt-6 md:w-full md:max-w-none lg:col-span-6"
                      data-aos="fade-right"
                    >
                      <div className="mb-8 md:mb-0">
                        <a
                          className="mb-3 flex items-center rounded border border-gray-200  bg-white p-5  text-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg "
                          href="#0"
                        >
                          <div>
                            <div className="mb-1 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text font-bold leading-snug tracking-tight text-transparent">
                              Double Your Earnings:
                            </div>
                            <div className="text-gray-600">
                              One of you, twice the income. Your digital replica
                              works to increase your income without any extra
                              work on your end.
                            </div>
                          </div>
                          <div className="ml-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow">
                            <svg
                              className="h-3 w-3 fill-current"
                              viewBox="0 0 12 12"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                            </svg>
                          </div>
                        </a>
                        <a
                          className="mb-3 flex items-center rounded border border-gray-200 bg-white p-5 text-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                          href="#0"
                        >
                          <div>
                            <div className="mb-1 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text font-bold leading-snug tracking-tight text-transparent">
                              Increased Fan Engagement:
                            </div>
                            <div className="text-gray-600">
                              Boost your fans' experience with personalized
                              one-on-one interactions, increasing their loyalty
                              and willingness to support your content.
                            </div>
                          </div>
                          <div className="ml-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow">
                            <svg
                              className="h-3 w-3 fill-current"
                              viewBox="0 0 12 12"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z"
                                fillRule="nonzero"
                              />
                            </svg>
                          </div>
                        </a>
                        <a
                          className="mb-3 flex items-center rounded border border-gray-200 bg-white p-5 text-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                          href="#0"
                        >
                          <div>
                            <div className="mb-1 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text font-bold leading-snug tracking-tight text-transparent">
                              24/7 Accessibility:
                            </div>
                            <div className="text-gray-600">
                              Your AI avatar doesn't sleep or take breaks,
                              providing your fans with constant access and
                              engagement, even when you're not available.
                            </div>
                          </div>
                          <div className="ml-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow">
                            <svg
                              className="h-3 w-3 fill-current"
                              viewBox="0 0 12 12"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.334 8.06a.5.5 0 00-.421-.237 6.023 6.023 0 01-5.905-6c0-.41.042-.82.125-1.221a.5.5 0 00-.614-.586 6 6 0 106.832 8.529.5.5 0 00-.017-.485z"
                                fill="#191919"
                                fillRule="nonzero"
                              />
                            </svg>
                          </div>
                        </a>
                        <a
                          className="mb-3 flex items-center rounded border border-gray-200 bg-white p-5 text-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                          href="#0"
                        >
                          <div>
                            <div className="mb-1 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text font-bold leading-snug tracking-tight text-transparent ">
                              Preserved Authenticity:
                            </div>
                            <div className="text-gray-600">
                              Avatar is built using your unique characteristics
                              and voice, maintaining the authenticity that your
                              fans love, in a new and engaging format.
                            </div>
                          </div>
                          <div className="ml-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-600 group-hover:text-white"
                            >
                              <path
                                d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12C22 9.79086 17.5228 8 12 8C6.47715 8 2 9.79086 2 12M22 12C22 14.2091 17.5228 16 12 16C6.47715 16 2 14.2091 2 12M12 22C6.47715 22 2 17.5228 2 12M12 22C14.2091 22 16 17.5228 16 12C16 6.47715 14.2091 2 12 2M12 22C9.79086 22 8 17.5228 8 12C8 6.47715 9.79086 2 12 2M2 12C2 6.47715 6.47715 2 12 2"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="mx-auto mb-8 max-w-xl md:order-1 md:col-span-5 md:mb-0 md:w-full md:max-w-none lg:col-span-6">
                      <div className="transition-all" style={{ height: 468 }}>
                        <div
                          className="aos-init relative flex flex-col text-center lg:text-right"
                          data-aos="zoom-y-out"
                        >
                          <div className="w-full translate-y-0 opacity-100">
                            <div className="relative inline-flex flex-col">
                              {/* <img
                                alt="Features bg"
                                loading="lazy"
                                width={500}
                                height={462}
                                decoding="async"
                                data-nimg={1}
                                className="mx-auto rounded md:max-w-none"
                                srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=640&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=1080&q=75 2x"
                                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=1080&q=75"
                                style={{ color: "transparent" }}
                              />
                              <img
                                alt="Element"
                                loading="lazy"
                                width={500}
                                height={44}
                                decoding="async"
                                data-nimg={1}
                                className="animate-float absolute left-0 w-full transform md:max-w-none"
                                srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=640&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=1080&q=75 2x"
                                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=1080&q=75"
                                style={{ color: "transparent", top: "30%" }}
                              /> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                height={400}
                                width={400}
                                viewBox="0 0 800 800"
                                className=" ml-60 mt-40 hidden scale-150 lg:block"
                              >
                                <defs>
                                  <linearGradient
                                    x1="50%"
                                    y1="0%"
                                    x2="50%"
                                    y2="100%"
                                    id="hhhorizon-grad"
                                  >
                                    <stop
                                      stopColor="hsl(37, 99%, 67%)"
                                      stop-opacity="1"
                                      offset="25%"
                                    ></stop>
                                    <stop
                                      stopColor="hsl(0, 100%, 50%)"
                                      stop-opacity="1"
                                      offset="100%"
                                    ></stop>
                                  </linearGradient>
                                  <linearGradient
                                    x1="50%"
                                    y1="0%"
                                    x2="50%"
                                    y2="100%"
                                    id="hhhorizon-grad2"
                                  >
                                    <stop
                                      stopColor="hsl(0, 100%, 50%)"
                                      stop-opacity="1"
                                      offset="0%"
                                    ></stop>
                                    <stop
                                      stopColor="hsl(37, 99%, 67%)"
                                      stop-opacity="1"
                                      offset="75%"
                                    ></stop>
                                  </linearGradient>
                                  <clipPath id="SvgjsClipPath1034">
                                    <rect
                                      width="800"
                                      height="35"
                                      x="0"
                                      y="0"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="34"
                                      x="0"
                                      y="24"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="33"
                                      x="0"
                                      y="47"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="32"
                                      x="0"
                                      y="71"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="31"
                                      x="0"
                                      y="94"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="30"
                                      x="0"
                                      y="118"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="29"
                                      x="0"
                                      y="141"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="28"
                                      x="0"
                                      y="165"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="27"
                                      x="0"
                                      y="188"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="26"
                                      x="0"
                                      y="212"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="25"
                                      x="0"
                                      y="235"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="24"
                                      x="0"
                                      y="259"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="23"
                                      x="0"
                                      y="282"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="22"
                                      x="0"
                                      y="306"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="21"
                                      x="0"
                                      y="329"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="20"
                                      x="0"
                                      y="353"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="19"
                                      x="0"
                                      y="376"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="18"
                                      x="0"
                                      y="400"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="17"
                                      x="0"
                                      y="424"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="16"
                                      x="0"
                                      y="447"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="15"
                                      x="0"
                                      y="471"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="14"
                                      x="0"
                                      y="494"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="13"
                                      x="0"
                                      y="518"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="12"
                                      x="0"
                                      y="541"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="11"
                                      x="0"
                                      y="565"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="10"
                                      x="0"
                                      y="588"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="9"
                                      x="0"
                                      y="612"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="8"
                                      x="0"
                                      y="635"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="7"
                                      x="0"
                                      y="659"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="6"
                                      x="0"
                                      y="682"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="5"
                                      x="0"
                                      y="706"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="4"
                                      x="0"
                                      y="729"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="3"
                                      x="0"
                                      y="753"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="2"
                                      x="0"
                                      y="776"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="1"
                                      x="0"
                                      y="800"
                                    ></rect>
                                  </clipPath>
                                  <clipPath>
                                    <rect
                                      width="800"
                                      height="1"
                                      x="0"
                                      y="35"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="2"
                                      x="0"
                                      y="70"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="3"
                                      x="0"
                                      y="105"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="4"
                                      x="0"
                                      y="140"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="5"
                                      x="0"
                                      y="175"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="6"
                                      x="0"
                                      y="210"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="7"
                                      x="0"
                                      y="245"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="8"
                                      x="0"
                                      y="280"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="9"
                                      x="0"
                                      y="315"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="10"
                                      x="0"
                                      y="350"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="11"
                                      x="0"
                                      y="385"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="12"
                                      x="0"
                                      y="420"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="13"
                                      x="0"
                                      y="455"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="14"
                                      x="0"
                                      y="490"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="15"
                                      x="0"
                                      y="525"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="16"
                                      x="0"
                                      y="560"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="17"
                                      x="0"
                                      y="595"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="18"
                                      x="0"
                                      y="630"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="19"
                                      x="0"
                                      y="665"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="20"
                                      x="0"
                                      y="700"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="21"
                                      x="0"
                                      y="735"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="22"
                                      x="0"
                                      y="770"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="23"
                                      x="0"
                                      y="805"
                                    ></rect>
                                  </clipPath>
                                </defs>
                                <rect
                                  width="800"
                                  height="800"
                                  fill="url(#hhhorizon-grad)"
                                  clip-path='url("#SvgjsClipPath1034")'
                                ></rect>
                                <circle
                                  r="400"
                                  cx="400"
                                  cy="0"
                                  fill="url(#hhhorizon-grad)"
                                  clip-path='url("#SvgjsClipPath1034")'
                                ></circle>
                                <circle
                                  r="400"
                                  cx="400"
                                  cy="800"
                                  fill="url(#hhhorizon-grad)"
                                  clip-path='url("#SvgjsClipPath1034")'
                                ></circle>
                              </svg>
                            </div>
                          </div>
                          <div
                            className="w-full -translate-y-16 opacity-0"
                            hidden=""
                            style={{ display: "none" }}
                          >
                            <div className="relative inline-flex flex-col">
                              <img
                                alt="Features bg"
                                loading="lazy"
                                width={500}
                                height={462}
                                decoding="async"
                                data-nimg={1}
                                className="mx-auto rounded md:max-w-none"
                                srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=640&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=1080&q=75 2x"
                                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=1080&q=75"
                                style={{ color: "transparent" }}
                              />
                              <img
                                alt="Element"
                                loading="lazy"
                                width={500}
                                height={44}
                                decoding="async"
                                data-nimg={1}
                                className="animate-float absolute left-0 w-full transform md:max-w-none"
                                srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=640&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=1080&q=75 2x"
                                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=1080&q=75"
                                style={{ color: "transparent", top: "30%" }}
                              />
                            </div>
                          </div>
                          <div
                            className="w-full -translate-y-16 opacity-0"
                            hidden=""
                            style={{ display: "none" }}
                          >
                            <div className="relative inline-flex flex-col">
                              <img
                                alt="Features bg"
                                loading="lazy"
                                width={500}
                                height={462}
                                decoding="async"
                                data-nimg={1}
                                className="mx-auto rounded md:max-w-none"
                                srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=640&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=1080&q=75 2x"
                                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=1080&q=75"
                                style={{ color: "transparent" }}
                              />
                              <img
                                alt="Element"
                                loading="lazy"
                                width={500}
                                height={44}
                                decoding="async"
                                data-nimg={1}
                                className="animate-float absolute left-0 w-full transform md:max-w-none"
                                srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=640&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=1080&q=75 2x"
                                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=1080&q=75"
                                style={{ color: "transparent", top: "30%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* how it works section */}
            {/* <section className="relative ">
              <div
                className="pointer-events-none absolute inset-0 mb-16 "
                aria-hidden="true"
              />
              <div className="absolute left-0 right-0 m-auto h-20 w-px -translate-y-1/2 transform  p-px" />
              <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                <div className="pt-12 md:pt-20">
                  <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
                    <h1 className="mb-4 text-5xl text-gray-700">
                      How it works
                    </h1>

                  </div>
                  <div className="md:grid md:grid-cols-12 md:gap-6">
                    <div
                      className="aos-init mx-auto h-screen max-w-xl md:col-span-7 md:mt-6 md:w-full md:max-w-none lg:col-span-6"
                      data-aos="fade-right"
                    >
                      <div className="mb-8 md:mb-0">
                        <a
                          className="mb-3 flex items-center rounded border border-gray-200 bg-white p-5 text-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                          href="#0"
                        >
                          <div>
                            <div className="mb-1 font-bold leading-snug tracking-tight">
                              Step 1:
                            </div>
                            <div className="text-gray-600">
                              Describe yourself and your personality.
                            </div>
                          </div>
                        </a>
                        <a
                          className="mb-3 flex items-center rounded border border-gray-200 bg-white p-5 text-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                          href="#0"
                        >
                          <div>
                            <div className="mb-1 font-bold leading-snug tracking-tight">
                              Step 2:
                            </div>
                            <div className="text-gray-600">
                              Record your voice.
                            </div>
                          </div>
                        </a>
                        <a
                          className="mb-3 flex items-center rounded border border-gray-200 bg-white p-5 text-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                          href="#0"
                        >
                          <div>
                            <div className="mb-1 font-bold leading-snug tracking-tight">
                              Step 3:
                            </div>
                            <div className="text-gray-600">
                              We create your own unique AI replica.
                            </div>
                          </div>
                        </a>
                        <a
                          className="mb-3 flex items-center rounded border border-gray-200 bg-white p-5 text-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                          href="#0"
                        >
                          <div>
                            <div className="mb-1 font-bold leading-snug tracking-tight">
                              Step 4:
                            </div>
                            <div className="text-gray-600">
                              Engage with fans without any effort.
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="mx-auto mb-8 max-w-xl md:order-1 md:col-span-5 md:mb-0 md:w-full md:max-w-none lg:col-span-6">
                      <div className="transition-all" style={{ height: 468 }}>
                        <div
                          className="aos-init relative flex flex-col text-center lg:text-right"
                          data-aos="zoom-y-out"
                        >
                          <div className="w-full translate-y-0 opacity-100">
                            <div className="relative inline-flex flex-col">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                height={400}
                                width={400}
                                className=" ml-60 mt-20 hidden scale-125 lg:block"
                                viewBox="0 0 800 800"
                                opacity="1"
                              >
                                <defs>
                                  <linearGradient
                                    x1="50%"
                                    y1="0%"
                                    x2="50%"
                                    y2="100%"
                                    id="hhhorizon-grad"
                                  >
                                    <stop
                                      stopColor="hsl(37, 99%, 67%)"
                                      stop-opacity="1"
                                      offset="25%"
                                    ></stop>
                                    <stop
                                      stopColor="hsl(316, 73%, 52%)"
                                      stop-opacity="1"
                                      offset="100%"
                                    ></stop>
                                  </linearGradient>
                                  <linearGradient
                                    x1="50%"
                                    y1="0%"
                                    x2="50%"
                                    y2="100%"
                                    id="hhhorizon-grad2"
                                  >
                                    <stop
                                      stopColor="hsl(316, 73%, 52%)"
                                      stop-opacity="1"
                                      offset="0%"
                                    ></stop>
                                    <stop
                                      stopColor="hsl(37, 99%, 67%)"
                                      stop-opacity="1"
                                      offset="75%"
                                    ></stop>
                                  </linearGradient>
                                  <clipPath id="SvgjsClipPath1034">
                                    <rect
                                      width="800"
                                      height="47"
                                      x="0"
                                      y="0"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="46"
                                      x="0"
                                      y="17"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="45"
                                      x="0"
                                      y="35"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="44"
                                      x="0"
                                      y="52"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="43"
                                      x="0"
                                      y="70"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="42"
                                      x="0"
                                      y="87"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="41"
                                      x="0"
                                      y="104"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="40"
                                      x="0"
                                      y="122"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="39"
                                      x="0"
                                      y="139"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="38"
                                      x="0"
                                      y="157"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="37"
                                      x="0"
                                      y="174"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="36"
                                      x="0"
                                      y="191"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="35"
                                      x="0"
                                      y="209"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="34"
                                      x="0"
                                      y="226"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="33"
                                      x="0"
                                      y="243"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="32"
                                      x="0"
                                      y="261"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="31"
                                      x="0"
                                      y="278"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="30"
                                      x="0"
                                      y="296"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="29"
                                      x="0"
                                      y="313"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="28"
                                      x="0"
                                      y="330"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="27"
                                      x="0"
                                      y="348"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="26"
                                      x="0"
                                      y="365"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="25"
                                      x="0"
                                      y="383"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="24"
                                      x="0"
                                      y="400"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="23"
                                      x="0"
                                      y="417"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="22"
                                      x="0"
                                      y="435"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="21"
                                      x="0"
                                      y="452"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="20"
                                      x="0"
                                      y="470"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="19"
                                      x="0"
                                      y="487"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="18"
                                      x="0"
                                      y="504"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="17"
                                      x="0"
                                      y="522"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="16"
                                      x="0"
                                      y="539"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="15"
                                      x="0"
                                      y="557"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="14"
                                      x="0"
                                      y="574"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="13"
                                      x="0"
                                      y="591"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="12"
                                      x="0"
                                      y="609"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="11"
                                      x="0"
                                      y="626"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="10"
                                      x="0"
                                      y="643"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="9"
                                      x="0"
                                      y="661"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="8"
                                      x="0"
                                      y="678"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="7"
                                      x="0"
                                      y="696"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="6"
                                      x="0"
                                      y="713"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="5"
                                      x="0"
                                      y="730"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="4"
                                      x="0"
                                      y="748"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="3"
                                      x="0"
                                      y="765"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="2"
                                      x="0"
                                      y="783"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="1"
                                      x="0"
                                      y="800"
                                    ></rect>
                                  </clipPath>
                                  <clipPath>
                                    <rect
                                      width="800"
                                      height="1"
                                      x="0"
                                      y="47"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="2"
                                      x="0"
                                      y="94"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="3"
                                      x="0"
                                      y="141"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="4"
                                      x="0"
                                      y="188"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="5"
                                      x="0"
                                      y="235"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="6"
                                      x="0"
                                      y="282"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="7"
                                      x="0"
                                      y="329"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="8"
                                      x="0"
                                      y="376"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="9"
                                      x="0"
                                      y="423"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="10"
                                      x="0"
                                      y="470"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="11"
                                      x="0"
                                      y="517"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="12"
                                      x="0"
                                      y="564"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="13"
                                      x="0"
                                      y="611"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="14"
                                      x="0"
                                      y="658"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="15"
                                      x="0"
                                      y="705"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="16"
                                      x="0"
                                      y="752"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="17"
                                      x="0"
                                      y="799"
                                    ></rect>
                                    <rect
                                      width="800"
                                      height="18"
                                      x="0"
                                      y="846"
                                    ></rect>
                                  </clipPath>
                                </defs>
                                <rect
                                  width="800"
                                  height="800"
                                  fill="url(#hhhorizon-grad)"
                                  clip-path='url("#SvgjsClipPath1034")'
                                ></rect>
                                <circle
                                  r="400"
                                  cx="800"
                                  cy="400"
                                  fill="url(#hhhorizon-grad2)"
                                  clip-path='url("#SvgjsClipPath1034")'
                                ></circle>
                                <circle
                                  r="400"
                                  cx="0"
                                  cy="400"
                                  fill="url(#hhhorizon-grad2)"
                                  clip-path='url("#SvgjsClipPath1034")'
                                ></circle>
                              </svg>
                            </div>
                          </div>
                          <div
                            className="w-full -translate-y-16 opacity-0"
                            hidden=""
                            style={{ display: "none" }}
                          >
                            <div className="relative inline-flex flex-col">
                              <img
                                alt="Features bg"
                                loading="lazy"
                                width={500}
                                height={462}
                                decoding="async"
                                data-nimg={1}
                                className="mx-auto rounded md:max-w-none"
                                srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=640&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=1080&q=75 2x"
                                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=1080&q=75"
                                style={{ color: "transparent" }}
                              />
                              <img
                                alt="Element"
                                loading="lazy"
                                width={500}
                                height={44}
                                decoding="async"
                                data-nimg={1}
                                className="animate-float absolute left-0 w-full transform md:max-w-none"
                                srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=640&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=1080&q=75 2x"
                                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=1080&q=75"
                                style={{ color: "transparent", top: "30%" }}
                              />
                            </div>
                          </div>
                          <div
                            className="w-full -translate-y-16 opacity-0"
                            hidden=""
                            style={{ display: "none" }}
                          >
                            <div className="relative inline-flex flex-col">
                              <img
                                alt="Features bg"
                                loading="lazy"
                                width={500}
                                height={462}
                                decoding="async"
                                data-nimg={1}
                                className="mx-auto rounded md:max-w-none"
                                srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=640&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=1080&q=75 2x"
                                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-bg.35306e3e.png&w=1080&q=75"
                                style={{ color: "transparent" }}
                              />
                              <img
                                alt="Element"
                                loading="lazy"
                                width={500}
                                height={44}
                                decoding="async"
                                data-nimg={1}
                                className="animate-float absolute left-0 w-full transform md:max-w-none"
                                srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=640&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=1080&q=75 2x"
                                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatures-element.1a5bcb68.png&w=1080&q=75"
                                style={{ color: "transparent", top: "30%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}

            <section
              className="items-center -mt-96 md:mt-40 justify-center bg-gray-50"
              style={{ height: "70vh" }}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <p className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-sm font-bold uppercase tracking-widest text-transparent">
                    How It Works
                  </p>
                  <h2
                    style={{ fontFamily: "Unbounded, sans-serif" }}
                    className="sm:mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
                  >
                    Create your digital replica in 4 easy steps
                  </h2>
                  {/* <p className="mx-auto mt-4 max-w-2xl text-lg font-normal text-gray-700 lg:text-xl lg:leading-8">
                    Create your own blog with us and launch it with just 4 easy
                    steps
                  </p> */}
                </div>
                <ul className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-10 sm:mt-16 lg:mt-20 lg:max-w-5xl lg:grid-cols-4">
                  <li className="flex-start group relative flex lg:flex-col">
                    <span
                      className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:left-auto lg:right-0 lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                      aria-hidden="true"
                    />
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 from-orange-500 to-pink-500 transition-all duration-200 group-hover:border-gray-900  group-hover:bg-gradient-to-r">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5  text-gray-600 group-hover:text-white"
                      >
                        <path
                          d="M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.6569 16.9706 22 12 22C7.02944 22 3 20.6569 3 19V5"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="ml-6 lg:ml-0 lg:mt-10">
                      <h3 className="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                        Step 1:
                      </h3>
                      <h4 className="mt-2 text-base text-gray-700">
                        Describe yourself and your personality.
                      </h4>
                    </div>
                  </li>
                  <li className="flex-start group relative flex lg:flex-col">
                    <span
                      className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:left-auto lg:right-0 lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                      aria-hidden="true"
                    />
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 from-orange-500 to-pink-500 transition-all duration-200 group-hover:border-gray-900  group-hover:bg-gradient-to-r">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600 group-hover:text-white"
                      >
                        <path
                          d="M2 3L2 21M22 3V21M11.8 20H12.2C13.8802 20 14.7202 20 15.362 19.673C15.9265 19.3854 16.3854 18.9265 16.673 18.362C17 17.7202 17 16.8802 17 15.2V8.8C17 7.11984 17 6.27976 16.673 5.63803C16.3854 5.07354 15.9265 4.6146 15.362 4.32698C14.7202 4 13.8802 4 12.2 4H11.8C10.1198 4 9.27976 4 8.63803 4.32698C8.07354 4.6146 7.6146 5.07354 7.32698 5.63803C7 6.27976 7 7.11984 7 8.8V15.2C7 16.8802 7 17.7202 7.32698 18.362C7.6146 18.9265 8.07354 19.3854 8.63803 19.673C9.27976 20 10.1198 20 11.8 20Z"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="ml-6 lg:ml-0 lg:mt-10">
                      <h3 className="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                        Step 2:
                      </h3>
                      <h4 className="mt-2 text-base text-gray-700">
                        Record your voice and video.
                      </h4>
                    </div>
                  </li>
                  <li className="flex-start group relative flex lg:flex-col">
                    <span
                      className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:left-auto lg:right-0 lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                      aria-hidden="true"
                    />
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 from-orange-500 to-pink-500 transition-all duration-200 group-hover:border-gray-900  group-hover:bg-gradient-to-r">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600 group-hover:text-white"
                      >
                        <path
                          d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12C22 9.79086 17.5228 8 12 8C6.47715 8 2 9.79086 2 12M22 12C22 14.2091 17.5228 16 12 16C6.47715 16 2 14.2091 2 12M12 22C6.47715 22 2 17.5228 2 12M12 22C14.2091 22 16 17.5228 16 12C16 6.47715 14.2091 2 12 2M12 22C9.79086 22 8 17.5228 8 12C8 6.47715 9.79086 2 12 2M2 12C2 6.47715 6.47715 2 12 2"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="ml-6 lg:ml-0 lg:mt-10">
                      <h3 className="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                        Step 3:
                      </h3>
                      <h4 className="mt-2 text-base text-gray-700">
                        We create your own unique AI replica.
                      </h4>
                    </div>
                  </li>
                  <li className="flex-start group relative flex lg:flex-col">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 from-orange-500 to-pink-500 transition-all duration-200 group-hover:border-gray-900  group-hover:bg-gradient-to-r">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600 group-hover:text-white"
                      >
                        <path
                          d="M5.50049 10.5L2.00049 7.9999L3.07849 6.92193C3.964 6.03644 4.40676 5.5937 4.9307 5.31387C5.39454 5.06614 5.90267 4.91229 6.42603 4.86114C7.01719 4.80336 7.63117 4.92617 8.85913 5.17177L10.5 5.49997M18.4999 13.5L18.8284 15.1408C19.0742 16.3689 19.1971 16.983 19.1394 17.5743C19.0883 18.0977 18.9344 18.6059 18.6867 19.0699C18.4068 19.5939 17.964 20.0367 17.0783 20.9224L16.0007 22L13.5007 18.5M7 16.9998L8.99985 15M17.0024 8.99951C17.0024 10.1041 16.107 10.9995 15.0024 10.9995C13.8979 10.9995 13.0024 10.1041 13.0024 8.99951C13.0024 7.89494 13.8979 6.99951 15.0024 6.99951C16.107 6.99951 17.0024 7.89494 17.0024 8.99951ZM17.1991 2H16.6503C15.6718 2 15.1826 2 14.7223 2.11053C14.3141 2.20853 13.9239 2.37016 13.566 2.5895C13.1623 2.83689 12.8164 3.18282 12.1246 3.87469L6.99969 9C5.90927 10.0905 5.36406 10.6358 5.07261 11.2239C4.5181 12.343 4.51812 13.6569 5.07268 14.776C5.36415 15.3642 5.90938 15.9094 6.99984 16.9998V16.9998C8.09038 18.0904 8.63565 18.6357 9.22386 18.9271C10.343 19.4817 11.6569 19.4817 12.7761 18.9271C13.3643 18.6356 13.9095 18.0903 15 16.9997L20.1248 11.8745C20.8165 11.1827 21.1624 10.8368 21.4098 10.4331C21.6291 10.0753 21.7907 9.6851 21.8886 9.27697C21.9991 8.81664 21.9991 8.32749 21.9991 7.34918V6.8C21.9991 5.11984 21.9991 4.27976 21.6722 3.63803C21.3845 3.07354 20.9256 2.6146 20.3611 2.32698C19.7194 2 18.8793 2 17.1991 2Z"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="ml-6 lg:ml-0 lg:mt-10">
                      <h3 className="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                        Step 4
                      </h3>
                      <h4 className="mt-2 text-base text-gray-700">
                        Engage with fans without any effort.
                      </h4>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section className="relative   min-h-screen items-center justify-center">
              {/* <div
                className="pointer-events-none absolute inset-0 top-1/2 bg-gradient-to-l from-orange-600 via-orange-500 to-orange-300 md:mt-24 lg:mt-0"
                aria-hidden="true"
              /> */}
              <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                <div className="py-12 md:py-20">
                  <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
                    <h2
                      style={{ fontFamily: "Unbounded, sans-serif" }}
                      className="mt-20 md:mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
                    >
                      Always on your side
                    </h2>
                    {/* <p className="text-xl text-gray-600">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur excepteur sint
                      occaecat cupidatat.
                    </p> */}
                  </div>
                  <div className="mx-auto grid max-w-sm items-start gap-6 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
                    {/* <div className="relative flex flex-col items-center rounded bg-white p-6 shadow-xl">
                      <svg
                        className="-mt-1 mb-2 h-16 w-16 p-1"
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fillRule="evenodd">
                          <rect
                            className="fill-current text-orange-600"
                            width={64}
                            height={64}
                            rx={32}
                          />
                          <g strokeWidth={2}>
                            <path
                              className="stroke-current text-blue-300"
                              d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"
                            />
                            <path
                              className="stroke-current text-white"
                              d="M20.571 37.714h5.715L36.57 26.286h8"
                            />
                            <path
                              className="stroke-current text-blue-300"
                              strokeLinecap="square"
                              d="M41.143 34.286l3.428 3.428-3.428 3.429"
                            />
                            <path
                              className="stroke-current text-white"
                              strokeLinecap="square"
                              d="M41.143 29.714l3.428-3.428-3.428-3.429"
                            />
                          </g>
                        </g>
                      </svg>
                      <h4 className="mb-1 text-xl font-bold leading-snug tracking-tight">
                        Prevent Content Piracy
                      </h4>
                      <p className="text-center text-gray-600">
                        Our robust content protection measures keep your
                        generated content safe.
                      </p>
                    </div> */}
                    <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 shadow-xl">
                      <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300 group-hover:scale-[10]" />
                        <div className="relative z-10 mx-auto max-w-md">
                          <span className="grid h-20 w-20 place-items-center rounded-full bg-orange-500 transition-all duration-300 group-hover:bg-orange-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-10 w-10 text-white transition-all"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                              />
                            </svg>
                          </span>
                          <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                            <p>
                              Our AI protection measures keep your generated
                              content safe.
                            </p>
                          </div>
                          <div className="pt-5 text-base font-semibold leading-7">
                            <p
                              href="#"
                              className="text-orange-400 transition-all duration-300 group-hover:text-white"
                            >
                              Prevent Content Piracy
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 shadow-xl">
                      <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="to-pink-500transition-all absolute top-10 z-0 h-20 w-20 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 duration-300 group-hover:scale-[10]" />
                        <div className="relative z-10 mx-auto max-w-md">
                          <span className="grid h-20 w-20 place-items-center rounded-full bg-orange-500 transition-all duration-300 group-hover:bg-orange-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-10 w-10 text-white transition-all"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                          <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                            <p>
                              Enjoy fair and transparent income payouts with
                              timely processing.
                            </p>
                          </div>
                          <div className="pt-5 text-base font-semibold leading-7">
                            <p>
                              <a
                                href="#"
                                className="text-orange-400 transition-all duration-300 group-hover:text-white"
                              >
                                Fair and Timely Payments
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 shadow-xl">
                      <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300 group-hover:scale-[10]" />
                        <div className="relative z-10 mx-auto max-w-md">
                          <span className="grid h-20 w-20 place-items-center rounded-full bg-orange-500 transition-all duration-300 group-hover:bg-orange-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-10 w-10 text-white transition-all"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                              />
                            </svg>
                          </span>
                          <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                            <p>
                              Our responsive customer support is always ready to
                              assist.
                            </p>
                          </div>
                          <div className="pt-5 text-base font-semibold leading-7">
                            <p>
                              <a
                                href="#"
                                className="text-orange-400 transition-all duration-300 group-hover:text-white"
                              >
                                Direct Support
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="relative flex flex-col items-center rounded bg-white p-6 shadow-xl">
                      <svg
                        className="-mt-1 mb-2 h-16 w-16 p-1"
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fillRule="evenodd">
                          <rect
                            className="fill-current text-blue-600"
                            width={64}
                            height={64}
                            rx={32}
                          />
                          <g strokeWidth={2}>
                            <path
                              className="stroke-current text-white"
                              d="M32 37.714A5.714 5.714 0 0037.714 32a5.714 5.714 0 005.715 5.714"
                            />
                            <path
                              className="stroke-current text-white"
                              d="M32 37.714a5.714 5.714 0 015.714 5.715 5.714 5.714 0 015.715-5.715M20.571 26.286a5.714 5.714 0 005.715-5.715A5.714 5.714 0 0032 26.286"
                            />
                            <path
                              className="stroke-current text-white"
                              d="M20.571 26.286A5.714 5.714 0 0126.286 32 5.714 5.714 0 0132 26.286"
                            />
                            <path
                              className="stroke-current text-blue-300"
                              d="M21.714 40h4.572M24 37.714v4.572M37.714 24h4.572M40 21.714v4.572"
                              strokeLinecap="square"
                            />
                          </g>
                        </g>
                      </svg>
                      <h4 className="mb-1 text-xl font-bold leading-snug tracking-tight">
                        Headless CMS
                      </h4>
                      <p className="text-center text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                    <div className="relative flex flex-col items-center rounded bg-white p-6 shadow-xl">
                      <svg
                        className="-mt-1 mb-2 h-16 w-16 p-1"
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fillRule="evenodd">
                          <rect
                            className="fill-current text-blue-600"
                            width={64}
                            height={64}
                            rx={32}
                          />
                          <g strokeWidth={2}>
                            <path
                              className="stroke-current text-white"
                              d="M19.429 32a12.571 12.571 0 0021.46 8.89L23.111 23.11A12.528 12.528 0 0019.429 32z"
                            />
                            <path
                              className="stroke-current text-blue-300"
                              d="M32 19.429c6.943 0 12.571 5.628 12.571 12.571M32 24a8 8 0 018 8"
                            />
                            <path
                              className="stroke-current text-white"
                              d="M34.286 29.714L32 32"
                            />
                          </g>
                        </g>
                      </svg>
                      <h4 className="mb-1 text-xl font-bold leading-snug tracking-tight">
                        Headless CMS
                      </h4>
                      <p className="text-center text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                    <div className="relative flex flex-col items-center rounded bg-white p-6 shadow-xl">
                      <svg
                        className="-mt-1 mb-2 h-16 w-16 p-1"
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fillRule="evenodd">
                          <rect
                            className="fill-current text-blue-600"
                            width={64}
                            height={64}
                            rx={32}
                          />
                          <g strokeWidth={2} strokeLinecap="square">
                            <path
                              className="stroke-current text-white"
                              d="M29.714 40.358l-4.777 2.51 1.349-7.865-5.715-5.57 7.898-1.147L32 21.13l3.531 7.155 7.898 1.147L40 32.775"
                            />
                            <path
                              className="stroke-current text-blue-300"
                              d="M44.571 43.429H34.286M44.571 37.714H34.286"
                            />
                          </g>
                        </g>
                      </svg>
                      <h4 className="mb-1 text-xl font-bold leading-snug tracking-tight">
                        Headless CMS
                      </h4>
                      <p className="text-center text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </section>
            <section className="relative min-h-screen   justify-center text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-700">
                What creators say
              </p>
              <h2
                style={{ fontFamily: "Unbounded, sans-serif" }}
                className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
              >
                Testimonials
              </h2>
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 -mb-32 -translate-x-1/2 transform"
                aria-hidden="true"
              >
                <svg
                  width={1760}
                  height={518}
                  viewBox="0 0 1760 518"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      x1="50%"
                      y1="0%"
                      x2="50%"
                      y2="100%"
                      id="illustration-02"
                    >
                      <stop stopColor="#FFF" offset="0%" />
                      <stop stopColor="#EAEAEA" offset="77.402%" />
                      <stop stopColor="#DFDFDF" offset="100%" />
                    </linearGradient>
                  </defs>
                  <g
                    transform="translate(0 -3)"
                    fill="url(#illustration-02)"
                    fillRule="evenodd"
                  >
                    <circle cx={1630} cy={128} r={128} />
                    <circle cx={178} cy={481} r={40} />
                  </g>
                </svg>
              </div>
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="py-12 md:py-20">
                  {/* <div className="mx-auto grid max-w-sm grid-cols-4 gap-2 md:max-w-4xl md:grid-cols-5">
                    <div className="col-span-2 flex items-center justify-center py-2 md:col-auto">
                      <svg
                        className="max-w-full fill-current text-gray-400"
                        width={124}
                        height={24}
                        viewBox="0 0 124 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M63.734 11.56c-1.022 0-1.76.325-2.506.657v7.506c.715.066 1.125.066 1.804.066 2.454 0 2.79-1.091 2.79-2.615v-3.585c0-1.125-.384-2.03-2.088-2.03zm-16.295-.41c-1.702 0-2.09.908-2.09 2.032v.632h4.179v-.632c0-1.124-.389-2.032-2.089-2.032zm-31.566 7.813c0 .89.432 1.351 1.386 1.351 1.023 0 1.628-.324 2.375-.656v-1.781h-2.236c-1.06 0-1.525.191-1.525 1.086zm63.711-7.403c-1.705 0-2.296.904-2.296 2.03v4.106c0 1.128.591 2.035 2.296 2.035 1.7 0 2.296-.907 2.296-2.035V13.59c0-1.125-.596-2.03-2.296-2.03zM7.517 23.568H2.505V11.783H0v-4.06h2.505v-2.44C2.505 1.97 3.92 0 7.936 0h3.346v4.062H9.19c-1.565 0-1.668.568-1.668 1.627l-.006 2.033h3.787l-.442 4.06H7.517v11.786zm17.13.03H20.47l-.18-1.026a9.802 9.802 0 01-4.733 1.193c-3.064 0-4.695-1.988-4.695-4.738 0-3.243 1.903-4.401 5.307-4.401h3.465v-.701c0-1.656-.195-2.142-2.817-2.142h-4.286l.419-4.06h4.685c5.751 0 7.013 1.764 7.013 6.235v9.64zm14.207-11.517c-2.6-.433-3.347-.528-4.597-.528-2.247 0-2.926.481-2.926 2.334v3.506c0 1.854.679 2.337 2.926 2.337 1.25 0 1.997-.096 4.597-.531v3.961c-2.277.496-3.76.626-5.015.626-5.381 0-7.52-2.749-7.52-6.72v-2.845c0-3.974 2.139-6.728 7.52-6.728 1.254 0 2.738.13 5.015.629v3.959zm15.686 4.985h-9.192v.327c0 1.854.68 2.337 2.925 2.337 2.02 0 3.252-.096 5.847-.531v3.961c-2.503.496-3.807.626-6.262.626-5.382 0-7.522-2.749-7.522-6.72v-3.253c0-3.474 1.588-6.32 7.103-6.32s7.1 2.813 7.1 6.32v3.253zm16.294.075c0 3.838-1.13 6.638-7.971 6.638-2.47 0-3.92-.21-6.647-.618V1.22l5.01-.812v7.675c1.084-.391 2.485-.59 3.76-.59 5.012 0 5.847 2.183 5.847 5.69v3.958zm16.062.084c0 3.31-1.407 6.522-7.295 6.522-5.891 0-7.325-3.211-7.325-6.522v-3.197c0-3.313 1.434-6.525 7.325-6.525 5.888 0 7.295 3.212 7.295 6.525v3.197zm16.052 0c0 3.31-1.41 6.522-7.296 6.522-5.89 0-7.325-3.211-7.325-6.522v-3.197c0-3.313 1.434-6.525 7.325-6.525 5.887 0 7.296 3.212 7.296 6.525v3.197zm16.473 6.343h-5.432l-4.593-7.449v7.45h-5.013V1.218l5.013-.812v14.388l4.593-7.073h5.432l-5.015 7.718 5.015 8.128zM95.635 11.56c-1.703 0-2.293.904-2.293 2.03v4.106c0 1.128.59 2.035 2.293 2.035 1.7 0 2.301-.907 2.301-2.035V13.59c0-1.125-.601-2.03-2.301-2.03zm26.646 9.228c.844 0 1.517.669 1.517 1.504 0 .848-.673 1.509-1.523 1.509a1.511 1.511 0 01-1.531-1.51c0-.834.685-1.503 1.531-1.503h.006zm-.006.234c-.68 0-1.236.569-1.236 1.27 0 .714.557 1.275 1.242 1.275.687.007 1.235-.561 1.235-1.268 0-.708-.548-1.277-1.235-1.277h-.006zm-.288 2.145h-.275v-1.678c.144-.02.282-.039.488-.039.261 0 .432.054.537.127.101.074.156.187.156.346 0 .222-.15.355-.335.409v.013c.15.027.253.16.288.406.04.261.082.36.109.415h-.289c-.04-.054-.082-.207-.116-.428-.04-.214-.152-.294-.372-.294h-.19v.723h-.001zm0-.929h.2c.225 0 .417-.08.417-.288 0-.147-.109-.293-.418-.293-.09 0-.152.006-.2.013v.568z" />
                      </svg>
                    </div>
                    <div className="col-span-2 flex items-center justify-center py-2 md:col-auto">
                      <svg
                        className="max-w-full fill-current text-gray-400"
                        width={83}
                        height={30}
                        viewBox="0 0 83 30"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.186 0c.2.093.326.285.486.437.26.225.452.523.705.755.312.298.512.675.771 1.013.452.682.851 1.41 1.057 2.205.213.542.246 1.132.233 1.714.013.53-.133 1.053-.372 1.53-.413.721-1.157 1.205-1.935 1.463-.971.232-2.042.272-2.98-.139-.338-.185-.724-.311-.997-.603-.631-.516-.997-1.357-.877-2.171.186-1.45 1.057-2.695 1.988-3.767.086.158.013.344.073.51.08.35.206.721.472.973.326-.298.672-.596.95-.94.254-.371.46-.782.546-1.219.02-.556.073-1.139-.14-1.668l.02-.093zM.005 6.614c1.556.014 3.118-.013 4.674.014 0 1.542.014 3.085-.006 4.628 1.104.02 2.207.006 3.318.006.013.12.02.239.02.358-.014 1.271.006 2.536-.014 3.807-1.11.013-2.214 0-3.324.006.02 2.285-.007 4.562.013 6.846.04.2.067.398.06.603-.02.185.093.338.133.51.086.397.306.755.558 1.066.373.37.851.629 1.363.741.466.073.931.113 1.404.08.026.08.04.159.04.245a319.227 319.227 0 000 3.568c0 .166-.034.331-.06.49-.672 0-1.344.047-2.015 0-.4-.086-.825-.046-1.21-.218-1.07-.252-2.095-.781-2.86-1.583C.977 26.702.372 25.18.126 23.67c-.067-.166-.027-.358-.054-.536-.093-.365-.053-.749-.066-1.12a5974.61 5974.61 0 010-15.4zm22.714 4.29c.279-.072.578-.02.857-.079.586-.073 1.164.02 1.743.04.405-.007.797.113 1.196.192 1.483.358 2.886 1.145 3.904 2.297.18.298.452.517.624.821.433.682.719 1.444.965 2.212.153.563.232 1.145.306 1.721.033 1.278.013 2.563.02 3.84-.007 2.55.006 5.099-.007 7.648-1.556-.02-3.105-.007-4.655-.014a.365.365 0 01-.06-.046c-.006-3.569 0-7.137 0-10.7.007-.436-.073-.86-.166-1.277a4.106 4.106 0 00-.671-1.172c-.173-.205-.412-.338-.605-.517-.3-.198-.652-.29-.991-.384-.18-.013-.36 0-.525-.06-.712-.046-1.437.014-2.102.286-.485.231-.937.549-1.256.993-.526.622-.698 1.47-.685 2.264 0 3.536.007 7.078 0 10.613-1.57.014-3.139-.006-4.708.014-.026-3.41 0-6.827-.013-10.236.007-.437-.007-.874.027-1.311.086-.219.026-.457.093-.67.12-.807.425-1.575.764-2.31.333-.642.732-1.258 1.25-1.768.406-.41.825-.84 1.337-1.125.99-.689 2.16-1.106 3.358-1.271zm55.72-.039c.579-.013 1.15-.126 1.73-.033.312.04.63.033.943.046.06.576.014 1.159.027 1.735v2.317c0 .146.02.298-.04.437-.153-.112-.359-.073-.532-.119-.705-.06-1.43-.026-2.094.238a3.333 3.333 0 00-1.869 1.596c-.113.14-.113.338-.24.47-.205.742-.219 1.516-.205 2.278-.007 3.257.02 6.508-.014 9.766-1.55-.02-3.105 0-4.66-.014-.014-.013-.034-.04-.047-.053V18.903c-.02-.444.08-.874.073-1.311.106-.212.08-.457.146-.675.332-1.676 1.217-3.258 2.56-4.337.26-.291.632-.43.938-.662.99-.603 2.14-.894 3.284-1.053zm-68.919.39c1.57.027 3.138-.006 4.708.014 0 6.058-.007 12.11 0 18.161 0 .06 0 .179-.093.159H9.533c-.04-1-.006-2.006-.02-3.006.007-5.105 0-10.216.007-15.327zm49.238 12.29c.399-.153.784-.352 1.19-.49.585-.226 1.157-.497 1.742-.722 1.21-.557 2.46-1.02 3.684-1.543.292-.16.625-.232.91-.404.326-.126.652-.238.971-.384.28-.166.599-.232.885-.377.379-.153.744-.325 1.13-.464.392-.218.831-.324 1.223-.536.107-.073.28-.053.346-.179-.113-.159-.053-.358-.113-.53-.086-.31-.173-.615-.246-.92-.299-.92-.731-1.8-1.316-2.569-.712-1.026-1.69-1.854-2.773-2.463-.712-.43-1.51-.675-2.307-.887-.492-.06-.965-.232-1.463-.225-.452-.06-.918-.086-1.363-.007-.792.013-1.55.205-2.3.424-1.31.457-2.554 1.152-3.558 2.112-.3.278-.546.603-.831.887-.446.57-.852 1.172-1.157 1.821-.433.973-.845 1.993-.891 3.072-.147.517-.1 1.06-.107 1.59-.013.337.04.668.107.992-.02.344.113.662.16.993.112.702.425 1.351.71 2 .785 1.602 2.022 2.993 3.571 3.9 1.018.622 2.148 1.066 3.332 1.231.964.152 1.954.179 2.925.053.333.027.652-.12.984-.139 1.417-.331 2.806-.927 3.877-1.927.319-.251.618-.55.87-.867.426-.43.732-.953 1.038-1.47.293-.55.532-1.132.705-1.735-.093-.04-.2-.026-.292-.026-1.556.007-3.106-.007-4.662 0-.146 0-.146.199-.239.278-.266.384-.605.708-.964 1.013-.519.37-1.13.57-1.736.748-.16.02-.312.013-.458.073-.373.027-.752.013-1.13.007-.42-.08-.839-.172-1.244-.305-.625-.318-1.237-.682-1.709-1.198-.12-.146-.312-.258-.352-.45.106-.047.206-.12.325-.14.193-.033.34-.185.526-.238zm-1.915-3.351c-.093-.232-.007-.503-.02-.748.106-.338.14-.695.266-1.033.319-.748.711-1.483 1.283-2.073.266-.218.492-.483.798-.648.226-.12.445-.252.678-.358.432-.126.851-.324 1.303-.324.413-.1.838-.047 1.257-.04 1.097.152 2.201.622 2.912 1.49.074.172-.172.185-.272.251-.432.239-.918.358-1.35.603-.193.033-.36.152-.545.212-1.377.596-2.78 1.119-4.143 1.741-.731.285-1.456.59-2.167.927zm-4.954-17.03c-1.456-.012-2.912 0-4.369-.006-.106.013-.232-.033-.319.047.014 3.111 0 6.23.007 9.342-.007.112.02.225-.027.33-.133-.02-.2-.145-.299-.218-.671-.576-1.423-1.066-2.26-1.35-.566-.219-1.158-.331-1.756-.437-.678-.014-1.363-.034-2.048.006-.073.02-.14.04-.213.047-1.522.211-2.945.92-4.116 1.893-.651.61-1.303 1.245-1.762 2.013-.538.761-.884 1.635-1.216 2.496-.153.543-.306 1.08-.373 1.635-.126.854-.073 1.728-.06 2.59.034.224.107.436.113.661a9.18 9.18 0 00.625 2.126c.246.655.645 1.251 1.011 1.847.26.33.512.675.824.966.466.457.925.954 1.51 1.272.691.523 1.51.834 2.307 1.139.293.052.565.218.864.225.253.02.486.139.739.125.133-.013.252.08.392.067.645.02 1.296.02 1.941 0 .107 0 .213-.047.326-.053.446.006.858-.166 1.29-.226.565-.205 1.17-.337 1.696-.642.778-.357 1.482-.86 2.114-1.43a8.187 8.187 0 001.922-2.49c.206-.416.439-.82.572-1.27.252-.623.365-1.285.452-1.94.146-.577.1-1.179.113-1.775V3.164zm-4.728 17.93c-.04.702-.305 1.37-.618 2-.525.986-1.41 1.741-2.414 2.218-.153.08-.352.073-.458.218-.187 0-.373.007-.552.073-.572.014-1.164.066-1.723-.092-.239-.113-.505-.16-.744-.285-.3-.166-.639-.278-.885-.53-.465-.324-.824-.768-1.15-1.225-.26-.443-.519-.9-.638-1.403-.133-.265-.12-.563-.193-.841-.02-.709-.06-1.437.106-2.126.074-.218.12-.45.2-.668.193-.351.312-.742.565-1.06.133-.278.366-.483.552-.721.499-.57 1.184-.934 1.875-1.219.26-.059.512-.191.785-.191.552-.14 1.123-.027 1.669.072.718.259 1.43.616 1.988 1.146.206.192.359.43.565.622a5.625 5.625 0 011.07 4.012zM78.4 27.265h1.743c.006.132.006.265 0 .397-.2.027-.4-.006-.592.02-.027.596 0 1.185-.013 1.781a4.773 4.773 0 00-.532-.006c-.02-.47-.014-.947-.007-1.417 0-.126.027-.272-.087-.358-.172-.026-.345.007-.518-.02a2.625 2.625 0 01.006-.397zm2.062.007c.246-.007.492-.02.738.013-.013.192.146.324.193.503.066.225.166.437.232.662.054.1.147.186.113.311.133-.516.34-1.006.546-1.49a8.47 8.47 0 01.711 0c.013.709 0 1.43 0 2.14a2.97 2.97 0 01-.485 0c.006-.497 0-.994.013-1.484-.06.053-.12.1-.166.166-.087.45-.32.86-.432 1.31-.133.02-.26.02-.393.007-.04-.251-.22-.457-.22-.715-.179-.218-.185-.53-.325-.774-.093.178-.02.39-.04.582-.026.311.033.63-.026.94-.16 0-.34.053-.466-.06.02-.701 0-1.403.007-2.111z" />
                      </svg>
                    </div>
                    <div className="col-span-2 flex items-center justify-center py-2 md:col-auto">
                      <svg
                        className="max-w-full fill-current text-gray-400"
                        width={125}
                        height={39}
                        viewBox="0 0 125 39"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M65.879 9.8a2.533 2.533 0 01-2.539 2.537 2.532 2.532 0 01-2.538-2.538 2.508 2.508 0 012.538-2.537c1.446.039 2.539 1.171 2.539 2.537zm-10.466 5.114v.624s-1.21-1.562-3.787-1.562c-4.256 0-7.576 3.24-7.576 7.73 0 4.45 3.28 7.73 7.576 7.73 2.616 0 3.787-1.601 3.787-1.601v.663c0 .313.235.546.547.546h3.163V14.365H55.96a.561.561 0 00-.547.549zm0 9.407c-.585.86-1.757 1.601-3.162 1.601-2.5 0-4.413-1.561-4.413-4.216 0-2.655 1.914-4.216 4.413-4.216 1.367 0 2.616.78 3.162 1.6v5.231zm6.053-9.954h3.749v14.678h-3.749V14.367zm55.998-.391c-2.578 0-3.788 1.562-3.788 1.562V7.301h-3.749v21.744h3.163a.558.558 0 00.547-.546v-.664s1.21 1.6 3.787 1.6c4.257 0 7.576-3.277 7.576-7.728 0-4.45-3.319-7.731-7.536-7.731zm-.625 11.907c-1.445 0-2.577-.741-3.163-1.6V19.05c.586-.78 1.835-1.6 3.163-1.6 2.499 0 4.412 1.561 4.412 4.216 0 2.654-1.913 4.216-4.412 4.216zm-8.864-5.543v8.744h-3.75V20.77c0-2.42-.78-3.396-2.888-3.396-1.132 0-2.304.585-3.047 1.445v10.228h-3.748v-14.68h2.967c.313 0 .547.274.547.548v.624c1.094-1.132 2.538-1.562 3.983-1.562 1.64 0 3.007.47 4.1 1.406 1.328 1.093 1.836 2.498 1.836 4.958zm-22.533-6.364c-2.576 0-3.787 1.562-3.787 1.562V7.301h-3.749v21.744h3.163a.559.559 0 00.547-.546v-.664s1.21 1.6 3.787 1.6c4.257 0 7.576-3.277 7.576-7.728.04-4.451-3.28-7.731-7.537-7.731zm-.625 11.907c-1.444 0-2.576-.741-3.162-1.6V19.05c.586-.78 1.835-1.6 3.162-1.6 2.5 0 4.413 1.561 4.413 4.216 0 2.654-1.913 4.216-4.413 4.216zM74.665 13.976c1.132 0 1.718.196 1.718.196v3.474s-3.124-1.055-5.076 1.171v10.267h-3.75V14.367h3.164c.312 0 .546.273.546.546v.625c.704-.82 2.227-1.562 3.398-1.562zM35.733 27.718c-.195-.468-.39-.976-.586-1.406-.313-.702-.625-1.366-.898-1.99l-.039-.04a406.921 406.921 0 00-8.63-17.644l-.117-.235c-.32-.608-.633-1.22-.937-1.835-.39-.703-.78-1.444-1.406-2.147C21.87.859 20.074 0 18.161 0c-1.953 0-3.71.86-4.998 2.342-.586.703-1.016 1.444-1.406 2.148a84.724 84.724 0 01-.936 1.835l-.118.234c-3.007 5.856-5.935 11.79-8.63 17.645l-.04.078c-.272.625-.585 1.289-.898 1.99-.195.43-.39.899-.585 1.406-.508 1.444-.664 2.81-.468 4.217a8.297 8.297 0 005.076 6.48c1.016.43 2.07.625 3.163.625.313 0 .703-.039 1.016-.078 1.288-.156 2.616-.585 3.905-1.327 1.6-.898 3.124-2.186 4.842-4.06 1.718 1.874 3.28 3.162 4.842 4.06 1.29.742 2.616 1.17 3.905 1.327.312.04.703.078 1.016.078 1.093 0 2.186-.195 3.162-.625 2.734-1.094 4.647-3.591 5.077-6.48.31-1.366.154-2.732-.353-4.177zm-17.611 2.03c-2.11-2.655-3.476-5.153-3.944-7.26-.195-.899-.235-1.68-.117-2.382a3.78 3.78 0 01.625-1.64c.742-1.054 1.991-1.718 3.436-1.718 1.445 0 2.734.625 3.437 1.718.312.468.547 1.015.625 1.64.117.703.078 1.522-.117 2.381-.47 2.069-1.837 4.568-3.945 7.26zm15.58 1.835a5.802 5.802 0 01-3.553 4.568c-.937.39-1.953.507-2.968.39-.976-.118-1.953-.43-2.967-1.015-1.406-.782-2.812-1.991-4.452-3.787 2.577-3.162 4.139-6.051 4.725-8.627a9.765 9.765 0 00.195-3.32 6.329 6.329 0 00-1.054-2.654c-1.212-1.757-3.242-2.771-5.507-2.771-2.264 0-4.295 1.054-5.505 2.771a6.335 6.335 0 00-1.055 2.655 8.107 8.107 0 00.195 3.319c.586 2.576 2.187 5.504 4.725 8.666-1.601 1.796-3.046 3.006-4.452 3.787-1.015.586-1.991.898-2.967 1.015a6.25 6.25 0 01-2.968-.39 5.802 5.802 0 01-3.553-4.568 6.457 6.457 0 01.351-3.045c.117-.39.313-.78.508-1.25.273-.624.585-1.288.898-1.951l.04-.078a425.627 425.627 0 018.59-17.528l.117-.235c.313-.585.625-1.21.937-1.795.313-.625.664-1.211 1.094-1.719.82-.936 1.913-1.444 3.124-1.444 1.21 0 2.304.508 3.124 1.444.43.51.78 1.095 1.093 1.719.313.585.626 1.21.937 1.795l.118.235a516.841 516.841 0 018.552 17.567v.039c.312.626.586 1.328.898 1.953.195.468.39.858.508 1.248.311 1.014.428 1.991.272 3.006z" />
                      </svg>
                    </div>
                    <div className="col-span-2 flex items-center justify-center py-2 md:col-auto">
                      <svg
                        className="max-w-full fill-current text-gray-400"
                        width={113}
                        height={30}
                        viewBox="0 0 113 30"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 5h3.94v8.21h8.31V5h3.946v20.153H12.25V16.77H3.94v8.383H0V5zm28.678 13.589V9.912h3.736v8.677c0 3.62-3.14 6.564-7 6.564s-7-2.945-7-6.564V9.912h3.736v8.677c0 1.687 1.465 3.06 3.264 3.06 1.799 0 3.264-1.373 3.264-3.06zm14.167-8.575c4.185 0 7.784 3.28 7.784 7.57 0 4.344-3.903 7.569-8.357 7.569-4.006 0-7.573-3.168-7.573-7.794V5h3.75v6.669c1.249-1.15 2.542-1.655 4.396-1.655zm.093 11.886c2.152 0 4.096-1.99 4.096-4.317s-1.944-4.317-4.096-4.317c-2.54 0-4.483 1.99-4.483 4.317s1.943 4.317 4.483 4.317zm13.987-11c0 3.28 8.938.924 8.938 8.493 0 3.505-3.108 5.748-6.964 5.748-2.571 0-4.723-1.01-6.458-3l2.72-2.635c1.017 1.065 1.735 2.074 3.948 2.074 1.404 0 2.629-1.038 2.629-2.214 0-3.814-8.938-1.654-8.938-8.466 0-3.673 2.93-5.888 6.995-5.888 2.033 0 4.513 1.065 5.738 2.607l-2.45 2.691c-.956-.953-2.42-1.738-3.527-1.738-1.375 0-2.63.56-2.63 2.328zm18.808-1.084c4.453 0 8.357 3.224 8.357 7.57 0 4.289-3.6 7.569-7.785 7.569-1.854 0-3.147-.506-4.397-1.655V30H68.16V17.61c0-4.627 3.566-7.794 7.573-7.794zm.666 11.887c2.152 0 4.095-1.992 4.095-4.318 0-2.327-1.943-4.317-4.095-4.317-2.54 0-4.483 1.99-4.483 4.317 0 2.326 1.943 4.318 4.483 4.318zm35.285.197c.42 0 .898-.028 1.316-.055l-.927 3.196c-.359.083-1.017.112-1.496.112-3.197 0-5.527-1.599-5.527-4.767V7.995l3.795-1.598v4.066h3.437v3.083h-3.437v6.083c0 1.374.628 2.271 2.839 2.271zm-10.72-8.125c.702 1.097 1.036 2.295 1.036 3.593v.066c0 1.319-.415 2.518-1.17 3.604-.75 1.082-1.742 1.93-3.01 2.55a8.651 8.651 0 01-3.843.874h-.225c-1.228 0-2.35-.241-3.367-.637a8.644 8.644 0 01-1.439-.708l-3.238 2.913c.077.219.117.45.117.685a2.162 2.162 0 01-.743 1.615 2.674 2.674 0 01-1.797.67 2.672 2.672 0 01-1.796-.67c-.48-.431-.744-1.004-.744-1.615a2.16 2.16 0 01.743-1.615c.698-.631 1.741-.837 2.668-.527l3.133-2.824a6.582 6.582 0 01-1.223-1.91 6.758 6.758 0 01-.516-2.558v-.269c0-1.286.46-2.466 1.214-3.538a7.382 7.382 0 011.335-1.407L78.66 5.95l-.687-.469a3.53 3.53 0 01-1.686.431C74.47 5.912 73 4.588 73 2.956 73 1.323 74.47 0 76.285 0c1.816 0 3.286 1.323 3.286 2.956 0 .272-.06.53-.137.78 3.255 2.222 8.82 6.025 10.517 7.184a9.297 9.297 0 012.618-.738V6.669c-1.097-.42-1.738-1.346-1.738-2.428 0-1.474 1.337-2.668 2.976-2.668 1.637 0 2.952 1.194 2.952 2.668 0 1.082-.68 2.009-1.778 2.428v3.511a8.595 8.595 0 013.009.937c1.256.667 2.26 1.553 2.974 2.658zm-3.956 6.11c.765-.756 1.148-1.59 1.148-2.49 0-.136-.006-.277-.018-.415a3.896 3.896 0 00-.717-1.837 4.181 4.181 0 00-1.598-1.307c-.64-.295-1.318-.422-2.034-.422h-.074c-.79 0-1.5.193-2.163.587a4.23 4.23 0 00-1.562 1.537c-.352.586-.492 1.208-.492 1.863v.202c0 .666.246 1.295.698 1.87.438.587.974 1.05 1.678 1.375.624.295 1.262.457 1.915.457h.188c1.142 0 2.152-.541 3.031-1.42z" />
                      </svg>
                    </div>
                    <div className="col-span-2 col-start-2 col-end-4 flex items-center justify-center py-2 md:col-auto">
                      <svg
                        className="max-w-full fill-current text-gray-400"
                        width={109}
                        height={33}
                        viewBox="0 0 109 33"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M67.43 25.591c-6.293 4.653-15.447 7.132-23.342 7.132-11.06 0-20.976-4.08-28.527-10.87-.572-.533-.077-1.258.648-.839 8.124 4.73 18.154 7.552 28.528 7.552 6.98 0 14.683-1.45 21.777-4.462 1.068-.42 1.945.724.915 1.487zm2.631-3.013c-.8-1.03-5.34-.496-7.36-.229-.611.077-.725-.457-.153-.839 3.623-2.555 9.534-1.792 10.22-.953.687.839-.19 6.789-3.584 9.61-.534.42-1.03.192-.801-.38.763-1.908 2.479-6.14 1.678-7.209zM62.815 3.585V1.106c0-.381.267-.61.61-.61h11.06c.343 0 .648.267.648.61v2.098c0 .343-.305.8-.839 1.563l-5.72 8.162c2.135-.038 4.386.267 6.293 1.335.419.229.533.61.572.953v2.632c0 .381-.382.8-.801.572-3.395-1.792-7.933-1.983-11.67.038-.382.19-.802-.19-.802-.572V15.37c0-.381 0-1.068.42-1.678l6.636-9.497h-5.759c-.343 0-.648-.267-.648-.61zm-40.313 15.37h-3.356c-.305-.038-.572-.267-.61-.572V1.144c0-.343.305-.61.648-.61h3.127c.343 0 .572.267.61.572v2.25h.077c.8-2.174 2.364-3.203 4.424-3.203 2.097 0 3.432 1.03 4.348 3.203.8-2.174 2.67-3.203 4.653-3.203 1.41 0 2.936.572 3.89 1.906 1.068 1.45.839 3.547.839 5.416v10.908c0 .343-.305.61-.649.61h-3.318c-.343-.038-.61-.305-.61-.61V9.23c0-.725.076-2.556-.076-3.242-.267-1.144-.992-1.488-1.983-1.488-.801 0-1.678.534-2.022 1.412-.343.877-.305 2.326-.305 3.318v9.153c0 .343-.305.61-.648.61h-3.356c-.344-.038-.61-.305-.61-.61V9.23c0-1.907.304-4.768-2.06-4.768-2.403 0-2.327 2.746-2.327 4.768v9.153c-.038.305-.305.572-.686.572zM84.668.153c4.996 0 7.704 4.271 7.704 9.725 0 5.263-2.975 9.458-7.704 9.458-4.882 0-7.551-4.271-7.551-9.61-.038-5.378 2.67-9.573 7.551-9.573zm0 3.546c-2.479 0-2.631 3.395-2.631 5.492 0 2.098-.039 6.598 2.593 6.598 2.593 0 2.746-3.623 2.746-5.835 0-1.449-.076-3.203-.496-4.576-.381-1.22-1.144-1.679-2.212-1.679zm14.15 15.256H95.46c-.343-.038-.61-.305-.61-.61V1.068A.66.66 0 0195.5.496h3.127c.305 0 .534.229.61.496v2.631h.077c.953-2.364 2.25-3.47 4.576-3.47 1.488 0 2.975.533 3.928 2.02.878 1.374.878 3.7.878 5.378v10.87c-.038.305-.305.534-.649.534h-3.356c-.305-.038-.572-.267-.61-.534V9.04c0-1.907.229-4.653-2.098-4.653-.8 0-1.563.534-1.945 1.373-.458 1.068-.534 2.098-.534 3.28v9.306a.698.698 0 01-.686.61zm-41.42-.038a.69.69 0 01-.8.076c-1.106-.915-1.335-1.373-1.945-2.25-1.83 1.869-3.166 2.44-5.53 2.44-2.822 0-5.035-1.754-5.035-5.224 0-2.746 1.488-4.577 3.586-5.492 1.83-.801 4.385-.954 6.33-1.182v-.42c0-.8.077-1.754-.419-2.44-.42-.611-1.182-.878-1.869-.878-1.296 0-2.44.648-2.708 2.021-.076.305-.267.61-.572.61l-3.241-.343c-.267-.076-.573-.267-.496-.686C45.46 1.182 49.009 0 52.212 0c1.64 0 3.776.42 5.073 1.678 1.64 1.526 1.487 3.585 1.487 5.797V12.7c0 1.564.648 2.25 1.259 3.128.228.305.266.686 0 .877-.725.572-1.946 1.64-2.632 2.212zm-44.088 0a.69.69 0 01-.8.076c-1.106-.915-1.335-1.373-1.946-2.25-1.83 1.869-3.165 2.44-5.53 2.44C2.212 19.184 0 17.43 0 13.96c0-2.746 1.487-4.577 3.585-5.492 1.83-.801 4.386-.954 6.331-1.182v-.42c0-.8.076-1.754-.42-2.44-.419-.611-1.182-.878-1.868-.878-1.297 0-2.441.648-2.708 2.021-.076.305-.267.61-.572.61l-3.242-.343C.839 5.76.534 5.568.61 5.15 1.373 1.182 4.92 0 8.124 0c1.64 0 3.775.42 5.072 1.678 1.64 1.526 1.487 3.585 1.487 5.797V12.7c0 1.564.649 2.25 1.259 3.128.229.305.267.686 0 .877-.725.572-1.945 1.64-2.632 2.212zm40.695-8.2v-.725c-2.441 0-4.997.534-4.997 3.395 0 1.449.763 2.44 2.06 2.44.953 0 1.792-.571 2.326-1.525.649-1.182.61-2.288.61-3.585zm-44.05 0v-.725c-2.442 0-4.997.534-4.997 3.395 0 1.449.763 2.44 2.06 2.44.953 0 1.792-.571 2.326-1.525.648-1.182.61-2.288.61-3.585z" />
                      </svg>
                    </div>
                  </div> */}
                  <div
                    className="mx-auto grid max-w-sm items-start gap-6 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3"
                    data-aos="zoom-y-out"
                  >
                    <div className="relative flex items-start  rounded border-2  bg-gray-50 shadow-xl">
                      <div className="mx-4 px-12 py-8 pt-20 text-center md:mx-0">
                        <div className="absolute left-1/2 top-0 -mt-8 -translate-x-1/2 transform">
                          <svg
                            className="absolute right-0 top-0 -mr-8 -mt-3 h-16 w-16 fill-current text-[#f6af5a]"
                            viewBox="0 0 64 64"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M37.89 58.338c-2.648-5.63-3.572-10.045-2.774-13.249.8-3.203 8.711-13.383 23.737-30.538l2.135.532c-6.552 10.033-10.532 17.87-11.939 23.515-.583 2.34.22 6.158 2.41 11.457l-13.57 8.283zm-26.963-6.56c-2.648-5.63-3.572-10.046-2.773-13.25.799-3.203 8.71-13.382 23.736-30.538l2.136.533c-6.552 10.032-10.532 17.87-11.94 23.515-.583 2.339.22 6.158 2.41 11.456l-13.57 8.283z" />
                          </svg>
                          <img
                            alt="Testimonial 01"
                            loading="lazy"
                            width={96}
                            height={96}
                            decoding="async"
                            data-nimg={1}
                            className="relative rounded-full"
                            srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonial.993c13ed.jpg&w=96&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonial.993c13ed.jpg&w=256&q=75 2x"
                            src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonial.993c13ed.jpg&w=256&q=75"
                            style={{ color: "transparent" }}
                          />
                        </div>
                        <blockquote className="mb-4 space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                          Inchy is a total game-changer! It feels like having a
                          clone that talks and flirts just like me, freeing up
                          my time for other creative projects. And my earnings
                          doubled within the first month! Couldn't ask for more.
                        </blockquote>
                        <cite className="mb-1 block text-lg font-bold not-italic">
                          Alexa
                        </cite>
                        {/* <div className="text-gray-600">
                          <span>CEO &amp; Co-Founder</span>{" "}
                          <a
                            className="text-blue-600 hover:underline"
                            href="#0"
                          >
                            @Dropbox
                          </a>
                        </div> */}
                      </div>
                    </div>
                    <div className="relative flex items-start rounded border-2 border-gray-200 bg-gray-50 shadow-xl">
                      <div className="mx-4 px-12 py-8 pt-20 text-center md:mx-0">
                        <div className="absolute left-1/2 top-0 -mt-8 -translate-x-1/2 transform">
                          <svg
                            className="absolute right-0 top-0 -mr-8 -mt-3 h-16 w-16 fill-current text-[#f6af5a]"
                            viewBox="0 0 64 64"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M37.89 58.338c-2.648-5.63-3.572-10.045-2.774-13.249.8-3.203 8.711-13.383 23.737-30.538l2.135.532c-6.552 10.033-10.532 17.87-11.939 23.515-.583 2.34.22 6.158 2.41 11.457l-13.57 8.283zm-26.963-6.56c-2.648-5.63-3.572-10.046-2.773-13.25.799-3.203 8.71-13.382 23.736-30.538l2.136.533c-6.552 10.032-10.532 17.87-11.94 23.515-.583 2.339.22 6.158 2.41 11.456l-13.57 8.283z" />
                          </svg>
                          <img
                            alt="Testimonial 01"
                            loading="lazy"
                            width={96}
                            height={96}
                            decoding="async"
                            data-nimg={1}
                            className="relative rounded-full"
                            srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonial.993c13ed.jpg&w=96&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonial.993c13ed.jpg&w=256&q=75 2x"
                            src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonial.993c13ed.jpg&w=256&q=75"
                            style={{ color: "transparent" }}
                          />
                        </div>
                        <blockquote className="mb-4 space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                          I was skeptical about Inchy at first, but I decided to
                          give it a try and wow! It has seriously boosted my fan
                          engagement without eating into my personal time. The
                          avatar is so cool and totally me!
                        </blockquote>
                        <cite className="mb-1 block text-lg font-bold not-italic">
                          Tiffany
                        </cite>
                        {/* <div className="text-gray-600">
                          <span>CEO &amp; Co-Founder</span>{" "}
                          <a
                            className="text-blue-600 hover:underline"
                            href="#0"
                          >
                            @Dropbox
                          </a>
                        </div> */}
                      </div>
                    </div>
                    <div className="relative flex items-start rounded border-2 border-gray-200 bg-gray-50 shadow-xl">
                      <div className="mx-4 px-12 py-8 pt-20 text-center md:mx-0">
                        <div className="absolute left-1/2 top-0 -mt-8 -translate-x-1/2 transform">
                          <svg
                            className="absolute right-0 top-0 -mr-8 -mt-3 h-16 w-16 fill-current text-[#f6af5a]"
                            viewBox="0 0 64 64"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M37.89 58.338c-2.648-5.63-3.572-10.045-2.774-13.249.8-3.203 8.711-13.383 23.737-30.538l2.135.532c-6.552 10.033-10.532 17.87-11.939 23.515-.583 2.34.22 6.158 2.41 11.457l-13.57 8.283zm-26.963-6.56c-2.648-5.63-3.572-10.046-2.773-13.25.799-3.203 8.71-13.382 23.736-30.538l2.136.533c-6.552 10.032-10.532 17.87-11.94 23.515-.583 2.339.22 6.158 2.41 11.456l-13.57 8.283z" />
                          </svg>
                          <img
                            alt="Testimonial 01"
                            loading="lazy"
                            width={96}
                            height={96}
                            decoding="async"
                            data-nimg={1}
                            className="relative rounded-full"
                            srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonial.993c13ed.jpg&w=96&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonial.993c13ed.jpg&w=256&q=75 2x"
                            src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonial.993c13ed.jpg&w=256&q=75"
                            style={{ color: "transparent" }}
                          />
                        </div>
                        <blockquote className="mb-4 space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                          Inchy is lit! It's not just about earning more, but
                          also about engaging my fans even when I'm offline. The
                          AI is super impressive—it's got my vibe and my fans
                          love it. This is the future of content creation!
                        </blockquote>
                        <cite className="mb-1 block text-lg font-bold not-italic">
                          Jade
                        </cite>
                        {/* <div className="text-gray-600">
                          <span>CEO &amp; Co-Founder</span>{" "}
                          <a
                            className="text-blue-600 hover:underline"
                            href="#0"
                          >
                            @Dropbox
                          </a>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <section>
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="pb-12 md:pb-20">
                  <div
                    className="aos-init relative overflow-hidden rounded bg-gray-900 px-8 py-10 shadow-2xl md:px-12 md:py-16"
                    data-aos="zoom-y-out"
                  >
                    <div
                      className="pointer-events-none absolute bottom-0 right-0 hidden lg:block"
                      aria-hidden="true"
                    >
                      <svg
                        width={428}
                        height={328}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <radialGradient
                            cx="35.542%"
                            cy="34.553%"
                            fx="35.542%"
                            fy="34.553%"
                            r="96.031%"
                            id="ni-a"
                          >
                            <stop stopColor="#DFDFDF" offset="0%" />
                            <stop stopColor="#4C4C4C" offset="44.317%" />
                            <stop stopColor="#333" offset="100%" />
                          </radialGradient>
                        </defs>
                        <g fill="none" fillRule="evenodd">
                          <g fill="#FFF">
                            <ellipse
                              fillOpacity=".04"
                              cx={185}
                              cy="15.576"
                              rx={16}
                              ry="15.576"
                            />
                            <ellipse
                              fillOpacity=".24"
                              cx={100}
                              cy="68.402"
                              rx={24}
                              ry="23.364"
                            />
                            <ellipse
                              fillOpacity=".12"
                              cx={29}
                              cy="251.231"
                              rx={29}
                              ry="28.231"
                            />
                            <ellipse
                              fillOpacity=".64"
                              cx={29}
                              cy="251.231"
                              rx={8}
                              ry="7.788"
                            />
                            <ellipse
                              fillOpacity=".12"
                              cx={342}
                              cy="31.303"
                              rx={8}
                              ry="7.788"
                            />
                            <ellipse
                              fillOpacity=".48"
                              cx={62}
                              cy="126.811"
                              rx={2}
                              ry="1.947"
                            />
                            <ellipse
                              fillOpacity=".12"
                              cx={78}
                              cy="7.072"
                              rx={2}
                              ry="1.947"
                            />
                            <ellipse
                              fillOpacity=".64"
                              cx={185}
                              cy="15.576"
                              rx={6}
                              ry="5.841"
                            />
                          </g>
                          <circle fill="url(#ni-a)" cx={276} cy={237} r={200} />
                        </g>
                      </svg>
                    </div>
                    <div className="relative flex flex-col items-center justify-between lg:flex-row">
                      <div className="text-center lg:max-w-xl lg:text-left">
                        <h3 className="h3 mb-2 text-white">
                          Want more tutorials &amp; guides?
                        </h3>
                        <p className="mb-6 text-lg text-gray-300">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit nemo expedita voluptas culpa sapiente.
                        </p>
                        <form className="w-full lg:w-auto">
                          <div className="mx-auto flex max-w-xs flex-col justify-center sm:max-w-md sm:flex-row lg:mx-0">
                            <input
                              className="form-input mb-2 w-full appearance-none rounded-sm border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-gray-600 sm:mb-0 sm:mr-2"
                              placeholder="Your email…"
                              aria-label="Your email…"
                              type="email"
                            />
                            <a
                              className="btn bg-blue-600 text-white shadow hover:bg-blue-700"
                              href="#0"
                            >
                              Subscribe
                            </a>
                            <div
                              data-lastpass-icon-root="true"
                              style={{
                                position: "relative !important",
                                height: "0px !important",
                                width: "0px !important",
                                float: "left !important",
                              }}
                            />
                          </div>
                          <p className="mt-3 text-sm text-gray-400">
                            No spam. You can unsubscribe at any time.
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
          </main>
          <footer>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid gap-8 border-t border-gray-200 py-8 sm:grid-cols-12 md:py-12">
                <div className="sm:col-span-12 lg:col-span-3">
                  <div className="mb-2">
                    <a className="block" aria-label="Cruip" href="/">
                      {/* <svg
                        className="h-8 w-8"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <radialGradient
                            cx="21.152%"
                            cy="86.063%"
                            fx="21.152%"
                            fy="86.063%"
                            r="79.941%"
                            id="footer-logo"
                          >
                            <stop stopColor="#4FD1C5" offset="0%" />
                            <stop stopColor="#81E6D9" offset="25.871%" />
                            <stop stopColor="#338CF5" offset="100%" />
                          </radialGradient>
                        </defs>
                        <rect
                          width={32}
                          height={32}
                          rx={16}
                          fill="url(#footer-logo)"
                          fillRule="nonzero"
                        />
                      </svg> */}
                      {/* <svg
                        className="h-8 w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 800 800"
                      >
                        <defs>
                          <filter
                            id="bbblurry-filter"
                            x="-100%"
                            y="-100%"
                            width="400%"
                            height="400%"
                            filterUnits="objectBoundingBox"
                            primitiveUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feGaussianBlur
                              stdDeviation="24"
                              x="0%"
                              y="0%"
                              width="100%"
                              height="100%"
                              in="SourceGraphic"
                              edgeMode="none"
                              result="blur"
                            ></feGaussianBlur>
                          </filter>
                        </defs>
                        <g filter="url(#bbblurry-filter)">
                          <ellipse
                            rx="149.5"
                            ry="150"
                            cx="483.0638732910156"
                            cy="487.22449497402647"
                            fill="hsla(48, 100%, 50%, 1.00)"
                          ></ellipse>
                          <ellipse
                            rx="149.5"
                            ry="150"
                            cx="248.89759674871152"
                            cy="481.3116603671567"
                            fill="hsla(0, 70%, 65%, 1.00)"
                          ></ellipse>
                          <ellipse
                            rx="149.5"
                            ry="150"
                            cx="370.3514798948279"
                            cy="276.64311609717566"
                            fill="hsla(138, 67%, 66%, 1.00)"
                          ></ellipse>
                        </g>
                      </svg> */}
                      {/* <h1 className="bold text-3xl">INCHY</h1> */}
                      <Image src={"/logo.svg"} height="200" width="200"></Image>
                    </a>
                  </div>
                  <div className="text-sm text-gray-600">
                    <a
                      href="/terms"
                      target="_blank"
                      className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900 hover:underline"
                    >
                      Terms
                    </a>{" "}
                    ·{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900 hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </div>
                {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                  <h6 className="mb-2 font-medium text-gray-800">Products</h6>
                  <ul className="text-sm">
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        Web Studio
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        DynamicBox Flex
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        Programming Forms
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        Integrations
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        Command-line
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                  <h6 className="mb-2 font-medium text-gray-800">Resources</h6>
                  <ul className="text-sm">
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        Documentation
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        Tutorials &amp; Guides
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        Blog
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        Support Center
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        Partners
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                  <h6 className="mb-2 font-medium text-gray-800">Company</h6>
                  <ul className="text-sm">
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        Home
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        About us
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        Company values
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        Pricing
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
                  <h6 className="mb-2 font-medium text-gray-800">Subscribe</h6>
                  <p className="mb-4 text-sm text-gray-600">
                    Get the latest news and articles to your inbox every month.
                  </p>
                  <form>
                    <div className="mb-4 flex flex-wrap">
                      <div className="w-full">
                        <label
                          className="sr-only block text-sm"
                          htmlFor="newsletter"
                        >
                          Email
                        </label>
                        <div className="relative flex max-w-xs items-center">
                          <input
                            id="newsletter"
                            className="form-input w-full px-3 py-2 pr-12 text-sm text-gray-800"
                            placeholder="Your email"
                            required=""
                            type="email"
                          />
                          <button
                            type="submit"
                            className="absolute inset-0 left-auto"
                            aria-label="Subscribe"
                          >
                            <span
                              className="absolute inset-0 right-auto my-2 -ml-px w-px bg-gray-300"
                              aria-hidden="true"
                            />
                            <svg
                              className="mx-3 h-3 w-3 shrink-0 fill-current text-blue-600"
                              viewBox="0 0 12 12"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                                fillRule="nonzero"
                              />
                            </svg>
                          </button>
                          <div
                            data-lastpass-icon-root="true"
                            style={{
                              position: "relative !important",
                              height: "0px !important",
                              width: "0px !important",
                              float: "left !important",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div> */}
              </div>
              <div className="border-t border-gray-200 py-4 md:flex md:items-center md:justify-between md:py-8">
                {/* <ul className="mb-4 flex md:order-1 md:mb-0 md:ml-4">
                  <li>
                    <a
                      href="#0"
                      className="hover:bg-white-100 flex items-center justify-center rounded-full bg-white text-gray-600 shadow transition duration-150 ease-in-out hover:text-gray-900"
                      aria-label="Twitter"
                    >
                      <svg
                        className="h-8 w-8 fill-current"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                      </svg>
                    </a>
                  </li>

                  <li className="ml-4">
                    <a
                      href="#0"
                      className="hover:bg-white-100 flex items-center justify-center rounded-full bg-white text-gray-600 shadow transition duration-150 ease-in-out hover:text-gray-900"
                      aria-label="Facebook"
                    >
                      <svg
                        className="h-8 w-8 fill-current"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                      </svg>
                    </a>
                  </li>
                </ul> */}
                <div className="mr-4 text-sm text-gray-600">
                  © Inchy inc. All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </div>
        <iframe
          src="chrome-extension://ijejnggjjphlenbhmjhhgcdpehhacaal/audio-devices.html"
          allow="microphone"
          style={{ display: "none" }}
        />
        <input type="file" id="" name="file" style={{ display: "none" }} />
        <div data-v-f3fb3dc8="">
          <div
            data-v-f3fb3dc8=""
            className="container_selected_area"
            style={{ cursor: "crosshair" }}
          />{" "}
          <div
            data-v-f3fb3dc8=""
            className="area"
            style={{ left: 0, top: 0, width: 0, height: 0 }}
          />
        </div>
        <div id="scrnli_recorder_root" />
        <next-route-announcer style={{ position: "absolute" }} />
        <div
          data-lastpass-root=""
          style={{
            position: "absolute !important",
            top: "0px !important",
            left: "0px !important",
            height: "0px !important",
            width: "0px !important",
          }}
        >
          <div
            data-lastpass-infield="true"
            style={{
              position: "absolute !important",
              top: "0px !important",
              left: "0px !important",
            }}
          />
        </div>
      </>
    </>
  );
}

export default HomePage;

// export async function getServerSideProps(context) {
//   const prisma = new PrismaClient();
//   const data = await prisma.character.findMany();

//   return {
//     props: {
//       character: data,
//     },
//   };
// }

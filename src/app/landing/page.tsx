"use client";

import Button from "components/Button";
import Navbar from "components/Navbar";
import TextGradient from "components/TextGradient";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

export default function Page() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="w-full mx-auto max-w-7xl">
        <Navbar />
      </div>

      <section className="relative pt-32 pb-[160px] w-full">
        <div className="absolute bottom-0 right-0 w-[100vw] aspect-[1280/750]">
          <Image alt="" src={`/images/landing/bg-ellipse.png`} fill />
        </div>

        <div className="max-w-[600px] mx-auto flex flex-col justify-center gap-4 relative px-6 md:px-0">
          <TextGradient className="text-[56px] text-center">
            Invest. Manage. Inspire. Earn.
          </TextGradient>
          <div className="text-2xl text-center font-display">
            With <span className="font-bold">Plotty</span>. The Social Yield
            Farming Platform.
          </div>
          <div className="py-8 text-center text-secondary-text">
            A decentralized platform helping you maximize earnings by creating,
            managing, exploring, or sharing your yield strategy.
          </div>

          <div className="flex justify-center gap-4">
            <Link
              href={`${
                process.env.NODE_ENV !== "production"
                  ? "http://app.localhost:3000"
                  : "https://app.plotty.fi"
              }`}
            >
              <Button>Enter App</Button>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="https://discord.gg/dG2dPpCUKE" target="_blank">
                <Image
                  priority
                  src="/images/icons/icon-discord.svg"
                  height={32}
                  width={32}
                  alt="Join our community on Discord"
                />
              </Link>
              <Link href="https://twitter.com/PlottyFi" target="_blank">
                <Image
                  priority
                  src="/images/icons/icon-twitter.svg"
                  height={32}
                  width={32}
                  alt="Follow us on Twitter"
                />
              </Link>
            </div>
          </div>

          <Link href="https://docs.plotty.fi" target="_blank">
            <div className="flex items-center gap-4 mx-auto w-fit">
              <span>Read documentation</span>
              <HiArrowRight />
            </div>
          </Link>
        </div>
      </section>

      <section className="relative w-full">
        <div className="absolute right-0 w-[62vw] aspect-[817/1568]">
          <Image alt="" src={`/images/landing/bg-ellipse-2.png`} fill />
        </div>
        <div className="absolute left-0 bottom-0 w-[62vw] aspect-[699/1286]">
          <Image alt="" src={`/images/landing/bg-ellipse-3.png`} fill />
        </div>

        <div className="relative px-6 mx-auto max-w-7xl xl:px-0">
          <div className="flex flex-col w-full gap-8 pt-32 md:items-center md:flex-row">
            <div className="w-full lg:w-3/5">
              <div className="flex flex-col max-w-[450px] gap-4">
                <div className="font-bold font-display text-[42px] leading-tight">
                  {`Discover users' web3 yield farming journey`}
                </div>
                <div className="text-secondary-text">
                  {`With our platform that supports the largest number of DeFi protocols, chains, and strategies.`}
                </div>
                <div className="mt-2 w-fit">
                  <Link
                    href={`${
                      process.env.NODE_ENV !== "production"
                        ? "http://app.localhost:3000"
                        : "https://app.plotty.fi"
                    }`}
                  >
                    <Button>Try it now</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-4 lg:w-2/5 lg:max-w-[500px] mx-auto bg-no-repeat bg-cover bg-[url('/images/landing/stats-bg.png')]">
              <div className="flex gap-4">
                <div className="relative flex flex-col justify-center w-1/2 gap-2 text-center">
                  <div className="spotlight-1 top-[-40%] absolute left-[25%]" />
                  <div className="text-[28px] font-bold sm:text-[32px] font-display">
                    {`[Soon]`}
                  </div>
                  <div className="text-sm opacity-60 sm:text-base">
                    Total Value Earned
                  </div>
                </div>
                <div className="flex flex-col items-center w-1/2 gap-4">
                  <div className="flex flex-col justify-center w-full sm:h-40 h-[120px] gap-2 text-center">
                    <div className="text-[28px] font-bold sm:text-[32px] font-display">
                      {`[Soon]`}
                    </div>
                    <div className="text-sm opacity-60 sm:text-base">
                      Total Portfolios
                    </div>
                  </div>
                  <div className="flex flex-col justify-center w-full sm:h-40 h-[120px] gap-2 text-center">
                    <div className="text-[28px] font-bold sm:text-[32px] font-display">
                      {`[Soon]`}
                    </div>
                    <div className="text-sm opacity-60 sm:text-base">
                      Total Users
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex w-full sm:h-40 h-[120px] gap-2 px-12 overflow-hidden justify-between">
                <div className="flex flex-col justify-center gap-2">
                  <div className="text-[28px] font-bold sm:text-[32px] font-display">
                    {`[Soon]`}
                  </div>
                  <div className="text-sm opacity-60 sm:text-base">
                    Strategies Supporteds
                  </div>
                </div>

                <div className="w-[152px] flex items-center justify-center rounded-full">
                  <Image
                    alt=""
                    src={"/images/landing/stats-object.png"}
                    width={80}
                    height={80}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative px-6 pt-32 mx-auto max-w-7xl xl:px-0">
          <div className="font-bold font-display text-[42px] leading-tight">
            Why Plotty?
          </div>

          <div className="grid w-full grid-cols-1 gap-4 mt-12 lg:grid-cols-2">
            <div className="flex flex-col w-full gap-4">
              <div className="absolute hidden w-4 h-4 rotate-45 rounded-full bg-main-red left-24 bottom-24 filter blur-sm lg:block" />
              <div className="absolute hidden w-6 h-6 rotate-45 rounded-lg bg-main-yellow left-6 bottom-6 lg:block" />

              <div className="flex flex-col justify-between p-6 border rounded-3xl min-h-[320px]">
                <div className="text-secondary-text">
                  PORTFOLIO MANAGEMENT MADE SIMPLE
                </div>
                <div className="font-display font-bold text-[28px] py-[50px] sm:w-1/2">
                  Create, manage and track any yield portfolios
                </div>
                <Link href="https://docs.plotty.fi" target="_blank">
                  <div className="relative flex items-center justify-between">
                    <div className="absolute bottom-0 right-0 h-[160px] w-[160px]">
                      <Image alt="" src={`/images/landing/grid-red.png`} fill />
                    </div>
                    <div className="font-bold text-main-red">Learn more</div>
                    <HiArrowRight />
                  </div>
                </Link>
              </div>

              <div className="flex flex-col justify-between p-6 border rounded-3xl min-h-[320px] lg:mb-40">
                <div className="text-secondary-text">
                  ACCESS A WIDE RANGE OF STRATEGIES
                </div>
                <div className="font-display font-bold text-[28px] py-[50px] sm:w-1/2">
                  Supports the largest number of DeFi protocols and chains
                </div>
                <Link href="https://docs.plotty.fi" target="_blank">
                  <div className="relative flex items-center justify-between">
                    <div className="absolute bottom-0 right-0 h-[160px] w-[160px]">
                      <Image alt="" src={`/images/landing/grid-blue.png`} fill />
                    </div>
                    <div className="font-bold text-main-blue">Learn more</div>
                    <HiArrowRight />
                  </div>
                </Link>
              </div>
            </div>

            <div className="relative flex flex-col w-full gap-4">
              <div className="absolute hidden w-4 h-4 rotate-45 rounded-full bg-main-red right-24 top-6 filter blur-sm lg:block" />
              <div className="absolute hidden w-6 h-6 rotate-45 rounded-lg bg-main-blue right-6 top-24 lg:block" />

              <div className="flex flex-col justify-between p-6 border rounded-3xl min-h-[320px] lg:mt-40">
                <div className="text-secondary-text">
                  A NOVEL SOCIAL YIELD FARMING EXPERIENCE
                </div>
                <div className="font-display font-bold text-[28px] py-[50px] sm:w-1/2">
                  Copy from another or share the best-performing strategy
                </div>
                <Link href="https://docs.plotty.fi" target="_blank">
                  <div className="relative flex items-center justify-between">
                    <div className="absolute bottom-0 right-0 h-[160px] w-[160px]">
                      <Image alt="" src={`/images/landing/grid-purple.png`} fill />
                    </div>
                    <div className="font-bold text-main-purple">Learn more</div>
                    <HiArrowRight />
                  </div>
                </Link>
              </div>

              <div className="flex flex-col justify-between p-6 border rounded-3xl min-h-[320px]">
                <div className="text-secondary-text">MAXIMIZE YOUR EARNING</div>
                <div className="font-display font-bold text-[28px] py-[50px] sm:w-1/2">
                  Creators earn royalties. Investors earn by copying
                </div>
                <Link href="https://docs.plotty.fi" target="_blank">
                  <div className="relative flex items-center justify-between">
                    <div className="absolute bottom-0 right-0 h-[160px] w-[160px]">
                      <Image alt="" src={`/images/landing/grid-yellow.png`} fill />
                    </div>
                    <div className="font-bold text-main-yellow">Learn more</div>
                    <HiArrowRight />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-12 px-6 pt-32 mx-auto max-w-7xl xl:px-0">
          <div className="font-bold font-display text-[42px] leading-tight text-center">
            Token System & Revenue Model
          </div>

          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center w-full bg-main-blue rounded-2xl aspect-[1/1] sm:aspect-[2/1]">
                <Image
                  alt=""
                  src="/images/landing/creator-symbol.png"
                  width={142}
                  height={142}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-display font-bold text-[28px]">
                  Portfolio Creators
                </div>
                <div className="text-secondary-text">{`Portfolio creators earn rewards when they are copied and during the entire portfolio's journey.`}</div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center w-full bg-main-purple rounded-2xl aspect-[1/1] sm:aspect-[2/1]">
                <Image
                  alt=""
                  src="/images/landing/veplotty-symbol.png"
                  width={142}
                  height={142}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-display font-bold text-[28px]">PLOTTY</div>
                <div className="text-secondary-text">{`PLOTTY and esPLOTTY are the utility and governance token. Accures a share of the platform's generated fees.`}</div>
              </div>
            </div>
          </div>

          <Link href="https://docs.plotty.fi" target="_blank">
            <div className="flex items-center gap-4 mx-auto w-fit">
              <span>Read documentation</span>
              <HiArrowRight />
            </div>
          </Link>
        </div>

        <div className="w-full mx-auto mt-32 max-w-7xl">
          <div className="relative flex items-center justify-between gap-4 px-6 py-8 select-none xl:px-0">
            <Link className="cursor-pointer" href="/">
              <div className="flex items-center gap-2 w-[124px] h-12 pt-2">
                <Image
                  src={"/images/logo.png"}
                  width={45}
                  height={45}
                  alt="Plotty Logo"
                />
                <span className="text-2xl font-bold font-display">Plotty</span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Link href="https://discord.gg/dG2dPpCUKE" target="_blank">
                <Image
                  priority
                  src="/images/icons/icon-discord.svg"
                  height={32}
                  width={32}
                  alt="Join our community on Discord"
                />
              </Link>
              <Link href="https://twitter.com/PlottyFi" target="_blank">
                <Image
                  priority
                  src="/images/icons/icon-twitter.svg"
                  height={32}
                  width={32}
                  alt="Follow us on Twitter"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import homeBg from "../../public/home-bg.svg";
import { ConnectButton, useAccountModal } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import Logo from "~~/components/Logo/Logo";
import { Button } from "~~/components/ui/button";

const HomePage: NextPage = (): JSX.Element => {
  const { address } = useAccount();
  const isWalletConnected = isAddress(address);
  const { openAccountModal } = useAccountModal();

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="container flex items-center justify-center pt-8">
        <Logo />
      </div>

      <div className="container py-24 flex-1">
        <div className="bg-backgroundLight rounded-3xl p-4 md:p-6 max-w-full md:max-w-md text-center mx-auto">
          <div className="mb-1">
            {isWalletConnected ? (
              <svg
                width={71}
                height={80}
                viewBox="0 0 71 80"
                className="mx-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.22955 18.4333L33.348 0.576709C34.6822 -0.192236 36.3178 -0.192236 37.652 0.576709L68.7704 18.4333C70.1047 19.2023 70.9225 20.612 70.9225 22.1499V57.8204C70.9225 59.3583 70.1047 60.7681 68.7704 61.537L37.652 79.3509C36.3178 80.1199 34.6822 80.1199 33.348 79.3509L2.22955 61.4943C0.895288 60.7253 0.0775146 59.3156 0.0775146 57.7777V22.1072C0.0775146 20.612 0.895288 19.2023 2.22955 18.4333Z"
                  fill="#FF7527"
                />
                <path
                  d="M11.6398 29.7942L39.3434 13.7376L44.9313 16.9354L17.1603 32.9921L11.6398 29.7942Z"
                  stroke="#0E1E31"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M11.6397 29.7942L11.6061 36.1563L17.1603 39.4215V32.9921L11.6397 29.7942Z"
                  stroke="#0E1E31"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M17.1603 39.4215L22.7145 36.2236L28.2687 32.9921V58.6423L33.8229 55.4445V29.7942L44.9312 23.3648V16.9354L17.1603 32.9921"
                  stroke="#0E1E31"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M22.7144 55.4445L28.2685 58.6423V32.9921L22.7144 36.2236V55.4445Z"
                  stroke="#0E1E31"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M33.8229 29.7942L39.3771 32.9921L44.9313 29.7942L39.3771 26.5627L33.8229 29.7942Z"
                  stroke="#0E1E31"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M39.3771 32.9921V58.6423L56.0396 49.0151V42.6193L44.9313 49.0487V29.7942L39.3771 32.9921Z"
                  stroke="#0E1E31"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M39.3771 58.6423L33.8229 55.4445V29.7942L39.3771 32.9921V58.6423Z"
                  stroke="#0E1E31"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M56.0395 42.6193L50.4853 39.4215L44.9312 42.6193V49.0487L56.0395 42.6193Z"
                  stroke="#0E1E31"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width={122}
                height={125}
                className="mx-auto"
                viewBox="0 0 122 125"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M48.6656 62.1483L79.784 44.2917C81.1183 43.5227 82.7538 43.5227 84.0881 44.2917L115.207 62.1483C116.541 62.9172 117.359 64.327 117.359 65.8649V101.535C117.359 103.073 116.541 104.483 115.207 105.252L84.0881 123.066C82.7538 123.835 81.1183 123.835 79.784 123.066L48.6656 105.209C47.3314 104.44 46.5136 103.031 46.5136 101.493V65.8221C46.5136 64.327 47.3314 62.9172 48.6656 62.1483Z"
                  stroke="#FF7527"
                  strokeWidth="1.24887"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M3.70629 19.4333L34.8247 1.57671C36.159 0.807764 37.7945 0.807764 39.1288 1.57671L70.2472 19.4333C71.5815 20.2023 72.3992 21.612 72.3992 23.1499V58.8205C72.3992 60.3583 71.5815 61.7681 70.2472 62.537L39.1288 80.3509C37.7945 81.1199 36.159 81.1199 34.8247 80.3509L3.70629 62.4943C2.37203 61.7254 1.55426 60.3156 1.55426 58.7777V23.1072C1.55426 21.612 2.37203 20.2023 3.70629 19.4333Z"
                  stroke="#FF7527"
                  strokeWidth="1.24887"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M13.1164 30.7942L40.8201 14.7376L46.4079 17.9354L18.637 33.9921L13.1164 30.7942Z"
                  stroke="#FF7527"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M13.1164 30.7942L13.0828 37.1563L18.637 40.4215V33.9921L13.1164 30.7942Z"
                  stroke="#FF7527"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M18.637 40.4215L24.1912 37.2236L29.7454 33.9921V59.6423L35.2996 56.4445V30.7942L46.4079 24.3648V17.9354L18.637 33.9921"
                  stroke="#FF7527"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M24.1911 56.4445L29.7453 59.6423V33.9921L24.1911 37.2236V56.4445Z"
                  stroke="#FF7527"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M35.2995 30.7942L40.8537 33.9921L46.4079 30.7942L40.8537 27.5627L35.2995 30.7942Z"
                  stroke="#FF7527"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M40.8538 33.9921V59.6423L57.5163 50.0151V43.6193L46.408 50.0487V30.7942L40.8538 33.9921Z"
                  stroke="#FF7527"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M40.8537 59.6423L35.2995 56.4445V30.7942L40.8537 33.9921V59.6423Z"
                  stroke="#FF7527"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M57.5163 43.6193L51.9621 40.4215L46.4079 43.6193V50.0487L57.5163 43.6193Z"
                  stroke="#FF7527"
                  strokeWidth="1.04389"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <circle
                  cx="81.0543"
                  cy="74.5"
                  r="6.5"
                  stroke="#FF7527"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
                <path
                  d="M67.5543 90.5C67.5543 84.701 73.5984 84 81.0543 84C88.5101 84 94.5543 84.701 94.5543 90.5C94.5543 96.299 88.5101 101 81.0543 101C73.5984 101 67.5543 96.299 67.5543 90.5Z"
                  stroke="#FF7527"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <h1 className="font-grotesque font-semibold text-white">Welcome</h1>

          <div className="px-3">
            {isWalletConnected ? (
              <h5>To start using TokenLegacy, you need to deploy your will.</h5>
            ) : (
              <h5>Connect wallet address to continue</h5>
            )}
          </div>

          <div className="mt-5">
            {isWalletConnected ? (
              <>
                <Button className="w-full" onClick={() => router.push("/token-legacy/wallet")}>
                  <span>Deploy Will</span>

                  <svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.5 19.9276V4.92764C3.5 4.37536 3.94772 3.92764 4.5 3.92764H13.5C14.0523 3.92764 14.5 4.37536 14.5 4.92764V12.9276H16.5C17.6046 12.9276 18.5 13.823 18.5 14.9276V18.9276C18.5 19.4799 18.9477 19.9276 19.5 19.9276C20.0523 19.9276 20.5 19.4799 20.5 18.9276V11.9276H18.5C17.9477 11.9276 17.5 11.4799 17.5 10.9276V7.34185L15.8431 5.685L17.2574 4.27079L22.2071 9.22053C22.4024 9.4158 22.5 9.67172 22.5 9.92764V18.9276C22.5 20.5845 21.1569 21.9276 19.5 21.9276C17.8431 21.9276 16.5 20.5845 16.5 18.9276V14.9276H14.5V19.9276H15.5V21.9276H2.5V19.9276H3.5ZM5.5 5.92764V11.9276H12.5V5.92764H5.5Z"
                      fill="white"
                    />
                  </svg>
                </Button>
                <div className="mt-2" onClick={openAccountModal}>
                  Change wallet
                </div>
              </>
            ) : (
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <Button className="w-full" onClick={openConnectModal}>
                    <span>Connect wallet</span>

                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.67075 7.5H17.5041C17.9643 7.5 18.3374 7.8731 18.3374 8.33333V16.6667C18.3374 17.1269 17.9643 17.5 17.5041 17.5H2.50408C2.04385 17.5 1.67075 17.1269 1.67075 16.6667V7.5ZM2.50408 2.5H15.0041V5.83333H1.67075V3.33333C1.67075 2.8731 2.04385 2.5 2.50408 2.5ZM12.5041 11.6667V13.3333H15.0041V11.6667H12.5041Z"
                        fill="white"
                      />
                    </svg>
                  </Button>
                )}
              </ConnectButton.Custom>
            )}
          </div>
        </div>
      </div>

      <div className="h-[180px] overflow-hidden">
        <Image src={homeBg} className="object-cover w-full h-full" alt="home-bg" />
      </div>
    </div>
  );
};

export default HomePage;

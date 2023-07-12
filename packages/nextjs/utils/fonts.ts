import localFont from "next/font/local";

export const darkerGrotesque = localFont({
  variable: "--font-darker-grotesque",
  src: [
    {
      path: "./fonts/DarkerGrotesque-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/DarkerGrotesque-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const inter = localFont({
  variable: "--font-inter",
  src: [
    {
      path: "./fonts/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Inter-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";
import { PostHogProvider } from "./providers";
import PostHogPageView from "@/app/posthog-pageview"

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Event",
  description: "The event for developers by developers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased relative`}
      >
        <PostHogProvider>

          {/* Background */}
          <div className="absolute inset-0 -z-10">
            <LightRays
              raysOrigin="top-center"
              raysColor="#5dfeca"
              raysSpeed={0.5}
              lightSpread={0.9}
              rayLength={1.4}
              followMouse
              mouseInfluence={0.02}
              noiseAmount={0.1}
              distortion={0.05}
            />
          </div>

           <PostHogPageView />
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="pt-20">
            {children}
          </main>

        </PostHogProvider>
      </body>
    </html>
  );
}

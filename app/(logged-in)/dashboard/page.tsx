import { itemVariants } from "@/app/utils/constant";
import { EmptySummary } from "@/components/Summary/empty-summary";
import SummaryCard from "@/components/Summary/page";
import BgGradient from "@/components/common/bgGradient";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/common/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Summaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const uploadLimit = 5;
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) return redirect("/sign-in");

  const summaries = await Summaries(userId);
  return (
    <main>
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-2"
            >
              <MotionH1
                variants={itemVariants}
                initial="hidden"
                whileInView={"visible"}
                className="text-4xl font-bold 
                tracking-tight 
                bg-linear-to-r from-gray-600
              to-gray-900 bg-clip-text 
                text-transparent"
              >
                Your Summaries
              </MotionH1>
              <MotionP
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-gray-600"
              >
                Transform your PDFs into concise,actionable insights
              </MotionP>
            </MotionDiv>
            <Button
              variant={"link"}
              className="bg-linear-to-r from-rose-500
             to-rose-700 hover:from-rose-600
              hover:to-rose-800 hover:scale-105 
              transition-all duration-300 group 
              hover:no-underline"
            >
              <Link href="/upload" className="flex items-center text-white">
                <Plus />
                New Summary
              </Link>
            </Button>
          </div>
          <div className="mb-6">
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
              <p className="text-sm">
                You've reached the limit of ${uploadLimit} uploads on the Basic
                plan.{" "}
                <Link
                  href="/#pricing"
                  className="text-rose-800 underline 
                  font-medium 
                  underline-offset-4 
                  inline-flex items-center"
                >
                  Click here to upgrade to pro{" "}
                  <ArrowRight className="h-4 w-4 inline-block" />
                </Link>
                for unlimited uploads
              </p>
            </div>
          </div>
          {summaries.length === 0 ? (
            <EmptySummary />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {summaries.map((summary, index) => [
                <SummaryCard key={index} summary={summary} />,
              ])}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

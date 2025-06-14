import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import {
  MotionDiv,
  MotionH2,
  MotionP,
  MotionSection,
} from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/app/utils/constant";

const CtaSection = () => {
  return (
    <MotionSection className="bg-gray-50 py-12">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <MotionDiv className="space-y-2">
            <MotionH2
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Ready to save Hours of Reading Time ?
            </MotionH2>
            <MotionP
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
            >
              Transform lengthy documents into clear, actionable insights with
              our AI-powered summarizer.
            </MotionP>
          </MotionDiv>
          <div className="flex justify-center items-center flex-col gap-2 min-[400px]:flex-row">
            <MotionDiv
              variants={itemVariants}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6 }}
            >
              <Button
                variant={"link"}
                className="w-full min-[400px]:w-auto bg-linear-to-r from-slate-900
                 to-rose-500 hover:from-rose-500
                  hover:to-slate-900 hover:text-white
                   text-white transition-all duration-300 flex items-center justify-center"
              >
                <Link
                  href="/#pricing"
                  className="flex items-center justify-center px-6"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
                </Link>
              </Button>
            </MotionDiv>
          </div>
        </div>
      </div>
    </MotionSection>
  );
};

export default CtaSection;

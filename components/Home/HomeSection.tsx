import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/app/utils/constant";

const buttonVariants = {
  scale: 1.05,
  type: "spring",
  stiffness: 300,
  damping: 10,
};

const HomeSection = () => {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto flex flex-col z-0 
    items-center justify-center py-16 sm:py-20 lg:pb-28 
    transition-all animate-in lg:px-12 max-w-7xl"
    >
      <div className="flex">
        <div
          className="relative p-[1px] rounded-full 
        bg-linear-to-r from-rose-200 via-rose-500
         to-rose-800 animate-gradient-x group"
        >
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base 
            font-medium bg-white rounded-full 
            group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Sparkles className="animate-pulse h-6 w-6 mr-2 text-rose-600" />
            <p className="text-rose-600 text-base">Powered by AI</p>
          </Badge>
        </div>
      </div>
      <MotionH1 variants={itemVariants} className="font-bold text-center py-6">
        Transform PDFs into
        <MotionSpan
          whileHover={buttonVariants}
          className="relative inline-block"
        >
          <span className="relative z-10 px-2 inline-block">concise</span>
          <span className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1 " />
        </MotionSpan>
        summaries
      </MotionH1>
      <MotionH2
        variants={itemVariants}
        className="text-lg sm:text-xl lg:text-2xl text-center 
      px-4 lg:px-0 lg:max-w-4xl text-gray-600"
      >
        Get a beautiful summary reel of the documents in seconds
      </MotionH2>
      <MotionDiv variants={itemVariants} whileHover={buttonVariants}>
        <Button
          variant={"link"}
          className="text-white sm:mt-6 text-base sm:text-lg lg:text-2xl 
          rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 
          lg:py-8 lg:mt-16 bg-linear-to-r 
          from-slate-900 to-rose-500 hover:from-rose-500
           hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300"
        >
          <Link href="/#pricing" className="flex gap-2 items-center">
            <span>Try Gistify</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
};

export default HomeSection;

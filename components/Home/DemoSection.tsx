import { Pizza } from "lucide-react";
import { MotionDiv, MotionH3, MotionSection } from "../common/motion-wrapper";
import SummaryViewer from "../Summary/summary-viewer";
import { Summaries } from "@/lib/summaries";

const DemoSection = () => {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div></div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className="inline-flex items-center justify-center p-2 
          rounded-2xl bg-gray-100/80 mb-4 border-gray-500/20 border"
          >
            <Pizza className="w-6 h-6 text-rose-500" />
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Watch how Gistify transforms
              <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                {" "}
                this Next.js course pdf
              </span>{" "}
              into an easy-to-read-summary!
            </MotionH3>
          </div>
        </div>
        <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
          <MotionDiv
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SummaryViewer summary="demo_summary" />
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;

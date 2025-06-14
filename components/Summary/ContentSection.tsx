import { containerVariants } from "@/app/utils/constant";
import { MotionDiv } from "../common/motion-wrapper";

export const ContentSection = ({
  title,
  points,
}: {
  title: string;
  points: string[];
}) => {
  return (
    <div className="flex flex-col gap-2">
      {points.map((point) => {
        return (
          <MotionDiv
            variants={containerVariants}
            key={points.join("")}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="group relative bg-linear-to-br
             from-gray-200/[0.8] to-gray-100/[0.1] 
             p-4 rounded-2xl border border-gray-500/10 
             hover:shadow-lg transition-all"
          >
            <div
              className="absolute inset-0 bg-linear-to-br
             from-gray-500/10 to-transparent opacity-0 
             group-hover:opacity-100 transition-opacity 
             rounded-2xl"
            />
            {point}
          </MotionDiv>
        );
      })}
    </div>
  );
};

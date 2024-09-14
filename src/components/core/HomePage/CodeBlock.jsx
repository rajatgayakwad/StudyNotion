import React from "react";
import CTAButton from "./Button";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlock = ({
  position,
  heading,
  subHeading,
  ctabtn1,
  ctabtn2,
  backgroundGradient,
  CodeBlock,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between`}>
      {/* section 1 */}
      <div className="flex flex-col gap-8 ">
        {heading}
        <div className="text-richblack-300 font-bold">{subHeading}</div>

        <div className="flex items-center gap-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* section - 2 */}

      <div className={ ` relative h-fit flex flex-roww-[100%] py-4 lg:w-[500px]`}>
        {backgroundGradient}
        <div className="text-center  text-[15px] mt-2 w-[10%] text-richblack-400 flex flex-col font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`w-[100%] flex flex-col gap-2 font-bold text-[15px] font-mono ${codeColor} p-2`}
        >
          <TypeAnimation
            sequence={[CodeBlock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;

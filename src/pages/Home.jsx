import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HightlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import BannerVid from "../assets/Images/banner.mp4";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import Footer from "../components/common/Footer";
import HighlightText from "../components/core/HomePage/HighlightText";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div className="relative mx-auto flex w-11/12 max-w-[1260px] flex-col items-center justify-between gap-8 text-white">
      {/* section 1 */}

      <div>
        <Link to={"/signup"}>
          <div className=" group mx-auto rounded-full bg-richblack-800 mt-16 p-2 hover:scale-95 duration-200 font-bold w-fit shadow-[0px_3px_5px_0px_#ada8a84d]">
            <div className="flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900  ">
              <p>Become a instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with <HightlightText text={"Coding Skills"} />
        </div>

        <div className="text-lg w-[90%] mx-auto text-center mt-4 text-richblack-200">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-7 mt-8 justify-center ">
          <CTAButton active={true} linkto={"/signup"}>
            Learn more
          </CTAButton>

          <CTAButton active={false} linkto={"/signup"}>
            Book a demo
          </CTAButton>
        </div>

        <div className=" mx-auto flex justify-center my-12  shadow-[10px_-5px_50px_-5px] shadow-blue-200 ">
          <video
            muted
            autoPlay
            loop
            src={BannerVid}
            className="shadow-[20px_16px_0px_0px_#d4d0d0]"
          ></video>
        </div>

        {/* code section 1 */}
        <div>
          <CodeBlock
            position={"lg:flex-row gap-10 flex-col"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HightlightText text={"coding potentials"} /> with
                our online course
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            CodeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className=" absolute codeblock1 "></div>}
          />
        </div>

        {/* code section 2 */}

        <div>
          <CodeBlock
            position={"lg:flex-row-reverse gap-10 flex-col"}
            heading={
              <div className="text-4xl font-semibold">
                Start <HightlightText text={"coding in seconds"} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            CodeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        <ExploreMore />
      </div>

      {/* section 2 */}

      <div className=" bg-pure-greys-5 w-[100vw] text-richblack-700">
        <div className="homepage_bg h-[303px]">
          <div className="w-11/12 max-w-[1260px] flex flex-col items-center gap-5 mx-auto">
            <div className="h-[100px]"></div>
            <div className="flex gap-7   items-center justify-center ">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catal
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-11/12 max-w-[1260px] gap-7 mx-auto items-center justify-center">
          <div className="flex flex-col lg:flex-row justify-between mb-10 mt-[110px] ">
            <div className="text-4xl font-bold ">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand"} />
            </div>

            <div className="flex flex-col gap-7 items-start ">
              <p className="text-[16px] ">
                The moder CodePlay is the dictates its own terms. Today, to be a
                competitive specialist requires more than professional skills.
              </p>
              <CTAButton active={true} linkto={"/login"}>
                Learn more
              </CTAButton>
            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </div>

      {/* section 3 */}

      <div className="w-11/12 mx-auto max-w-[1260px] flex flex-col gap-8">
        <InstructorSection />

        <h2 className="text-center text-4xl font-semibold mt-10">
          review from other learns
        </h2>

        {/* review slider */}
        <ReviewSlider/>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;

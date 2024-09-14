import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";

import FoundingStory from "../assets/Images/FoundingStory.png";
import aboutImg1 from "../assets/Images/aboutus1.webp";
import aboutImg2 from "../assets/Images/aboutus2.webp";
import aboutImg3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import StateComponent from "../components/core/AboutPage/StateComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";

const About = () => {
  return (
    <div className="text-richblack-5">
      {/* section 1 */}
      <section className="bg-richblack-700">
        <div className="w-11/12 mx-auto max-w-[1260px] relative flex flex-col gap-10 justify-between text-center text-white">
          <header className="py-20 text-4xl font-semibold lg:w-[70%] mx-auto">
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p className="text-lg font-normal text-richblack-300 mt-4">
              CodePlay is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute w-[100%] bottom-0 left-[50%] translate-x-[-50%] translate-y-[30%] grid grid-cols-3 gap-3 lg:gap-5">
            <img src={aboutImg1} alt="" />
            <img src={aboutImg2} alt="" />
            <img src={aboutImg3} alt="" />
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="border border-richblack-700">
        <div className="w-11/12 max-w-[1260px] mx-auto flex flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px]"></div>
          <Quote />
        </div>
      </section>

      {/* section -3 */}
      <section>
        <div className="flex flex-col w-11/12 mx-auto max-w-[1260px] text-richblack-500 gap-10">
          <div className="flex gap-10 flex-col lg:flex-row items-center justify-between">
            {/* left */}
            <div className="my-24 lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            {/* right */}
            <div>
              <img
                src={FoundingStory}
                alt=""
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>

          <div className="flex flex-col items-center lg:flex-row gap-10 justify-between">
            {/* left */}

            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>

            {/* right */}

            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Our Mission
              </h1>

              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StateComponent />

      <section className="w-11/12 mb-20  mx-auto max-w-[1260px] mt-20 flex flex-col justify-between gap-10 text-white"  >
        <LearningGrid/>
        <ContactFormSection/>
      </section>


      <section>
        <div className="text-4xl text-center" >
            Review from other learners
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default About;

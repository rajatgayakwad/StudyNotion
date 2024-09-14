import React from "react";
import ContactDetails from "../components/core/ContactPage/ContactDetails";
import ContactUsForm from "../components/core/ContactPage/ContactUsForm";
import Footer from "../components/common/Footer";

const ContactUs = () => {
  return (
    <div className=" mt-20 text-white">
      <div className="flex flex-col gap-10 lg:flex-row max-w-[1260px] mx-auto w-11/12 justify-between mb-20 ">
        {/* left */}
        <div className="lg:w-[40%] ">
          <ContactDetails />
        </div>

        {/* right */}
        <div className="lg:[60%] border p-[70px] border-richblack-400 rounded-xl ">
          <ContactUsForm />
        </div>
      </div>

      <div className="mb-20">
        <div className="text-center text-4xl">Reviews from other learners</div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;

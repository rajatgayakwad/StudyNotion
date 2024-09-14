import React from 'react'

import * as Icon1 from "react-icons/bi"
import * as Icon2 from "react-icons/hi2"
import * as Icon3 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@codeplay.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "CodePlay Office, Bhopal-462022",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {

  
  return (
    <div className='bg-richblack-800 rounded-xl overflow-hidden' >
      {
        contactDetails.map((ele, i) => {
          let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
          return (
            <div className='text-richblack-200 bg-richblack-800  p-4 flex flex-col lg:p-6  ' key={i} >
                <div className='flex to-richblue-5 gap-3 flex-row items-center' >
                  <Icon size={25}/>
                  <h1 className="text-lg font-semibold text-richblack-5">
                    {ele?.heading}
                  </h1>
                </div>
                <p className='' >{ele?.description}</p>
                <p className='font-semibold'>{ele?.details}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default ContactDetails
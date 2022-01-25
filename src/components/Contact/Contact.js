import { useRef } from "react";
import emailjs from "@emailjs/browser";

import "./contact.css";
import Phone from "../../img/phone.png";
import Email from "../../img/email.png";
import Github from "../../img/github.png";
import Address from "../../img/address.png";

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2ko4uxh",
        "template_cgtxlz4",
        formRef.current,
        "user_tHuKF4B4WngyKKSdHEFTh"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="c">
      <div className="c-bg"></div>
      <div className="c-wrapper">
        <div className="c-left">
          <h1 className="c-title">Let's discuss your project</h1>
          <div className="c-info">
            <div className="c-info-item">
              <img src={Phone} alt="" className="c-icon" />
              +8801940660150
            </div>
            <div className="c-info-item">
              <img className="c-icon" src={Email} alt="" />
              namehiron.96@gmail.com
            </div>
            <div className="c-info-item">
              <img className="c-icon" src={Github} alt="" />
              https://github.com/jahidhiron
            </div>
            <div className="c-info-item">
              <img className="c-icon" src={Address} alt="" />
              Faidabad Transmitter, Dhaka - 1230, Bangladesh
            </div>
          </div>
        </div>
        <div className="c-right">
          <p className="c-desc">
            <b>What’s your story?</b> Get in touch. Always available for
            freelancing if the right project comes along. me.
          </p>
          <form ref={formRef} onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" name="user_name" />
            <input type="text" placeholder="Subject" name="user_subject" />
            <input type="text" placeholder="Email" name="user_email" />
            <textarea rows="5" placeholder="Message" name="message" />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

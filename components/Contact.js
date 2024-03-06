import styles from "@/styles/contact.module.css";
import Image from "next/image";
import houseImage from "@/public/houseImage2.png";
import { toast } from "react-toastify";
import { useState } from "react";
import { allSectionAnimation } from "@/lib/animation";
import { motion } from "framer-motion";

function Contact() {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const notify = () =>
    toast.success(`${contactDetails.name} your email sent successfully`);

  function emailFunc() {
    if (contactDetails.name && contactDetails.email && contactDetails.message) {
      setContactDetails({
        name: "",
        email: "",
        message: "",
      });
      notify();
    } else {
      toast.error("Please fill in all fields");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <>
      <section className={styles.contact_section} id="contact">
        <motion.div
          className={styles.contact_area}
          variants={allSectionAnimation}
          initial="initial"
          whileInView="visible"
        >
          <div className={styles.contact_container}>
            <Image
              src={houseImage}
              className={styles.contact_side_image}
              alt="contact_image"
              draggable={false}
            />
            <div className={styles.contact_card_container}>
              <h1>Contact me</h1>
              <div className={styles.contact_card}>
                <input
                  className={styles.contact_inputs}
                  type="text"
                  value={contactDetails.name}
                  onChange={handleInputChange}
                  name="name"
                  placeholder="Name"
                />
                <input
                  className={styles.contact_inputs}
                  type="email"
                  value={contactDetails.email}
                  onChange={handleInputChange}
                  name="email"
                  placeholder="Email"
                />
                <textarea
                  className={styles.contact_inputs}
                  name="message"
                  onChange={handleInputChange}
                  cols="30"
                  value={contactDetails.message}
                  rows="5"
                  placeholder="Message"
                ></textarea>
              </div>
              <button
                onClick={emailFunc}
                className={`btn ${styles.contact_send_btn}`}
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default Contact;

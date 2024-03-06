import styles from "@/styles/viewproperty.module.css";
import contact_styles from "@/styles/contact.module.css";
import React, { useEffect, useState } from "react";
import { createClient } from "next-sanity";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import { Swiper, SwiperSlide } from "swiper/react";
import { LiaBathSolid, LiaBedSolid } from "react-icons/lia";
import { BsSlashSquare } from "react-icons/bs";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import PropertySlider from "./PropertySlider";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { toast } from "react-toastify";

function ViewProperty({ property_details }) {
  const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
  });

  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const notify = () =>
    toast.success(`${contactDetails.name} Soon we response you!!`);

  function emailFunc() {
    if (contactDetails.name && contactDetails.email && contactDetails.message) {
      setContactDetails({
        name: "",
        email: "",
        message: "",
      });
      onCloseModal();
      notify();
    } else {
      toast.error("Please fill in all fields");
    }
  }

  const router = useRouter();
  const [PropertyDetailsArray, setPropertyDetailsArray] =
    useState(property_details);

  useEffect(() => {
    let slugFilteredArray = property_details.filter((value) => {
      return value.slug.current == router.query.slug;
    });
    setPropertyDetailsArray(slugFilteredArray);
  }, [property_details, router.query.slug]);

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <>
      <section className={styles.view_property}>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {PropertyDetailsArray[0].property_image.map((value, key) => {
            return (
              <SwiperSlide key={key}>
                <div
                  className={styles.view_property_image}
                  style={{
                    backgroundImage: `url(${builder.image(value.asset._ref)})`,
                  }}
                ></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className={styles.property_details_area}>
          <div className={styles.property_details_container}>
            <div className={styles.container_header}>
              <div className={styles.mainTextBox}>
                <div>
                  <p>location: {PropertyDetailsArray[0].location}</p>
                  <h1>{PropertyDetailsArray[0].property_name}</h1>
                  <h1>${PropertyDetailsArray[0].price}</h1>
                </div>
                <button
                  onClick={onOpenModal}
                  className={`btn ${styles.view_page_btn}`}
                >
                  Deal Property
                </button>
              </div>
            </div>
            <div className={styles.overview_container}>
              <div className={styles.box_area}>
                <div className={styles.box}>
                  <h1>property overview</h1>
                  <p>
                    <span>Description: </span>
                    {PropertyDetailsArray[0].property_description}
                  </p>
                  <p>
                    <span>Type: </span>
                    {PropertyDetailsArray[0].type}
                  </p>
                  <div className={styles.property_size_details}>
                    <div>
                      <LiaBathSolid size={30} color="#0075ff" />
                      <p>{PropertyDetailsArray[0].beds}</p>
                    </div>
                    <div>
                      <LiaBedSolid size={30} color="#0075ff" />
                      <p>{PropertyDetailsArray[0].baths}</p>
                    </div>
                    <div>
                      <BsSlashSquare size={30} color="#0075ff" />
                      <p>{PropertyDetailsArray[0].sqft}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.recent_listing_slider_container}>
          <div className={styles.listing_slider_area}>
            <h1>Recent Listing</h1>
            <PropertySlider property_card_details={property_details} />
          </div>
        </div>
      </section>
      <div>
        <Modal open={open} onClose={onCloseModal} center>
          <div
            className={`${contact_styles.contact_card_container} ${styles.contact_card}`}
          >
            <div className={contact_styles.contact_card}>
              <input
                className={contact_styles.contact_inputs}
                type="text"
                onChange={handleInputChange}
                value={contactDetails.name}
                name="name"
                placeholder="Name"
              />
              <input
                className={contact_styles.contact_inputs}
                value={contactDetails.email}
                type="email"
                onChange={handleInputChange}
                name="email"
                placeholder="Email"
              />
              <textarea
                className={contact_styles.contact_inputs}
                name="message"
                cols="30"
                value={contactDetails.message}
                rows="5"
                onChange={handleInputChange}
                placeholder="Message"
              ></textarea>
            </div>
            <button
              onClick={emailFunc}
              className={`btn ${contact_styles.contact_send_btn}`}
            >
              Send
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default ViewProperty;

export async function getServerSideProps() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false,
  });

  const details = `*[_type == "properties"]`;
  const property_details = await client.fetch(details);

  return {
    props: {
      property_details,
    },
  };
}

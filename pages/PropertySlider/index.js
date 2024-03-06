import styles from "@/styles/propertyslider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css";
import { LiaBedSolid } from "react-icons/lia";
import { LiaBathSolid } from "react-icons/lia";
import { BsSlashSquare } from "react-icons/bs";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { propertyCardsSliderBreakPoints } from "@/lib/sliderbreakpoints";
import { motion } from "framer-motion";
import { allSectionAnimation } from "@/lib/animation";

function PropertySlider({ property_card_details, isCentered, isTitle }) {
  const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
  });

  return (
    <>
      <section className={styles.property_slider}>
        <motion.div
          className={styles.slider_area}
          variants={allSectionAnimation}
          initial="initial"
          whileInView="visible"
        >
          <div className={styles.slider_container}>
            {isTitle && <h1>Recent Listing</h1>}
            <div>
              <Swiper
                slidesPerView={3}
                spaceBetween={50}
                centeredSlides={isCentered}
                breakpoints={propertyCardsSliderBreakPoints}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                freeMode={true}
                modules={[FreeMode, Autoplay]}
                className="mySwiper"
              >
                {property_card_details &&
                  property_card_details.map((value, key) => {
                    return (
                      <SwiperSlide key={key} className={styles.sliders}>
                        <div className="property_cards">
                          <picture>
                            <source
                              srcSet={builder.image(
                                value.property_image[0].asset._ref
                              )}
                              type="image/avif"
                            />
                            <source
                              srcSet={builder.image(
                                value.property_image[0].asset._ref
                              )}
                              type="image/webp"
                            />
                            <img
                              src={builder.image(
                                value.property_image[0].asset._ref
                              )}
                              alt="property_image"
                              draggable={false}
                              className={styles.agent_image}
                            />
                          </picture>
                          <div className="property_details_container">
                            <div className="property_top_texts">
                              <Link href={`/${value.slug.current}`}>
                                <h2>{value.property_name}</h2>
                                <p>
                                  {value.property_description.slice(0, 120)}...
                                </p>
                              </Link>
                            </div>
                            <span>${value.price}</span>
                            <div className="property_card_footer">
                              <div>
                                <LiaBedSolid size={30} />
                                <p>{value.beds}</p>
                              </div>
                              <div>
                                <LiaBathSolid size={30} />
                                <p>{value.baths}</p>
                              </div>
                              <div>
                                <BsSlashSquare size={30} />
                                <p>{value.sqft}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default PropertySlider;

import styles from "@/styles/testimonial.module.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { testimonialSliderBreakPoints } from "@/lib/sliderbreakpoints";
import imageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";
import { allSectionAnimation } from "@/lib/animation";

function Testimonial({ testimonialDetails }) {
  const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
  });

  return (
    <>
      <section className={styles.testimonial_section} id="testimonals">
        <h1>Testimonials</h1>
        <motion.div
          className={styles.testimonial_area}
          variants={allSectionAnimation}
          initial="initial"
          whileInView="visible"
        >
          <div className={styles.testimonial_container}>
            <div>
              <Swiper
                slidesPerView={3}
                breakpoints={testimonialSliderBreakPoints}
                spaceBetween={100}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                freeMode={true}
                modules={[FreeMode, Autoplay]}
                className="mySwiper"
              >
                {testimonialDetails &&
                  testimonialDetails.map((value, key) => {
                    return (
                      <SwiperSlide
                        style={{ display: "flex", justifyContent: "center" }}
                        key={key}
                      >
                        <div className={styles.testimonial_card}>
                          <div className={styles.testimonial_text}>
                            <p>{value.client_testimonial}</p>
                          </div>
                          <div className={styles.testimonial_writer_profile}>
                            <picture>
                              <source
                                srcSet={builder.image(
                                  value.client_image.asset._ref
                                )}
                                type="image/avif"
                              />
                              <source
                                srcSet={builder.image(
                                  value.client_image.asset._ref
                                )}
                                type="image/webp"
                              />
                              <img
                                src={builder.image(
                                  value.client_image.asset._ref
                                )}
                                alt="realestate_agent_image"
                                draggable={false}
                                className={styles.testimonial_agent_image}
                              />
                            </picture>

                            <h2>{value.client_name}</h2>
                            <p>{value.clients_role}</p>
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

export default Testimonial;

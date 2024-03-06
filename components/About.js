import styles from "@/styles/about.module.css";
import imageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";
import Link from "next/link";
import { allSectionAnimation } from "@/lib/animation";

function About({ aboutDetails }) {
  const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
  });

  return (
    <>
      <section className={styles.about_section} id="about">
        <motion.div
          className={styles.about_area}
          variants={allSectionAnimation}
          initial="initial"
          whileInView="visible"
        >
          <div className={styles.about_container}>
            <div className={styles.about_image_container}>
              <picture>
                <source
                  srcSet={builder.image(aboutDetails[0].mainImage.asset._ref)}
                  type="image/avif"
                />
                <source
                  srcSet={builder.image(aboutDetails[0].mainImage.asset._ref)}
                  type="image/webp"
                />
                <img
                  src={builder.image(aboutDetails[0].mainImage.asset._ref)}
                  alt="agent_image"
                  draggable={false}
                  className={styles.agent_image}
                />
              </picture>
            </div>
            <div className={styles.about_text_container}>
              <h1>About me</h1>
              <h1>Steve Demos</h1>
              <p>{aboutDetails[0].description}</p>
              <Link href="/#contact">
                <button className="btn">Let’s Make a deal</button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default About;

import styles from "@/styles/home.module.css";
import house_image from "@/public/houseImage.png";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { allSectionAnimation } from "@/lib/animation";
function Home() {
  return (
    <>
      <section className={styles.home_section} id="home">
        <motion.div
          variants={allSectionAnimation}
          initial="initial"
          whileInView="visible"
          className={styles.home_area}
        >
          <div className={styles.home_container}>
            <div className={styles.home_section_text_container}>
              <h1>
                Find Your <span>Dream</span> Palace Today
              </h1>
              <p>
                Discover homes tailored to you. Your perfect property is just a
                click away. Start your search today!
              </p>
              <Link href="/components/Properties">
                <button className={`${styles.home_section_btn} btn`}>
                  Expolre
                </button>
              </Link>
            </div>
            <Image
              src={house_image}
              alt="house_image"
              draggable={false}
              className={styles.home_section_side_image}
            ></Image>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default Home;

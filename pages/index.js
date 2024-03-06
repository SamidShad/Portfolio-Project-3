import { createClient } from "next-sanity";
import About from "../components/About";
import Contact from "../components/Contact";
import Home from "../components/Home";
import Testimonial from "../components/Testimonial";
import PropertySlider from "./PropertySlider";
import Head from "next/head";

export default function App({
  aboutDetails,
  testimonialDetails,
  property_card_details,
}) {
  return (
    <>
      <Head>
        <title>Real Estate Agent Website</title>
        <meta name="description" content="Best Real Estate Agent Website" />
        <meta
          name="keywords"
          content="realestate,house,sell,buy,rent,property"
        />
        <link rel="icon" href="/logo.webp" />
      </Head>
      <Home />
      <About aboutDetails={aboutDetails} />
      <PropertySlider
        property_card_details={property_card_details}
        isCentered={true}
        isTitle={true}
      />
      <Testimonial testimonialDetails={testimonialDetails} />
      <Contact />
    </>
  );
}

export async function getServerSideProps() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false,
  });

  const about = `*[_type == "about"]`;
  const aboutDetails = await client.fetch(about);
  const testimonial = `*[_type == "testimonials"]`;
  const testimonialDetails = await client.fetch(testimonial);
  const details = `*[_type == "properties"][0..5]`;
  const property_card_details = await client.fetch(details);
  return {
    props: {
      aboutDetails,
      testimonialDetails,
      property_card_details,
    },
  };
}

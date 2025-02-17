import React from "react";
import Banner from "./Banner";
import Featured from "./Featured";
import ContactUs from "./ContactUs";
import { Helmet } from "react-helmet-async";
import FAQ from "./Faq";
import Newsletter from "./Newsletter";
import Testimonials from "./Testimonials";
import KeyFeatures from "./KeyFeatures";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>BloodHope | Home</title>
      </Helmet>
      <Banner></Banner>
      <KeyFeatures></KeyFeatures>
      <Featured></Featured>
      <FAQ></FAQ>
      <ContactUs></ContactUs>
      <Testimonials></Testimonials>
      <Newsletter></Newsletter>
    </div>
  );
}

import Head from "next/head";
import { Header } from "../modules/Header";
import { TagSlider } from "../modules/TagSlider";
import { ForClient } from "../modules/ForClient";
import { Footer } from "../modules/Footer";
import { ClinicSlider } from "../modules/ClinicSlider";
import { NextPage } from "next";
import { MainPageProjectList } from "../modules/MainPageProjectList";
import { SplineBackground } from "../modules/SplineBackground";
import { PopUp } from "../modules/PopUp";
import { useState } from "react";
import { MainPageHeroText } from "../modules/MainPageHeroText";
import { Container, Spacer } from "../modules/shared";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const [popUpActive, setPopUpActive] = useState(false);

  return (
    <>
      <Head>
        <title>Реестр проектов СПбГУ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header popUpSetActive={setPopUpActive} />
      <PopUp active={popUpActive} setActive={setPopUpActive} />
      <Spacer axis="vertical" size={40} />
      <Container>
        <MainPageHeroText />
      </Container>
      <SplineBackground image={"/clinic-slider-bg.svg"}>
        <Container>
          <ClinicSlider />
        </Container>
      </SplineBackground>
      <Spacer axis="vertical" size={40} />
      <Container>
        <TagSlider />
      </Container>
      <Spacer axis="vertical" size={40} />
      <SplineBackground image={"/mainpage-projects-bg.svg"}>
        <Container>
          <MainPageProjectList />
        </Container>
      </SplineBackground>
      <Spacer axis="vertical" size={40} />
      <Container>
        <ForClient />
      </Container>
      <Spacer axis="vertical" size={40} />
      <Footer />
    </>
  );
};

export default Home;

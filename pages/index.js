import Head from "next/head";
import Header from "../components/Header/";
import FirstInfo from "../components/FirstInfo/";
import ClinicCard from "../components/ClinicCard/";
import Taglist from "../components/Taglist";
import Container from "../components/Container";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Реестр проектов СПбГУ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <Taglist />
      </Container>
      <FirstInfo />
      <ClinicCard />
    </div>
  );
}

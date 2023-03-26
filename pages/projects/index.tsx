import Head from "next/head";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import ProjectList from "../../components/ProjectList";
import Spacer from "../../components/Spacer";
import { NextPage } from "next";
import { Filters } from "../../components/ProjectList/Filters";

interface ProjectsProps {}

const Projects: NextPage<ProjectsProps> = () => {
  return (
    <>
      <Head>
        <title>Реестр проектов СПбГУ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Spacer axis="vertical" size={50} />
      <Container>
        <Filters />
        <div style={{ height: "200px" }}></div>
        <ProjectList />
      </Container>
      <Footer />
    </>
  );
};

export default Projects;

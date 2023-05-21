import Head from "next/head";
import { Header } from "../../modules/Header";
import { Container } from "../../modules/shared";
import { Footer } from "../../modules/Footer";
import ProjectList from "../../modules/ProjectList";
import { Spacer } from "../../modules/shared";
import { GetStaticProps, NextPage } from "next";
import { Filters } from "../../modules/ProjectList/components/Filters";
import { IAPIProject } from "../../types";
import { useState } from "react";
import { PopUp } from "../../modules/PopUp";

export const getStaticProps: GetStaticProps = async (context: any) => {
  const projects = await fetch(`http://localhost:3000/api/projects`).then(
    (data) => data.json()
  );

  return {
    props: {
      projects,
    },
    revalidate: 60,
  };
};

interface ProjectsProps {
  projects: IAPIProject[];
}

const Projects: NextPage<ProjectsProps> = ({ projects }) => {
  const [popUpActive, setPopUpActive] = useState(false);
  return (
    <>
      <Head>
        <title>Проекты | Реестр проектов СПбГУ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header popUpSetActive={setPopUpActive} />
      <PopUp active={popUpActive} setActive={setPopUpActive} />
      <Spacer axis="vertical" size={50} />
      <Container>
        <ProjectList projects={projects} type="public" />
      </Container>
      <Footer />
    </>
  );
};

export default Projects;

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Header } from "../../../modules/Header";
import { Footer } from "../../../modules/Footer";
import { Container, Spacer } from "../../../modules/shared";
import { Metrics } from "../../../modules/Metrics";
import {
  getProjectCommits,
  getProjectPullRequests,
  getProjects,
} from "../../../modules/shared/lib/projects";
import { IAPICommit, IAPIPullRequest } from "../../../types";

/*
Сейчас генерируются статичные страницы, которые обновляются максимум раз в минуту,
но вообще по-хорошему это только временное решение, билдиться это всё будет очень долго,
когда будет 100+ страниц с метриками.
Сделано это потому что на момент создания файла API для метрик работает очень медленно,
секунд по 30 на один запрос.
В будущем бекенду нужно будет самим хранить данные по коммитам/пулл-реквестам и всем остальным
и тогда уже отпадёт необходимость генерировать статические страницы здесь
*/

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjects();

  const paths = projects
    .filter((project) => project.projectId !== undefined)
    .map((project) => {
      return {
        params: { id: "" + project.projectId! },
      };
    });

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const commitsFetch = getProjectCommits(context.params.id);
  const PRsFetch = getProjectPullRequests(context.params.id);

  const [commits, PRs] = await Promise.all([commitsFetch, PRsFetch]);

  return {
    props: {
      commits,
      PRs,
    },
    revalidate: 60,
  };
};

interface MetricsPageProps {
  commits: IAPICommit[] | null;
  PRs: IAPIPullRequest[] | null;
}

const MetricsPage: NextPage<MetricsPageProps> = ({ commits, PRs }) => {
  return (
    <>
      <Head>
        <title>Реестр проектов СПбГУ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header logoColor="blue" type="admin" />
      <Spacer axis="vertical" size={30} />
      <Container>
        <Metrics commits={commits || []} prs={PRs || []} />
      </Container>
      <Footer />
    </>
  );
};

export default MetricsPage;

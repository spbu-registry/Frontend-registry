import Head from "next/head";
import { Header } from "../../modules/Header";
import { Container } from "../../modules/shared";
import { Footer } from "../../modules/Footer";
import FormForClient from "../../modules/FormForClient";
import { Spacer } from "../../modules/shared";
import { NextPage } from "next";
import { useState } from "react";
import { PopUp } from "../../modules/PopUp";

interface ClientFormProps {}

const ClientForm: NextPage<ClientFormProps> = () => {
  const [popUpActive, setPopUpActive] = useState(false);
  return (
    <div>
      <Head>
        <title>Заявка для заказчиков | Реестр проектов СПбГУ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header popUpSetActive={setPopUpActive} />
      <PopUp active={popUpActive} setActive={setPopUpActive} />
      <Spacer axis="vertical" size={50} />
      <Container>
        <FormForClient stylesProp={{ width: "100%", height: "80vh" }} />
      </Container>
      <Footer />
    </div>
  );
};

export default ClientForm;

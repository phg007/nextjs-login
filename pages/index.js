import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getCookie } from "cookies-next";
import { verifica } from "../services/user";

export default function Home() {
  return (
    <div className={styles.container}>Página segura - Perfil do Usuário</div>
  );
}

export const getServerSideProps = async (req, res) => {
  try {
    const token = getCookie("authorization", { req, res });
    console.log(token);
    if (!token) throw new Error("Token Inválido");
    verifica(token);
    return {
      props: {},
    };
  } catch (err) {
    return {
      // redirect: {
      //   permanent: false,
      //   destination: "/login"
      // },
      props: {},
    };
  }
};

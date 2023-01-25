import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import { getCookie } from "cookies-next";
import { verifica } from "../services/user";
import { useContext, useEffect } from "react";
import { AuthContext } from "../src/contexts/AuthContext";
import { api } from "../services/api";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";


export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/login");
  });

  return (
    
    
    <div className={styles.container}>
      Página segura - Perfil do Usuário
      <img src={user?.avatar_url} />
      <p>{user?.name}</p>
    </div>

  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["nexths-login-token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

// export const getServerSideProps:  GetServerSideProps = async (ctx)=>{
//     console.log(ctx.req.cookies)
//     return{
//         props:{}
//     }
// }

// export const getServerSideProps = async (req, res) => {
//   try {
//     const token = getCookie("authorization", { req, res });
//     console.log(token);
//     if (!token) throw new Error("Token Inválido");
//     verifica(token);
//     return {
//       props: {},
//     };
//   } catch (err) {
//     return {
//       // redirect: {
//       //   permanent: false,
//       //   destination: "/login"
//       // },
//       props: {},
//     };
//   }
// };

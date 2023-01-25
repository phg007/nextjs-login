import { useState } from "react";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import LoginCard from "../src/components/loginCard/loginCard";
import styles from "../styles/Login.module.css";
import Input from "../src/components/input/inpunt";
import Button from "../src/components/button/button";
import { useForm } from "react-hook-form";


export default function cadastroPage() {
const [error, setError] = useState("");
  const router = useRouter();
  const { register, handleSubmit } = useForm();

 async function handleSignIn(formData) {

  
    try {
      const response = await fetch(`/api/user/cadastro`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      
      
      if (response.status !== 201) throw new Error(json);

      setCookie("authorization", json);
     // router.push("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Crie a sua conta ">
        <form className={styles.form}>
          <Input
          register={register}
            type="text"
            placeholder="Seu nome"
            name = 'nome'
            required
        
            // onChange={(e) => {
            //   handleFormEdit(e, "name");
            // }}
          />
          <Input
           register={register}
            type="email"
            placeholder="Seu e-mail"
            name = 'email'
            required
           
            // onChange={(e) => {
            //   handleFormEdit(e, "email");
            // }}
          />
          <Input
            register={register}
            type="password"
            placeholder="Sua senha"
            name = 'password'
            required
            
            // onChange={(e) => {
            //   handleFormEdit(e, "password");
            // }}
          />
          <Button>Entrar</Button>
          {error && <p>{error}</p>}
          <Link href="/login">Já possui uma conta?</Link>
        </form>
      </LoginCard>
    </div>
  );
}

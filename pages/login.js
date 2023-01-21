import { useState } from "react";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import LoginCard from "../src/components/loginCard/loginCard";
import styles from "../styles/Login.module.css";
import Input from "../src/components/input/inpunt";
import Button from "../src/components/button/button";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleFormEdit = (event, name) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleForm = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/user/login`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const json = await response.json();

      if (response.status !== 200) throw new Error(json);

      setCookie("authorization", json);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.background}>
      <LoginCard title="Mart Minas web">
        <form onSubmit={handleForm} className={styles.form}>
          <Input
            type="text"
            placeholder="Seu e-mail"
            required
            value={formData.email}
            onChange={(e) => {
              handleFormEdit(e, "email");
            }}
          />
          <Input
            type="password"
            placeholder="Sua senha"
            required
            value={formData.password}
            onChange={(e) => {
              handleFormEdit(e, "password");
            }}
          />
          <Button>Entrar</Button>
          {error && <p className={styles.Error}>{error}</p>}
          <Link href="/cadastro">Ainda não possui conta?</Link>
        </form>
      </LoginCard>
    </div>
  );
}

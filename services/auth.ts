import { v4 as uuid } from "uuid";

type SingInRequestData = {
  email: string,
  password: string,
};



const delay = (amount = 750) => new Promise((resolve) => setTimeout(resolve, amount));

export async function singInRequest(data: SingInRequestData) {
  await delay();

  return {
    token: uuid(),
    user: {
      name: "Paulo Henrique ",
      email: "Paulo henrique ",
      avatar_url: "https://avatars.githubusercontent.com/u/65259656?s=40&v=4",
   
    },
  };
}

export async function recoverUserInformation(){
  await delay()
  return {
   
    user: {
      name: "Paulo Henrique ",
      email: "Paulo henrique ",
      avatar_url: "https://avatars.githubusercontent.com/u/65259656?s=40&v=4",
    }
  }
}

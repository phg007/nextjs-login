import { createContext } from "react"; 
import { recoverUserInformation, singInRequest } from "../../services/auth";
import { setCookie, parseCookies } from "nookies";
import { useState } from "react";
import Router from "next/router";
import { useEffect } from "react";
import { api } from "../../services/api";


type AuthContextType={
     isAuthenticated:boolean;
     user: User;
     signIn:(data:SingInData)=> Promise<void>
}

type SingInData = {
    email: string
    password: string
}

type User ={
    name: string;
    email: string;
    avatar_url: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({children}){

    const [user, setUser] = useState<User | null>(null);

    const isAuthenticated = !!user;

    useEffect(()=>{

        
        const {'nexths-login-token':token} = parseCookies()
        if(token){
            recoverUserInformation().then(response=> {
                setUser(response.user)
            })
        }

    },[]);

    async function signIn({email, password}: SingInData){

        const {token,user } = await singInRequest({
            email,
            password,
        })


        setCookie(undefined,'nexths-login-token', token,{
            maxAge: 60*60*1,// 1H

        })   
        
        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        setUser(user);
        
        Router.push('/dashboard');
          
    }

    return (
        <AuthContext.Provider value={{user,isAuthenticated,signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

// function singInRequest(arg0: { email: any; password: SingInData; }): { token: any; user: any; } | PromiseLike<{ token: any; user: any; }> {
//     throw new Error("Function not implemented.");
// }

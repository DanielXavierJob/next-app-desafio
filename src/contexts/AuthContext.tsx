import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';
import { recoverUserInformation, signInRequest, forgetRequest,forgetCodeRequest,forgetPasswordRequest } from "../services/auth";
import { api } from "../services/api";

type User = {
  name: string;
  email: string;
  avatar_url: string;
}

type SignInData = {
  email: string;
  senha: string;
}
type ForgetData = {
  email: string;
}

type ForgetCodeData = {
  code: string;
}

type ForgetPasswordData = {
  code: string;
  password: string;
}
type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  forget: (data: ForgetData) => Promise<void>;
  SendCode: (data: ForgetCodeData) => Promise<Boolean>;
  SendPassword: (data: ForgetPasswordData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      recoverUserInformation().then(response => {
        if (response?.statusCode != 200) {
          toast.error(response?.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: 'toast_error',
            autoClose: 2000
          });
          router.push('/');
        } else if (response?.statusCode == 200) {
          setUser(response.user);
        }
      })
    }
  }, [])

  async function signIn({ email, senha }: SignInData) {
    const { statusCode, message, user } : any= await signInRequest({
      email,
      senha,
    })
    if (statusCode != 200) {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: 'toast_error',
        autoClose: 2000
      });
    } else if (statusCode == 200 && user) {

      setCookie(null, 'nextauth.token', message, {
        maxAge: 60 * 60 * 1, // 1 hour
        path: '/'
      });
      api.defaults.headers.common.Authorization  = `Bearer ${message}`;
      setUser(user);

      if(user.acesso == 1){
        router.push('/colaborador/dashboard');
      }else{
        router.push('/gestor/dashboard');
      }
    } else {
      console.log(statusCode, message);
    }


  }

  async function forget({ email }: ForgetData) {
    const { statusCode, sended }  : any = await forgetRequest({
      email
    })
    return sended;
  }
  async function SendCode(code: any) {
    const { statusCode, sended } : any = await forgetCodeRequest({
      code
    })
    return sended;
  }

  async function SendPassword({code, password}: ForgetPasswordData){
    const { statusCode, sended } : any = await forgetPasswordRequest({
      code,
      password
    });
    if(statusCode == 200){
      router.push('/');
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, forget, SendCode,SendPassword }}>
      {children}
    </AuthContext.Provider>
  )
}
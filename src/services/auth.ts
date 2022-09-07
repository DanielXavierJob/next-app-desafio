import Router from 'next/router'
import { destroyCookie } from 'nookies';
import { getAPIClient } from './axios';

type SignInRequestData = {
  email: string;
  senha: string;
}
type ForgetRequest = {
  email: string;
}
type forgetCodeRequest = {
  code: string;
}
type forgetPasswordRequest = {
  code: string;
  password: string;
}
export async function forgetPasswordRequest({code, password}: forgetPasswordRequest){
  let result = await fetch('http://192.168.0.16:3333/auth/forget/reset', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({code, password })
  }).then((response) => response.json())
    .then(data => {
      if (data && data.statusCode == 200) {
        return { statusCode: 200, sended: true };
      }
    }).catch(error => { console.log(error); return { statusCode: 500, sended: false }; });
  return result;
}
export async function forgetCodeRequest({code}: forgetCodeRequest){
  let result = await fetch('http://192.168.0.16:3333/auth/forget/step', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ code })
  }).then((response) => response.json())
    .then(data => {
      if (data && data.statusCode == 200) {
        return { statusCode: 200, sended: true };
      }
      return { statusCode: 404, sended: false };

    }).catch(error => { console.log(error); return { statusCode: 500, sended: false }; });
  return result;
}
export async function forgetRequest({ email }: ForgetRequest) {
  let result = await fetch('http://192.168.0.16:3333/auth/forget', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ email })
  }).then((response) => response.json())
    .then(data => {
      if (data && !data.statusCode) {
        return { statusCode: 200, sended: true };
      }
    }).catch(error => { console.log(error); return { statusCode: 500, sended: false }; });
  return result;
}
export async function signInRequest({ email, senha }: SignInRequestData) {
  let result = await fetch('http://192.168.0.16:3333/auth/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, senha })
  }).then((response) => response.json())
    .then(data => {
      if (data.statusCode == 401) {
        return { statusCode: 401, message: "Login não autorizado" };
      }
      if (data && !data.statusCode) {
        return { statusCode: 200, message: data.access_token, user: data.user };
      }
    }).catch(error => { console.log(error); return { statusCode: 500, message: "Ocorreu um erro desconhecido, contate o suporte" }; });
  return result;
}

export async function recoverUserInformation() {
  let result = await getAPIClient().get('http://192.168.0.16:3333/auth/me').then(response => {
    const data = response.data;
    if (data.statusCode == 401) {
      return { statusCode: 401, message: "Login não autorizado", user: null };
    }
    if (data && !data.statusCode) {
      return {
        statusCode: 200, message: "Login authorized", user: {
          name: data.nome,
          email: data.email,
          avatar_url: 'https://github.com/DanielXavierJob.png',
          acesso: data.acesso
        }
      };
    }
  }).catch(err => {
    throw err;
  });
  return result;
}
export function Logout() {
  destroyCookie(null, 'nextauth.token');
  Router.push('/');
}
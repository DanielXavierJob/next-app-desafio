import Router from 'next/router'
import { destroyCookie, parseCookies } from 'nookies';
import { Logout } from './auth';
import { getAPIClient } from './axios';

type Colaborador = {
  nome: string,
  email: string,
  senha: string
}
export async function CreateOrder(data: any) {
  let result = await getAPIClient().post('/tasks', {
    description: data.description,
    client: data.client,
    colaborador: data.colaborador
  }).then(response => {
    if (response.data.statusCode == 401) {
      Logout();
    } else {
      return { statusCode: 200, message: response.data };
    }
  }).catch(error => {
    if (error.message.includes("code 401")) {
      Logout();
    } else {
      return { statusCode: 500, message: "Ocorreu um erro desconhecido, contate o suporte" };
    }
  });
  return result;
}
export async function CreateColaborador(data: Colaborador) {
  let result = await getAPIClient().post('/users', {
    nome: data.nome,
    email: data.email,
    senha: data.senha,
    senha_reset: "",
    acesso: 1
  }).then(response => {
    if (response.data.statusCode == 401) {
      Logout();
    } else {
      return { statusCode: 200, message: response.data };
    }
  }).catch(error => {
    if (error.message.includes("code 401")) {
      Logout();
    } else {
      return { statusCode: 500, message: "Ocorreu um erro desconhecido, contate o suporte" };
    }
  });
  return result;
}
export async function CreateClient(nome: any) {
  let result = await getAPIClient().post('/clients', {
    nome: nome
  }).then(response => {
    if (response.data.statusCode == 401) {
      Logout();
    } else {
      return { statusCode: 200, message: response.data };
    }
  }).catch(error => {
    if (error.message.includes("code 401")) {
      Logout();
    } else {
      return { statusCode: 500, message: "Ocorreu um erro desconhecido, contate o suporte" };
    }
  });
  return result;
}

export async function FinalizeTask(data: any){
  let result = await getAPIClient().post('/tasks/finalize', {id: data.id, solution: data.solution, completed: true}).then(response => {
    if (response.data.statusCode == 401) {
      Logout();
    } else {
      return { statusCode: 200, message: response.data };
    }
  }).catch(error => {
    if (error.message.includes("code 401")) {
      Logout();
    } else {
      return { statusCode: 500, message: "Ocorreu um erro desconhecido, contate o suporte" };
    }
  });
  return result;
}
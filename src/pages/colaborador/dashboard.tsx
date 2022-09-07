import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../../services/axios'
import Sidebar from '../../components/Sidebar'
import { Grid, Container } from '@mui/material';
import OrderService from '../../components/Card/service'
import { Logout } from '../../services/auth'

export default function Dashboard({ tasks }: any) {
  const [taskList, setTasksList] = useState(tasks.tasks);

  return (
    <div>
      <Head>
        <title>Ordens de Serviço - Colaborador</title>
      </Head>
      <Sidebar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Minhas ordens de Serviços</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Container>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, md: 4, sm: 3 }}>
              {taskList ? taskList.map((item: any, id: any) => {
                return (<Grid item xs={12} md={3} sm={4} key={id}>
                  <OrderService item={item} key={id} />
                </Grid>);
              }) : ''}

            </Grid>
          </Container>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  const access = await apiClient.get('/auth/me').then(response => {
    if (response.data.acesso != 1) {
      return false;
    }
    return true;
  })
  if (!access) {
    return {
      redirect: {
        destination: '/gestor/dashboard',
        permanent: false,
      }
    }
  }
  let tasks = await apiClient.get('/tasks').then(response => {
    return response.data;
  }).catch(error => {
    if (error.message.includes("code 401")) {
      Logout();
    } else {
      console.log(error);
    }
  })

  return {
    props: {
      tasks
    }
  }
}
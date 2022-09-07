import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../../services/axios'
import { Grid, Container } from '@mui/material';
import { Logout } from '../../services/auth'
import { AuthContext } from '../../contexts/AuthContext'
import SidebarGestor from '../../components/SidebarGestor'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { Line } from 'react-chartjs-2';




export default function Dashboard({chart}: any) {
  const [charts, setCharts] = useState(chart.tasks);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Ordens de serviço por dia',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  });

  
  useEffect(() => {
    charts.map((item: any) => {
      if(data.labels.filter(x => x === new Date(item.day).toLocaleDateString()).length == 0){
        const datax : any = data;
        datax.labels.push(new Date(item.day).toLocaleDateString());
        datax.datasets[0].data.push(item.total)
        setData(datax);
      }
    
    });
    setLoading(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Dashboard - Gestor</title>
      </Head>
      <SidebarGestor />

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Container >
            {loading ? <Line
              options={{
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Total de O.S por Dia no mês',
                  },
                },
                elements: {
                  line:{
                    tension: 0.4
                  }
                }
              }}
              data={data}
              height={100}
            /> : ''}
           
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
    if (response.data.acesso != 2) {
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
  let chart = await apiClient.get('/tasks/chart').then(response => {
    return response.data;
  }).catch(error => {
    if(error.message.includes("code 401")){
      Logout();
    }else{
      console.log(error);
    }
  });

  return {
    props: {
      chart
    }
  }
}
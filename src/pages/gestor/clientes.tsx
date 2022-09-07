import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../../services/axios'
import { Grid, Container, Button } from '@mui/material';
import { Logout } from '../../services/auth'
import { AuthContext } from '../../contexts/AuthContext'
import SidebarGestor from '../../components/SidebarGestor'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import NewClient from '../../components/Dialog/NewClient'
import { Stack } from '@mui/system'


export default function Clientes({ clients }: any) {
  const { user } = useContext(AuthContext);
  const [client, setClients] = useState([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const apiClient = getAPIClient();
  useEffect(() => {
    if (clients && clients.clients) {
      setClients(clients.clients);
    }
  }, [clients]);

  async function AddNewClient(){
    let clients = await apiClient.get('/clients').then(response => {
      return response.data;
    });
    setClients(clients.clients);
  }
  return (
    <div>
      <Head>
        <title>Clientes - Gestor</title>
      </Head>
      <SidebarGestor />

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Container >
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
              style={{marginBottom: '1rem'}}
            >
              <NewClient Add={()=>{AddNewClient()}}/>
            </Stack>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={client}
                components={{
                  Toolbar: GridToolbar,
                }}
                columns={[
                  { field: 'id', headerName: 'ID', flex: 1 },
                  { field: 'nome', headerName: 'Cliente', flex: 1 },
                  {
                    field: 'created_at',
                    headerName: 'Data de Criação',
                    type: 'date',
                    flex: 1,
                    valueGetter: (params: any) => {
                      return `${new Date(params.row.created_at).toLocaleDateString()} ${new Date(params.row.created_at).toLocaleTimeString()} `
                    }
                  }
                ]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                pagination
              />
            </div>
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
        destination: '/colaborador/dashboard',
        permanent: false,
      }
    }
  }
  let clients = await apiClient.get('/clients').then(response => {
    return response.data;
  });

  return {
    props: {
      clients
    }
  }
}
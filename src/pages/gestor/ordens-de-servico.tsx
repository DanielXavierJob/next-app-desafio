import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../../services/axios'
import { Grid, Container, Button, Modal, Box, Typography } from '@mui/material';
import { Logout } from '../../services/auth'
import { AuthContext } from '../../contexts/AuthContext'
import SidebarGestor from '../../components/SidebarGestor'
import { DataGrid, GridEventListener, GridToolbar } from '@mui/x-data-grid';
import { Stack } from '@mui/system'
import NewOrder from '../../components/Dialog/NewOrder'
import OrderService from '../../components/Card/service'


export default function Task({ tasks }:any) {
  const [open, setOpen] = useState(false);
  const [taskOpened, setTaskOpened] = useState();
  const { user } = useContext(AuthContext);
  const [Task, setTasks] = useState([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const apiClient = getAPIClient();
  useEffect(() => {
    if (tasks && tasks.tasks) {
      setTasks(tasks.tasks);
    }
  }, [tasks]);

  const handleClose = () => {
    setOpen(false);
  }
  async function AddNewTask() {
    let tasks = await apiClient.get('/tasks/all').then(response => {
      return response.data;
    }).catch(error => {
      if (error.message.includes('code 401')) {
        Logout();
      }
    });
    setTasks(tasks.tasks);
  }
  const handleEvent: GridEventListener<'rowDoubleClick'> = (
    params,  // GridRowParams
    event,   // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    setTaskOpened(params.row);
    setOpen(true);
  }
  return (
    <div>
      <Head>
        <title>Ordens de serviço - Gestor</title>
      </Head>
      <SidebarGestor />

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Ordens de serviço</h1>
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
              style={{ marginBottom: '1rem' }}
            >
              <NewOrder Add={() => { AddNewTask() }} />
            </Stack>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={Task}
                components={{
                  Toolbar: GridToolbar,
                }}
                onRowDoubleClick={handleEvent}
                columns={[
                  { field: 'id', headerName: 'ID', flex: 1 },
                  {
                    field: 'client.nome', headerName: 'Cliente', flex: 2,
                    valueGetter: (params:any) => {
                      return `${params.row.client.nome} `
                    }
                  },
                  {
                    field: 'user.nome', headerName: 'Colaborador', flex: 1,
                    valueGetter: (params:any) => {
                      return `${params.row.user.nome} `
                    }
                  },
                  { field: 'description', headerName: 'Descrição', flex: 3 },
                  {
                    field: 'completed', headerName: 'Estado', flex: 1,
                    valueGetter: (params:any) => {
                      return `${params.row.completed ? 'Completo' : 'Aguardando'} `
                    }
                  },
                  {
                    field: 'created_at',
                    headerName: 'Data de Criação',
                    type: 'date',
                    flex: 1,
                    valueGetter: (params:any) => {
                      return `${new Date(params.row.created_at).toLocaleDateString()} ${new Date(params.row.created_at).toLocaleTimeString()} `
                    }
                  }
                ]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize:any) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                pagination
              />
            </div>
          </Container>
        </div>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          p: 4,
        }}>
          {taskOpened ? <OrderService item={taskOpened} closeButtons={(e:any) => {handleClose()}}/> : ''}

        </Box>
      </Modal>
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
  let tasks = await apiClient.get('/tasks/all').then(response => {
    return response.data;
  });

  return {
    props: {
      tasks
    }
  }
}
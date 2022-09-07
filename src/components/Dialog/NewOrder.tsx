import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CreateClient, CreateOrder } from '../../services/operations';
import SelectClient from './SelectClient';
import { Box, Grid } from '@mui/material';
import SelectColaborador from './SelectColaborador';


export default function NewOrder(props: any) {

  const [open, setOpen] = React.useState(false);
  const [operation, setOperation] = React.useState({
    disabled: false,
    display: "Adicionar"
  });

  const [data, setData] = React.useState({
    client: null,
    colaborador: null,
    description: ""
  });

  const setClient = (value: any) => {
    setData({...data, client: value});
  }
  const setColaborador = (value: any) => {
    setData({...data, colaborador: value});
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setData({
      client: null,
      colaborador: null,
      description: ""
    });
    setOperation({
      disabled: false,
      display: "Adicionar"
    });
    setOpen(false);
  };

  async function AddNewOrder(e: any) {
    e.preventDefault();
    setOperation({
      ...operation,
      disabled: true
    });
    let result: any = await CreateOrder(data);
    if (result.statusCode == 200) {
      props.Add();
      setOperation({
        ...operation,
        display: "Ordem de serviço adicionado!"
      });
      setTimeout(() => {
        handleClose();
      }, 3000);
    } else {
      setOperation({
        ...operation,
        display: "Ocorreu um erro, contate o suporte!"
      });
      setTimeout(() => {
        setOperation({
          ...operation,
          disabled: false,
          display: "Adicionar"
        });
      }, 3000);
    }

  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Adicionar Ordem de Serviço
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
        <DialogTitle>Nova Ordem de serviço</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adicione uma nova Ordem de Serviço, caso o cliente não exista, você poderá criar na aba de seleção de clientes.
          </DialogContentText>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              <SelectClient ChangeClient={(e: any) => {setClient(e)}}/>
            </Grid>
            <Grid item xs={6}>
              <SelectColaborador ChangeClient={(e: any) => {setColaborador(e)}} />
            </Grid>
            <Grid item xs={12} style={{marginTop: '1rem'}}>
              <TextField
                onChange={(e: any) => { setData({...data, description: e.target.value});}}
                id="outlined-multiline-flexible"
                label="Descrição do problema relatado pelo cliente"
                multiline
                fullWidth
                rows={4}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={operation.disabled} color="error" variant="outlined">Cancel</Button>
          <Button onClick={AddNewOrder} disabled={operation.disabled} color={"primary"} variant="outlined">{operation.display}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
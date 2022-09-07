import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { getAPIClient } from '../../services/axios';
import NewColaborador from './NewColaborador';
import { Logout } from '../../services/auth';

export default function SelectColaborador(props: any) {
  const [open, setOpen] = React.useState(false);
  const [clientID, setClientID] = React.useState<number | string>('');
  const [clients, setClients] = React.useState([]);
  const [openClient, setOpenClient] = React.useState(false);
  const [inputName, setInputName] = React.useState('');
  const [shrinks, setShrink] = React.useState(false);
  const { register, reset } = useForm();
  const handleChange = (event: SelectChangeEvent<typeof clientID>) => {
    if (event.target.value === "NewClient") {
      setOpenClient(true);
    } else {
      setOpenClient(false);
      setClientID(event.target.value || '');
    }
  };

  React.useEffect(() => {
    const client = clients.filter((client: any) => client.id == clientID).map((client_user: any) => client_user.nome);
    if (client.length > 0) {
      props.ChangeClient(clientID);
      setInputName(client[0]);
      setShrink(true);
    }
  }, [clientID]);
  const handleClickOpen = async () => {
    setOpenClient(false);
    setClientID('');
    setInputName("");
    setShrink(false);
    reset();
    let clients = await getAPIClient().get('/users/colaboradores').then(response => {
      return response.data;
    }).catch(error => {
      if(error.message.includes('code 401')){
        Logout();
      }
    });
    if(clients){
      setClients(clients.colaboradores);
      setOpen(true);
    }
 
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      setOpenClient(false);
      setClientID('');
      reset();
    }
  };

  const RefreshClients = async (id: any) => {
    let clients = await getAPIClient().get('/users/colaboradores').then(response => {
      return response.data;
    }).catch(error => {
      if(error.message.includes('code 401')){
        Logout();
      }
    });
    if(clients){
      setClients(clients.colaboradores);
      setClientID(id);
      setOpenClient(false);
    }
 
  }
  return (
    <>
      <NewColaborador open={openClient} Add={(id: any) => { RefreshClients(id) }} users={clients} />
      <TextField
        value={inputName}
        margin="dense"
        id="name"
        label={"Nome do Colaborador"}
        helperText={"Clique para selecionar"}
        InputLabelProps={{ shrink: shrinks }}
        type="text"
        fullWidth
        variant="standard"
        disabled
        onClick={handleClickOpen}
      />
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Selecione um colaborador</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Colaborador</InputLabel>
              <Select
                native
                value={clientID}
                onChange={handleChange}
                input={<OutlinedInput label="Cliente" id="demo-dialog-native" />}
              >
                <option aria-label='none' value="" />
                <option value="NewClient">Criar novo Colaborador</option>

                {clients.map((client: any, index) => {
                  return <option value={client.id} key={index}>{client.nome}</option>
                })}

              </Select>
            </FormControl>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
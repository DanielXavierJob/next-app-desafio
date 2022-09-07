import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CreateClient } from '../../services/operations';

export default function NewClient(props: any) {
  const [open, setOpen] = React.useState(props.open ? props.open : false);
  const [operation, setOperation] = React.useState({
    disabled: false,
    display: "Adicionar"
  });
  const [data, setData] = React.useState<String>("");
  React.useEffect(()=>{
    if(typeof props.open != undefined){
      setOpen(props.open);
    }
  },[props]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setData("");
    setOperation({
      disabled: false,
      display: "Adicionar"
    });
    setOpen(false);
  };

  async function AddNewClient(e: any){
    e.preventDefault();
    setOperation({
      ...operation,
      disabled: true
    });
    let result: any = await CreateClient(data);
    if(result.statusCode == 200){
      props.Add(result?.message.newClients.id);
      setOperation({
        ...operation,
        display: "Cliente adicionado!"
      });
      setTimeout(() => {
        handleClose();
      }, 3000);
    }else{
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
      {props.open == false || props.open == true ? '' :  <Button variant="outlined" onClick={handleClickOpen}>
        Adicionar Cliente
      </Button> }
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Novo cliente</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Adicione um novo cliente para as Ordens de serviço
          </DialogContentText>
          <TextField
            value={data}
            onChange={(e) => {setData(e.target.value)}}
            autoFocus
            margin="dense"
            id="name"
            label="Nome do Cliente"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={operation.disabled} color="error" variant="outlined">Cancel</Button>
          <Button onClick={AddNewClient} disabled={operation.disabled} color={"primary"} variant="outlined">{operation.display}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
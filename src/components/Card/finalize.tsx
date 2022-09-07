import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { FinalizeTask } from '../../services/operations';
import { useRouter } from 'next/router';

export default function Finalize(props: any) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [solution, setSolution] = React.useState("");
  const [operation, setOperation] = React.useState({
    disabled: false,
    display: "Finalizar",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOperation({
      disabled: false,
      display: "Finalizar",
    });
  };

  const handleFinalize = async () => {
    setOperation({
      ...operation,
      disabled: true
    });
    let result : any= await FinalizeTask({ id: props.order, solution: solution });

    if (result.statusCode == 200) {
     router.reload();
      // handleClose();
    } else {
      setOperation({
        ...operation,
        display: "Ocorreu um erro, contate o suporte!"
      });
      setTimeout(() => {
        setOperation({
          ...operation,
          disabled: false,
          display: "Finalizar"
        });
      }, 3000);
    }
  }
  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleClickOpen}>Finalizar</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Finalizar Ordem de serviço
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Descreva a solução da ordem de seviço
          </DialogContentText>
          <TextField
            id="outlined-multiline-static"
            onChange={(e) => setSolution(e.target.value)}
            label="Solução"
            multiline
            rows={4}
            fullWidth
            style={{ marginTop: '1rem' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" disabled={operation.disabled}>Cancelar</Button>
          <Button onClick={handleFinalize} autoFocus disabled={operation.disabled} color={"primary"}>
            {operation.display}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
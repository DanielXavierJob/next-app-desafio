import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CreateColaborador } from '../../services/operations';
import { useForm } from 'react-hook-form';
import { FamilyRestroomRounded } from '@mui/icons-material';

export default function NewColaborador(props: any) {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const [open, setOpen] = React.useState(props.open ? props.open : false);
  const [operation, setOperation] = React.useState({
    disabled: false,
    disabled_submit: false,
    color: "info",
    display: "Adicionar",
    error: false,
    display_email: "E-mail do Colaborador"
  });
  React.useEffect(()=>{
    if(props.open || !props.open){
      setOpen(props.open);
    }
  },[props]);
  React.useEffect(() => {
    if (watch("email") != "") {
      props.users.filter((user: any) => {
        let split = user.email.split('@');
        if (user.email.includes(watch("email"))) {
          setOperation({
            ...operation,
            disabled_submit: true,
            error: true,
            display_email: "Este e-mail já está em uso"
          });
        } else {
          if (operation.disabled_submit) {
            setOperation({
              ...operation,
              disabled_submit: false,
              error: false,
              display_email: "E-mail do Colaborador"
            });
          }
        }
      })
    }

  }, [watch("email")]);
  const handleClickOpen = () => {
    reset();
    setOperation({
      disabled: false,
      disabled_submit: false,
      color: "info",
      display: "Adicionar",
      error: false,
      display_email: "E-mail do Colaborador"
    });
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOperation({
      disabled: false,
      disabled_submit: false,
      color: "info",
      display: "Adicionar",
      error: false,
      display_email: "E-mail do Colaborador"
    });
    setOpen(false);
  };

  async function handleSignIn(data: any) {
    setOperation({
      ...operation,
      disabled: true,
      disabled_submit: true,
    });
    let result: any = await CreateColaborador(data);
    if (result.statusCode == 200) {
      props.Add(result?.message.newUser.id);
      setOperation({
        ...operation,
        color: "success",
        display: "Colaborador adicionado!"
      });
      setTimeout(() => {
        handleClose();
      }, 3000);
    } else {
      setOperation({
        ...operation,
        color: "error",
        display: "Ocorreu um erro, contate o suporte!"
      });
      setTimeout(() => {
        setOperation({
          ...operation,
          disabled: false,
          color: "info",
          display: "Adicionar"
        });
      }, 3000);
    }

  }

  return (
    <div>
       {props.open == false || props.open == true ? '' :  <Button variant="outlined" onClick={handleClickOpen}>
        Adicionar Colaborador
      </Button>}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Novo Colaborador</DialogTitle>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <DialogContent>
            <DialogContentText>
              Adicione um novo colaborador para as Ordens de serviço
            </DialogContentText>

            <TextField
              {...register('nome', { required: true, minLength: 5, maxLength: 100 })}
              error={errors.nome ? true : false}
              margin="dense"
              id="name"
              label="Nome do Colaborador"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              {...register('email', { required: true, minLength: 10 })}
              error={operation.error || errors.email ? true : false}
              margin="dense"
              id="email"
              label={operation.display_email}
              type="text"
              fullWidth
              variant="standard"
              helperText={errors.email?.type == "required" ? "É necessario colocar um e-mail" : errors.email?.type == "minLength" ? "O tamanho precisa ser maior que 10." : ""}
            />
            <TextField
              {...register('senha', { required: true, minLength: 5, maxLength: 30 })}
              error={errors.senha ? true : false}
              margin="dense"
              id="senha"
              label="Senha do Colaborador"
              type="text"
              fullWidth
              variant="standard"
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={operation.disabled} color="error" variant="outlined">Cancel</Button>
            <Button type="submit" disabled={operation.disabled_submit || errors.nome ? true : false || errors.senha ? true : false} color={"primary"} variant="outlined">{operation.display}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
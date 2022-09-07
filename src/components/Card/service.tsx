import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import Finalize from './finalize';


export default function OrderService(props: any) {
  const [item, setItem] = React.useState(props.item);
  return (
    <Box sx={{ minWidth: '100%' }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Ordem de serviço
            </Typography>
            <Typography variant="h6" component="div">
              {item.client.nome}
            </Typography>
            <Typography variant="body2">
              {item.description}
            </Typography>
            <br />
            {props.closeButton ? <>
              <Typography variant="body2">
                <b>Solução: </b> {item.solution}
              </Typography>
              <br />
            </> : ''}
            <Typography variant="body2">
              <b>Data de abertura</b>: {new Date(item.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              <b>Horário de abertura</b>: {new Date(item.created_at).toLocaleTimeString()}
            </Typography>

            {props.closeButton ? <>
              <br />
              <Typography variant="body2">
                <b>Data de fechamento</b>: {new Date(item.updated_at).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                <b>Horário de fechamento</b>: {new Date(item.updated_at).toLocaleTimeString()}
              </Typography>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
              >
                <Button onClick={props.closeButton}>Fechar</Button>
              </Stack></>
              : props.closeButtons ? <> <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
              >
                <Button onClick={props.closeButtons}>Fechar</Button>
              </Stack></> : <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
                style={{
                  marginTop: '1rem'
                }}
              >
                <Finalize order={item.id} />

              </Stack>
            }
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
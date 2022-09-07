import Head from 'next/head'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import Router from 'next/router';
import Image from 'next/image';
const steps = ['Nos diga seu e-mail', 'Insira o código', 'Mude sua senha'];

export default function Home() {

  const { register, handleSubmit, resetField  } = useForm();
  const { forget, SendCode, SendPassword } = useContext(AuthContext)
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };


  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  async function handleRecover(data : any) {
    resetField('code');
    forget(data).then((response  : any) => {
      if (response) {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      }
    });

  }
  async function SendRecover(data : any) {
    SendCode(data.code).then((response : any) => {
      if (response) {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      }
    });

  }
  async function ConfirmNewPassword(data : any) {
    if (data.password != data.passwordConfirm) {
      toast.error("As senhas não são identicas.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: 'toast_error_password',
        autoClose: 2000
      });
    } else if (data.password.length < 6) {
      toast.error("A senha precisa conter mais que 6 caracteres", {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: 'toast_error_password_length',
        autoClose: 2000
      });
    } else {
      await SendPassword(data);

    }

  }

  const ReturnLogin = (e : any) => {
    e.preventDefault();
    Router.push('/');
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Home</title>
      </Head>

      <div className="max-w-sm w-full space-y-8">
        <div>
        <img
            className="mx-auto h-12 w-auto"
            src="https://i.imgur.com/aJyq864.png"
            style={{
              width: '100%',
              height: '11rem'
            }}
            width={'100%'}
            height={'11rem'}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Recuperar acesso</h2>
        </div>
        <Box sx={{ width: '100%' }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep == 0 ? <>
                  <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleRecover)}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Email address
                        </label>
                        <input
                          {...register('email')}
                          id="email-address"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Email address"
                        />
                      </div>

                    </div>

                    <div>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        Enviar Email
                      </button>
                    </div>
                  </form>
                </> : activeStep == 1 ? <>
                  <form className="mt-8 space-y-6" onSubmit={handleSubmit(SendRecover)}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Authorization
                        </label>
                        <input
                          {...register('code')}
                          defaultValue={""}
                          id="code-address"
                          name="code"
                          type="text"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Authorization"
                        />
                      </div>

                    </div>

                    <div>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        Continuar
                      </button>
                    </div>
                  </form>
                </> : activeStep == 2 ? <>
                  <form className="mt-8 space-y-6" onSubmit={handleSubmit(ConfirmNewPassword)}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Nova senha
                        </label>
                        <input
                          {...register('password')}
                          id="password"
                          defaultValue={""}
                          name="password"
                          type="password"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Nova senha"
                        />
                      </div>
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Confirme a nova senha
                        </label>
                        <input
                          {...register('passwordConfirm')}
                          id="password-confirm"
                          defaultValue={""}
                          name="passwordConfirm"
                          type="password"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Confirme a nova senha"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        Mudar senha
                      </button>
                    </div>
                  </form>
                </> : ''}

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={ReturnLogin}>
                      {'Voltar para Login'}
                    </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  {activeStep == 0 ? <>
                    <Button onClick={handleComplete}>
                      {'Já possuo um código de recuperação'}
                    </Button></> : ''}
                
                </Box>
              </React.Fragment>
            )}
          </div>
        </Box>

      </div >
    </div >
  )
}
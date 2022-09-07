import Head from 'next/head'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {

  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext)

  async function handleSignIn(data: any) {
    await signIn(data)
  }
  const ForgetPassword = (e: any) => {
    e.preventDefault();
    Router.push('/forget');
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style={{backgroundImage: "url('https://i.imgur.com/XeOEJvg.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
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
          <h2 className="mt-6 text-center text-3xl font-extrabold " style={{color: 'white', textShadow: '1px 1px black'}}>Painel de gestão</h2>
          <h5 className="mt-3 text-center text-2xl font-extrabold "  style={{color: 'white', textShadow: '1px 1px black'}}>Faça login em sua conta</h5>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
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
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register('senha')}
                id="password"
                name="senha"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forget" onClick={ForgetPassword} className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
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
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
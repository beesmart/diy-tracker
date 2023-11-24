import { LockClosedIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../axios';
import { useStateContext } from '../../contexts/ContextProvider';


export default function Signup() {

  const { setCurrentUser, setUserToken } = useStateContext();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState({__html: ''});

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({__html: ''});

    axiosInstance.post('/signup', {
        name: fullName,
        email: email,
        password: password,
        password_confirmation: passwordConfirm
    })
    .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
    })
    .catch(( error ) => {
      if(error.response){
        const formErrors = Object.values(error.response.data.errors).reduce((accum, next) => 
          [...accum, ...next], [])
     
          setError({__html: formErrors.join(`<br />`)})
      }
      console.error(error)
    })
  }

  return (
   
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign up for an account
      </h2>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already a member?{' '}
        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Login here
        </Link>
      </p>

      {error.__html && <div className="bg-red-500 rounded text-center text-sm text-white py-2 px-3" dangerouslySetInnerHTML={error}></div>}


      <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">

      <div>
          <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
            Full name
          </label>
          <div className="mt-2">
            <input
              id="full-name"
              name="name"
              type="text"
              value={fullName}
              onChange={ev => setFullName(ev.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
       
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password-confirm" className="block text-sm font-medium leading-6 text-gray-900">
              Password Confirmation
            </label>
     
          </div>
          <div className="mt-2">
            <input
              id="password-confirm"
              name="password_confirm"
              type="password"
              value={passwordConfirm}
              onChange={ev => setPasswordConfirm(ev.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      
        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-indigo-500" aria-hidden="true" />

            </span>
            Sign Up
          </button>
        </div>
      </form>

    </div>

  )
}

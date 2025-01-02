// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Login = ({ setToken }) => {
//   const [currentState, setCurrentState] = useState('Login');
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const navigate = useNavigate();

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       if (currentState === 'Sign Up') {
//         const response = await axios.post(`${backendUrl}/api/user/register`, {
//           name,
//           email,
//           password,
//         });
//         if (response.data.success) {
//           setToken(response.data.token);
//           localStorage.setItem('token', response.data.token);
//           toast.success('Account Created!');
//           navigate('/');
//         } else {
//           toast.error(response.data.message);
//         }
//       } else {
//         const response = await axios.post(`${backendUrl}/api/user/login`, {
//           email,
//           password,
//         });
//         if (response.data.success) {
//           setToken(response.data.token);
//           localStorage.setItem('token', response.data.token);
//           toast.success('Login successful!');
//           navigate('/'); // Navigate immediately after setting token
//         } else {
//           toast.error(response.data.message);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-white"
//     >
//       <div className="inline-flex items-center gap-2 mb-2 mt-10">
//         <p className="prata-regular text-3xl">{currentState}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>
//       {currentState === 'Login' ? null : (
//         <input
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//           type="text"
//           className="w-full px-3 py-2 border border-gray-800 text-black"
//           placeholder="Name"
//           required
//         />
//       )}
//       <input
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800 text-black"
//         placeholder="Email"
//         required
//       />
//       <input
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800 text-black"
//         placeholder="Password"
//         required
//       />
//       <div className="w-full flex justify-between text-sm mt-[-8px]">
//         <p className="cursor-pointer">Forgot your password?</p>
//         {currentState === 'Login' ? (
//           <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
//             Create account
//           </p>
//         ) : (
//           <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
//             Login Here
//           </p>
//         )}
//       </div>
//       <button className="bg-white text-black font-light px-8 py-2 mt-4">
//         {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
//       </button>
//     </form>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoIosArrowRoundForward } from 'react-icons/io';


const Login = ({ setToken }) => {
  const [currentState, setCurrentState] = useState('Login');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Account Created!');
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful!');
          navigate('/'); // Navigate immediately after setting token
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex  items-center justify-center w-full text-white relative z-10"
    >
      {/* <p className=" absolute top-[13.8rem] -z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-gray-400 font-bold tracking-widest">
      TraceVision</p> */}
      <div className='w-[350px] h-[400px] px-8 py-6 bg-gray-900 shadow-md rounded-lg'>
        <div className='h-full flex flex-col justify-evenly gap-3 w-full'>
      <div className="">
        <p className="text-3xl flex justify-center items-center text-gray-400 uppercase">{currentState}</p>
        {/* <hr className="border-none h-[1.5px] w-8 bg-white" /> */}
      </div>
      <div className='flex flex-col gap-2'>
      {currentState === 'Login' ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-3  bg-gray-800 border-none text-white rounded-md"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-3  bg-gray-800 border-none text-white rounded-md"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-3  bg-gray-800 border-none text-white rounded-md"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between mt-2">
        {currentState === 'Login' ? (
          <>
          <p className="cursor-pointer text-sm">Forgot your password?</p>
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer text-sm">
            Create account
          </p>
          </>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer flex w-full justify-end items-center">
            <IoIosArrowRoundForward className="text-xl" /> Login Here
          </p>
        )}
        </div>
      </div>
      <button className="bg-[#24a0ed] hover:bg-[#24a0ed]/90 text-white font-light px-8 py-3 mt-4 rounded-md flex items-center justify-center gap-1 hover:gap-2 transition-all duration-300 ease-in-out">
      {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      <IoIosArrowRoundForward className="text-xl" />
      </button>
      </div>
      </div>
    </form>
  );
};

export default Login;




import { motion } from 'framer-motion';
import { useState } from 'react';
import Input from '../components/Input';
import { Eye, EyeOff ,Loader} from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import SummaryUrl from '../Common/url';

import {
  User,
  Mail,
  Lock,
} from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ 
    name: '',
    email: '',
    userName: '',
    password: '',
    confirmpassword: '',
   
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const {name,value} = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Form submitted:', formData);
    if(formData.password === formData.confirmpassword){
      const {confirmpassword, ...data} = formData;  // Exclude confirmpassword from the data object
        try {
            const dataFetchResponse = await fetch(SummaryUrl.SignUp.url,{
                method:SummaryUrl.SignUp.method,
                headers:{
                    "content-type": "application/json",
                },
                credentials: "include",
                body:JSON.stringify(data),
            });
            const dataResponse = await dataFetchResponse.json();
            console.log(dataResponse);
            if(dataResponse.success){
              console.log("Signup successfull");
              setIsLoading(false);
              toast.success(dataResponse.message,{
                theme: "dark",
              })
              navigate('/email-verify')
            }else{
              console.log("Signup failed");
              setIsLoading(false);
              toast.error(dataResponse.message,{
                theme: "dark",
              })
            }
        } catch (error) {
            console.error("Error in signup page", error);
        }
    }else{
      console.log("Password does not match");
      toast.error("Password does not match",{
        theme: "dark",
      })
      setIsLoading(false);
    }
    };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleShowConfirmPassword = () =>{
    setShowConfirmPassword(!showconfirmPassword);
  }
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-white text-transparent bg-clip-text'>
          Welcome to<span className='text-[#00838F]'> PeerBridge</span>
        </h2>
        
         <form onSubmit={handleOnSubmit} className='space-y-4'>

          <Input
            icon={User}
            type='text'
            placeholder='Full Name'
            name='name'
            value={formData.name}
            onChange={handleOnChange}
          />
          <Input
            icon={Mail}
            type='email'
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleOnChange}
          />
          <Input
            icon={User}
            type='text'
            placeholder='Username'
            name='userName'
            value={formData.userName}
            onChange={handleOnChange}
          />
          <div className='relative'>
          <Input
            icon={Lock}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleOnChange}
            />
                <div
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400'
                    onClick={handleShowPassword}
                >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
            </div>

          <div className='relative'>
          <Input
            icon={Lock}
            type={showconfirmPassword ? 'text' : 'password'}
            placeholder='ConfirmPassword'
            name='confirmpassword'
            value={formData.confirmpassword}
            onChange={handleOnChange}
            />
                <div
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400'
                    onClick={handleShowConfirmPassword}
                >
                {showconfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
            </div>

          

          <button
            type='submit'
            className='w-full text-white py-2 rounded hover:opacity-90 transition bg-[#00838F] hover:bg-[#004d5b]'
            disabled={isLoading}
            >
            {isLoading ? (
              <Loader className='animate-spin mx-auto' size={20} /> ):(
                'Sign Up'
              )}
        </button>
        <div className="mt-2 flex items-center justify-between">
            <p className="text-white">
              Already have an account?{' '}
              <Link
                to="/Login"
                className="text-[#00838F] hover:text-[#004d5b] transition"
              >
                Login
              </Link>
            </p>
          </div>
        </form>

        
      </div>
    </motion.div>
  </div>
);

};

export default Signup;







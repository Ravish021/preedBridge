import { motion } from 'framer-motion';
import { useState,useContext } from 'react';
import Input from '../components/Input';
import { Mail, Lock, Eye, EyeOff,Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SummaryUrl from '../Common/url';
import{ toast } from 'react-toastify';
import Context from '../Contex/Contex';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currUserDetails } = useContext(Context);
  
  // const isLoading = false;
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(SummaryUrl.Login.url, {
        method: SummaryUrl.Login.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Login data: ",data);

      if(data.success){
       setIsLoading(false);
        console.log("Login successful");    ///////////////
        navigate('/home');
        await currUserDetails();   
        toast.success(data.message,{
          theme: "dark",
        });
        
      }else{
        setIsLoading(false);
        toast.success(data.message,{
          theme: "dark",
        });
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message)
    }
    
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-white text-transparent bg-clip-text">
          Login to <span className='text-[#00838F]'>PeerBridge</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="relative">
            <Input
              reqired="true"
              icon={Lock}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <div
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>


          <button
            type='submit'

            className='w-full text-white py-2 rounded hover:opacity-90 transition bg-[#00838F] hover:bg-[#004d5b]'
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin  mx-auto" size={20} />
            ) : (
              'Login'
            )}
          </button>
          <div className="mt-2 flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-[#00838F] hover:text-[#004d5b] transition"
            >
              Forgot Password?
            </Link>
            <p className="text-white">
              Don't have an account?{' '}
              <Link
                to="/Signup"
                className="text-[#00838F] hover:text-[#004d5b] transition"
              >
                Sign up
              </Link>
            </p>

            
          </div>
          
        </form>

       
      </motion.div>
    </div>
  );
};

export default Login;

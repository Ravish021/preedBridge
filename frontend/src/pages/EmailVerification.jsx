import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import SummaryUrl from '../Common/url';

const CodeVerification = () => {
  const navigate = useNavigate();
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputsRef = useRef([]);   // it store the reference of the input fields

  const handleOnChange = (e, index) => { 
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return; // allow only single digit

    const newCode = [...codeDigits];
    newCode[index] = value;
    setCodeDigits(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => { //it will paste the code in the input field
    e.preventDefault();
    console.log(e);
    const pasteData = e.clipboardData.getData('text').trim();

    if (!/^\d{6}$/.test(pasteData)) {
      setError('Please paste a 6-digit numeric code.');
      return;
    }

    const pasteDigits = pasteData.split('');
    setCodeDigits(pasteDigits);
    inputsRef.current[5].focus();    
    setError('');
  };

  const handleSubmit = async (e) => {
    if(e){
        e.preventDefault();
    }
    const code = codeDigits.join('');
    console.log("Verification code : ",code)        // notification //
    if (code.length < 6 || codeDigits.includes('')) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    try {
      const dataResponse = await fetch(SummaryUrl.EmailVerify.url, {
        method: SummaryUrl.EmailVerify.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await dataResponse.json();

      if (dataResponse.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Invalid verification code.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  //auto submit the code when all the input is filled;
  useEffect(()=>{
   if(codeDigits.every(digit => digit !== '')){
    try {
         handleSubmit();
         console.log("auto submit");
    } catch (error) {
         console.error('Auto-submit error:', err);
    }
   
   }
  },[codeDigits]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl p-8 max-w-md w-full text-center">
        <ShieldCheck className="mx-auto text-yellow-600" size={64} />
        <h2 className="text-2xl font-bold mt-4 mb-2 text-white">Enter Verification Code</h2>
        <p className="text-gray-300 mb-6">
          We’ve sent a verification code to your email. Please enter it below.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div
            className="flex justify-center gap-3 mb-6"
            onPaste={handlePaste}
          >
            {codeDigits.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                value={digit}
                onChange={(e) => handleOnChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                maxLength="1"
                ref={(el) => (inputsRef.current[idx] = el)} 
                className="w-12 h-12 text-center text-xl text-white bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="bg-[#00838F] hover:bg-[#004d5b] text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default CodeVerification;

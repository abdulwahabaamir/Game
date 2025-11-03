import { useState, useRef, useEffect } from "react";

import { hero, controller, yellowStar, backIcon } from "../assets";
export default function Login() {
  const [mobile, setMobile] = useState("");
  const [otpScreen, setOtpScreen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const otpRefs = useRef([]);

  // Timer countdown for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 11) {
      setMobile(value);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return; // only numbers allowed

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      
      if (!e.target.value && index > 0) {
        otpRefs.current[index - 1].focus();
      }
      
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    const digits = pastedData.replace(/\D/g, "").split("");
    
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 4) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);
    
    // Focus last filled input or next empty
    const focusIndex = Math.min(digits.length, 3);
    otpRefs.current[focusIndex]?.focus();
  };

  const handleSendOtp = () => {
    if (mobile.length >= 10 && agreedToTerms) {
      // Here you would call your OTP API
      console.log("Sending OTP to:", mobile);
      setOtpScreen(true);
      setTimer(60); // 60 seconds countdown
      // Clear OTP inputs
      setOtp(["", "", "", ""]);
      // Focus first OTP input
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      console.log("Resending OTP to:", mobile);
      setTimer(60);
      setOtp(["", "", "", ""]);
    }
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      console.log("Verifying OTP:", otpValue, "for mobile:", mobile);
      // Here you would call your verification API
    }
  };

  const handleBack = () => {
    if (otpScreen) {
      setOtpScreen(false);
      setOtp(["", "", "", ""]);
    }
  };

  const isValidMobile = mobile.length >= 10;
  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Header Section with curved bottom */}
      <div 
        className="bg-gradient-to-r from-[#0078C2] to-[#0039C5] w-full p-4 sm:p-6 mb-8 relative" 
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)' }}
      >
        {/* Back Button */}
        <div className="mt-4 sm:mt-6 w-full flex justify-start px-2">
          <button 
            onClick={handleBack}
            className="bg-[#2EB1FA] w-7 h-7 sm:w-8 sm:h-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#1a9ee0] transition-colors"
          >
            <img src={backIcon} alt="back" className="w-2 h-4" />
          </button>
        </div>

        {/* Character and Stars */}
        <div className="mt-4 sm:mt-6 flex items-center justify-around px-2 pb-8 sm:pb-12">
          {/* Stars + Top Rated */}
          <div className="flex flex-col items-center mt-3">
            <div className="flex justify-center items-start gap-1 sm:gap-2">
              <img src={yellowStar} alt="star" className="w-6 h-6 sm:w-8 sm:h-8" />
              <img src={yellowStar} alt="star" className="w-6 h-6 sm:w-8 sm:h-8 -mt-4 sm:-mt-6" />
              <img src={yellowStar} alt="star" className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <p className="text-xs sm:text-sm font-bold mt-1">TOP RATED</p>
          </div>

          <div>
            <img 
              src={hero} 
              alt="hero character" 
              className="w-24 h-44 sm:w-32 sm:h-56 md:w-36 md:h-64 object-contain" 
            />
          </div>
        </div>
      </div>

      {/* Game Controller Icon */}
      <div className="mb-2">
        <img src={controller} alt="controller" className="w-10 h-7 sm:w-12 sm:h-9" />
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">GAMEZONE</h1>

      {/* Main Content Area */}
      <div className="w-full max-w-md px-6 flex flex-col items-center">
        {!otpScreen ? (
          <>
            {/* Phone Number Input Screen */}
            <label className="mt-4 sm:mt-6 text-xs sm:text-sm font-semibold">
              ENTER YOUR NUMBER
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={handleMobileChange}
              className="mt-2 w-full max-w-xs bg-white text-black rounded-lg p-2 sm:p-3 outline-none text-center text-base sm:text-lg font-medium"
              placeholder="03XXXXXXXXX"
            />

            <button
              onClick={handleSendOtp}
              disabled={!isValidMobile || !agreedToTerms}
              className={`mt-6 w-full max-w-xs py-2 sm:py-3 rounded-lg font-bold border-2 border-white text-sm sm:text-base transition-all ${
                isValidMobile && agreedToTerms
                  ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  : "bg-gray-600 cursor-not-allowed opacity-50"
              }`}
            >
              SEND OTP
            </button>
          </>
        ) : (
          <>
            {/* OTP Input Screen */}
            <label className="mt-4 sm:mt-6 text-xs sm:text-sm font-semibold">
              ENTER OTP
            </label>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Sent to {mobile}
            </p>
            
            <div className="flex gap-2 sm:gap-3 mt-4" onPaste={handlePaste}>
              {[...Array(4)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={otp[i]}
                  ref={(el) => (otpRefs.current[i] = el)}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleBackspace(e, i)}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white text-black text-center text-xl sm:text-2xl font-semibold shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ))}
            </div>

            {/* Resend OTP */}
            <div className="mt-4 text-xs sm:text-sm">
              {timer > 0 ? (
                <p className="text-gray-400">
                  Resend OTP in <span className="font-bold text-white">{timer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  className="text-blue-400 hover:text-blue-300 underline font-semibold"
                >
                  RESEND OTP
                </button>
              )}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={!isOtpComplete}
              className={`mt-6 w-full max-w-xs py-2 sm:py-3 rounded-lg font-bold border-2 border-white text-sm sm:text-base transition-all ${
                isOtpComplete
                  ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  : "bg-gray-600 cursor-not-allowed opacity-50"
              }`}
            >
              VERIFY OTP
            </button>
          </>
        )}

        {/* Terms & Privacy */}
        <p className="mt-6 sm:mt-8 text-[9px] sm:text-[10px] text-center max-w-xs opacity-80 leading-relaxed">
          YOUR CONTACT DETAILS ARE USED FOR VERIFICATION AND UPDATES AS PER OUR
          <span className="font-bold"> PRIVACY POLICY</span>.
        </p>

        <div className="mt-4 flex items-center gap-2 text-[10px] sm:text-[11px]">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="accent-blue-500 w-4 h-4 cursor-pointer "
          />
          <label className="cursor-pointer" onClick={() => setAgreedToTerms(!agreedToTerms)}>
            I AGREE TO THE TERMS AND CONDITIONS
          </label>
        </div>

        <a href="#" className="mt-2 mb-8 text-blue-400 text-[10px] sm:text-xs underline hover:text-blue-300">
          PRIVACY POLICY
        </a>
      </div>
    </div>
  );
}
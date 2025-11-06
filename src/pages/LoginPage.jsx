import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hero, controller, YellowStar, backIcon } from "../assets";
import LoadingSpinner from '../components/LoadingSpinner';
import { createAuthToken, validateToken } from '../utils/auth';

const STATIC_OTP = "4353";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [otpScreen, setOtpScreen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const otpRefs = useRef([]);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
  const data = validateToken();
  if (data) {
    navigate("/home", { replace: true });
  }
  // ✅ Do NOT put validateToken in dependency array
}, [navigate]);


  // Validate Pakistani mobile number format (03XXXXXXXXX)
  const isValidMobile = /^03[0-9]{9}$/.test(mobile);

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      setMobile(value);
      setError(""); // Clear error on input change
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = () => {
    if (!isValidMobile || !agreedToTerms) return;

    setLoading(true);
    setError("");

    // Simulate OTP sending delay
    setTimeout(() => {
      console.log("📱 Sending OTP to:", mobile);
      console.log("🔑 Static OTP:", STATIC_OTP);
      setOtpScreen(true);
      setLoading(false);
      setOtp(["", "", "", ""]);
      
      // Auto-focus first OTP input
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join("");
    
    if (!otpValue || otpValue.length !== 4) {
      setError("Please enter complete OTP");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate verification delay
    setTimeout(() => {
      if (otpValue === STATIC_OTP) {
        // Create and store encrypted auth token
        const success = createAuthToken(mobile);
        
        if (success) {
          console.log("✅ Login successful!");
          console.log("⏱️ Session will expire in 10 minutes");
          navigate("/home");
        } else {
          setError("Failed to create session. Please try again.");
          setLoading(false);
        }
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp(["", "", "", ""]);
        otpRefs.current[0]?.focus();
        setLoading(false);
      }
    }, 1000);
  };

  const handleBack = () => {
    if (otpScreen) {
      setOtpScreen(false);
      setOtp(["", "", "", ""]);
      setError("");
    } else {
      navigate('/');
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Header Section with curved bottom */}
      <div
        className="bg-gradient-to-r from-[#00395C] to-[#0078C2] w-full px-4 mb-8 relative"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)" }}
      >
        {/* Back Button */}
        <div className="mt-4 sm:mt-6 w-full flex justify-start px-2">
          <button
            onClick={handleBack}
            className="bg-[#2EB1FA] w-7 h-7 sm:w-8 sm:h-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#1a9ee0] border-2 border-white transition-colors"
            aria-label="Go back"
          >
            <img src={backIcon} alt="" className="w-2 h-4" />
          </button>
        </div>

        {/* Character and Stars */}
        <div className="mt-4 sm:mt-0 flex items-center justify-around px-2 pb-8 sm:pb-0">
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-start gap-1 sm:gap-2">
              <img src={YellowStar} alt="" className="w-8 h-8 sm:w-14 sm:h-14" />
              <img src={YellowStar} alt="" className="-mt-6 w-8 h-8 sm:w-14 sm:h-14" />
              <img src={YellowStar} alt="" className="w-8 h-8 sm:w-14 sm:h-14" />
            </div>
            <p className="text-xs sm:text-lg font-bold">TOP RATED</p>
          </div>

          <div>
            <img
              src={hero}
              alt="Hero character"
              className="w-24 h-44 sm:w-32 sm:h-56 md:w-36 md:h-70 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Game Controller Icon */}
      <div className="mb-2">
        <img
          src={controller}
          alt="Game controller"
          className="w-10 h-7 sm:w-12 sm:h-9"
        />
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">
        GAMEZONE
      </h1>

      {/* Main Content Area */}
      <div className="w-full max-w-md px-6 flex flex-col items-center">
        {!otpScreen ? (
          <>
            {/* Phone Number Input Screen */}
            <label className="mt-4 sm:mt-6 text-sm sm:text-lg font-normal">
              ENTER YOUR NUMBER
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={handleMobileChange}
              className={`mt-2 w-full max-w-xs bg-white text-black rounded-lg p-2 sm:p-3 outline-none text-center text-base sm:text-lg font-normal transition-all ${
                mobile && !isValidMobile ? "ring-2 ring-red-500" : ""
              }`}
              placeholder="03XXXXXXXXX"
              disabled={loading}
            />

            {mobile && !isValidMobile && (
              <p className="text-red-400 text-xs mt-1">
                Please enter a valid mobile number (03XXXXXXXXX)
              </p>
            )}

            <button
              onClick={handleSendOtp}
              disabled={!isValidMobile || !agreedToTerms || loading}
              className={`mt-6 w-full max-w-xs py-2 sm:py-3 rounded-lg font-bold border-2 border-white text-sm sm:text-base transition-all ${
                isValidMobile && agreedToTerms && !loading
                  ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  : "bg-gray-600 cursor-not-allowed opacity-50"
              }`}
            >
              {loading ? (
                <LoadingSpinner size="sm" color="white" showText={true} text="SENDING..." />
              ) : (
                "SEND OTP"
              )}
            </button>
          </>
        ) : (
          <>
            {/* OTP Input Screen */}
            <label className="mt-4 sm:mt-6 text-md sm:text-xl font-semibold">
              ENTER OTP
            </label>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              An OTP has been sent to {mobile}
            </p>

            <div className="flex gap-2 sm:gap-3 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={otp[i]}
                  ref={(el) => (otpRefs.current[i] = el)}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  disabled={loading}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white text-black text-center text-xl sm:text-2xl font-semibold shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  aria-label={`OTP digit ${i + 1}`}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-400 text-xs sm:text-sm mt-3 text-center">
                {error}
              </p>
            )}

            <button
              onClick={handleVerifyOtp}
              disabled={!isOtpComplete || loading}
              className={`mt-6 px-16 sm:px-20 py-2 sm:py-3 rounded-lg font-bold border-2 border-white text-sm sm:text-base transition-all ${
                isOtpComplete && !loading
                  ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  : "bg-gray-600 cursor-not-allowed opacity-50"
              }`}
            >
              {loading ? (
                <LoadingSpinner size="sm" color="white" showText={true} text="VERIFYING..." />
              ) : (
                "VERIFY OTP"
              )}
            </button>
          </>
        )}

        {/* Terms & Privacy */}
        <p className="mt-6 sm:mt-8 text-sm sm:text-lg text-center font-semibold">
          YOUR CONTACT DETAILS ARE USED FOR VERIFICATION AND UPDATES AS PER OUR [PRIVACY POLICY].
        </p>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="terms-checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            disabled={loading}
            className="accent-blue-500 w-4 h-4 cursor-pointer"
          />
          <label
            htmlFor="terms-checkbox"
            className="cursor-pointer text-sm sm:text-lg"
          >
            I AGREE TO THE TERMS AND CONDITIONS
          </label>
        </div>

        <a
          href="#"
          className="mt-4 mb-8 text-blue-400 text-sm sm:text-lg font-bold hover:text-blue-300 transition-colors"
        >
          PRIVACY POLICY
        </a>
      </div>
    </div>
  );
}
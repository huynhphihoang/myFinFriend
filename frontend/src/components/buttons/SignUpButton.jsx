export default function SignUpButton({isSignUp, setIsSignUp}) {
  return (
    <button type="button" onClick={() => setIsSignUp(true)} className={`flex flex-1 justify-center px-4 py-1 rounded-full 
    ${isSignUp == true && "bg-gradient-to-br from-blue-600 to-blue-500 text-white"}  
    text-black shadow-3xl duration-500 transition`}>
      Sign Up
    </button>
  );
}
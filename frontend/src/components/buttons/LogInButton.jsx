
export default function LogInButton({isSignUp, setIsSignUp}) {
    return(
        <button type="button" onClick={() => setIsSignUp(false)} className={`flex flex-1 justify-center px-4 py-1 rounded-full 
        ${isSignUp == false && "bg-gradient-to-br from-blue-500 to-blue-600 text-white"} 
        text-black  shadow-3xl duration-500 transition-full`}> 
            Log In
        </button>
    );
}

export default function SubmitButton({loading}){
    return(
        <button type="submit" className={`rounded-full bg-cyan-400 px-6 py-2 hover:bg-cyan-600 text-white transation duration-500 shadow-lg ${loading && ("cursor-progress")}`}>
           {loading ? ("Submit....") : ("Submit")} 
        </button>
    );
}
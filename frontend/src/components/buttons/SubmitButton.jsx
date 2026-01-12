
export default function SubmitButton({loading}){
    return(
        <button type="submit" className={`rounded-full border border-black px-6 py-2 hover:bg-black hover:text-white transation duration-500 ${loading && ("cursor-progress")}`}>
           {loading ? ("Submit....") : ("Submit")} 
        </button>
    );
}
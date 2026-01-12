import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
    return(
        <div className="flex justify-center text-xl gap-2 items-center my-8">
            <div>Loading...</div>
            <AiOutlineLoading3Quarters className="text-black animate-spin"/>
        </div>
    );
}
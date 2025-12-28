import { IoNotificationsOutline } from "react-icons/io5";
function LogoBar () {
    return(
        <div>
            <div className='flex justify-between m-4'>
                <h1 className="font-manrope font-bold text-3xl font-bold opacity-70 tracking-widest">
                    myFinFriend
                </h1>
                <div className="flex items-center">
                    <select className="text-sm font-manrope font-bold border border-black rounded-full mx-2 p-2 hover:bg-black hover:text-white transation-full duration-500" name="date">
                        <option value=""> May 25, 2025</option>
                    </select>
                    <IoNotificationsOutline className="text-xl"/>
                </div>
            </div>
            <hr className='border-t-2'/>
        </div>
    );
}

export default LogoBar;
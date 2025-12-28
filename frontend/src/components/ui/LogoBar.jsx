import { IoNotificationsOutline } from "react-icons/io5";
function LogoBar () {
    return(
        <div>
            <div className='flex justify-between m-4'>
                <h1 className="font-manrope font-bold text-3xl font-bold opacity-70 tracking-widest">
                    myFinFriend
                </h1>
                <div className="flex items-center">
                    <IoNotificationsOutline className="text-xl hover:text-gray-700 hover:animate-ring origin-top"/>
                </div>
            </div>
            <hr className='border-t-2'/>
        </div>
    );
}

export default LogoBar;
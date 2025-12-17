import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import './index.css';

function App() {
  return (
    <div>
      <div className='flex justify-between m-4'>
        <h1 className="font-manrope font-bold text-3xl font-bold opacity-70 tracking-widest">
          myFinFriend
        </h1>
        <div className="flex items-center">
            <select className="text-sm font-manrope font-bold border border-black rounded-full mx-2 p-2 transation-full duration-500" name="date">
                <option value=""> May 25, 2025</option>
            </select>
            <IoNotificationsOutline className="text-xl"/>
        </div>
      </div>
      <hr className='border-t-2'/>

      <nav>
          <h2 className="flex justify-center font-manrope font-bold text-2xl mt-4">
            Dashboard
          </h2>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-3">
            <button className="flex items-center text-white bg-black shadow-lg font-manrope font-bold gap-2 border border-black rounded-full px-5 py-3"> 
              Upload file 
              <MdOutlineFileUpload className="text-xl"/> 
            </button>
            <button className="flex items-center shadow-lg font-manrope font-bold gap-2 border border-black rounded-full px-5 py-3"> 
              <TiDocumentText className="text-xl"/> 
              View Transactions
              <FaArrowRight className="text-xl"/> 
            </button>
          </div>

          {/* Information demonstration */}
          <div className="max-w-5xl mx-auto">
            {/* Input on top-left */}
            <select className="text-xs border border-black font-bold tracking-wide rounded-full px-3 py-1 mb-3">
              <option value="monthly">Monthly</option>
            </select>

            {/* Info boxes */}
            <div className="flex gap-4">
              <div className="flex-1 bg-green-400 border-2 border-black rounded-2xl shadow-2xl">
                <p className="text-center text-sm font-bold opacity-80 pt-2">
                  Allowance
                </p>
                <p className="text-center text-2xl font-bold py-4">
                  $100.54
                </p>
              </div>

              <div className="flex-1 bg-red-400 border-2 border-black rounded-2xl shadow-2xl">
                <p className="text-center text-sm font-bold opacity-80 pt-2">
                  Usage
                </p>
                <p className="text-center text-2xl font-bold py-4">
                  -$90.54
                </p>
              </div>

              <div className="flex-1 bg-gray-300 border-2 border-black rounded-2xl shadow-2xl">
                <p className="text-center text-sm font-bold opacity-80 pt-2">
                  Total
                </p>
                <p className="text-center text-2xl font-bold py-4">
                  $10.00
                </p>
              </div>
            </div>

            {/*Insights | Advices from AI */}
            <div className="bg-yellow-100 mt-4 border border-black shadow-lg rounded-sm" name="insights">
              <p className="p-2"> Insights: You’re spend overwhelm your allowance. Consider to save some money. </p>
            </div>

          </div>
          {/* Charts */}
          <div className="flex justify-center gap-4 max-w-5xl mx-auto mt-4">
            {/* Bar chart → 1/3 */}
            <div className="flex-1 font-manrope border-2 border-black rounded-2xl shadow-2xl">
              <h3 className="text-center font-bold text-sm opacity-80 pt-2">
                Categories
              </h3>
              <p className="text-center font-bold text-2xl py-4">
                Bar Chart
              </p>
            </div>

            {/* Circle chart → 2/3 */}
            <div className="flex-[2] font-manrope border-2 border-black rounded-2xl shadow-2xl">
              <h3 className="text-center font-bold text-sm opacity-80 pt-2">
                Daily Cash Trend
              </h3>
              <p className="text-center font-bold text-2xl py-4">
                Circle Chart
              </p>
            </div>
          </div>
      </nav>
    </div>
  );
}

export default App;

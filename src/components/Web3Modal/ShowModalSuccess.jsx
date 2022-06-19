import { IconContext } from "react-icons";
import { GiConfirmed } from "react-icons/gi";

const ShowModalSuccess = ({setSuccess}) => {
    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="p-6 text-center">
                    <IconContext.Provider
                        value={{ color: 'green', size: '50px' }}
                        >
                        <div className="justify-center items-center flex mb-5">
                            <GiConfirmed />
                        </div>
                    </IconContext.Provider>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"> Your payment has been processed successfully </h3>
                        <button onClick={()=> setSuccess(false) } className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowModalSuccess;
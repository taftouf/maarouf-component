import { useState } from "react";
import PayWithEth from "./PayWithETH";
import PayWithToken from "./PayWithToken";
import { ethers } from "ethers";

const ModalPay = ({setShowModalPay, receiver, amount, tokenNumber, tokens, setSuccess, setFailed}) =>{
    const [pending ,setPending] = useState(false);

    const EthToEth = async()=>{
        setPending(true);
        const res = await PayWithEth(receiver, amount);
        setPending(false);
        setShowModalPay(false);
        if(res.status == 1){
            setSuccess(true);
        }else{
            setFailed(true);
        }
    }

    const TokenToETH = async (token)=>{
        setPending(true);
        var res = null;
        if(token.decimal == String(18)){
            res = await PayWithToken(receiver, token.address, ethers.utils.parseEther(token.price));
        }else{
            var _price = parseInt(token.price) * (10 ** parseInt(token.decimal));
            res = await PayWithToken(receiver, token.address, String(_price));
        }
        setPending(false);
        setShowModalPay(false);
        if(res.status == 1){
            setSuccess(true);
        }else{
            setFailed(true);
        }
    }

    return (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    {!pending ?
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => {setShowModalPay(false)}} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                        </button>
                        <div className="py-4 px-6 rounded-t border-b dark:border-gray-600">
                            <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                                Payment
                            </h3>
                        </div>
                        <div className="p-6">
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Don't miss to disconnect from your wallet afterpay</p>
                        <ul className="my-4 space-y-3">
                            <li>
                                <div onClick={()=>{EthToEth()}} className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                    <span className="flex-1 ml-3 whitespace-nowrap">ETH</span>
                                    <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">0.01</span>
                                </div>
                            </li>
                            {
                                tokens.map((token) =>
                                <li>
                                    <div onClick={()=>{TokenToETH(token)}} className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                        <span className="flex-1 ml-3 whitespace-nowrap">{token.symbol}</span>
                                        <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">{token.price}</span>
                                    </div>
                                </li>
                                )
                            }
                           
                        </ul>
                    </div>
                </div>
                    :
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        
                        <div className="py-4 px-6 rounded-t border-b dark:border-gray-600">
                            <h3 className="text-base font-semibold text-gray-900 lg:text-base dark:text-white">
                                Please wait your payment is being processed
                            </h3>
                        </div>
                        <div className="p-6"></div>
                        <div className="text-center">
                            <svg role="status" className="inline w-10 h-10 mr-10 mb-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                    </div>   
                    }
            </div>
          </div>
        </>
    )
}

export default ModalPay;

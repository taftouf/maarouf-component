import "../../index.css";
import { useState } from "react";
import ConnectWallet from "./ConnectWallet.jsx";
import ModalConnect from "./ModalConnect.jsx";
import Pay from "./Pay.jsx"
import ModalPay from "./ModalPay.jsx";
import ShowModalSuccess from "./ShowModalSuccess.jsx";
import ShowModalFailed from "./ShowModalFailed.jsx";

const Web3Modal =({receiver, amount, tokenNumber, tokens})=>{
    const [isAuth, setIsAuth] = useState(false);
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [showModalPay, setShowModalPay] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

  return (
      <>
        {isAuth ? 
            (
                <Pay 
                    setShowModalPay = {setShowModalPay}
                />
            ):(
                <ConnectWallet 
                    setShowConnectModal={setShowConnectModal}
                />
            )

        }
        {showConnectModal &&
            (
                <ModalConnect 
                    setShowConnectModal={setShowConnectModal} 
                    setIsAuth={setIsAuth}
                />
            )
        }
        {showModalPay &&
            (
                <ModalPay 
                    setShowModalPay={setShowModalPay}
                    receiver={receiver}
                    amount={amount}
                    tokenNumber={tokenNumber}
                    tokens={tokens}
                    setFailed={setFailed}
                    setSuccess={setSuccess}
                />
            )
        }
        {success &&
            (
                <ShowModalSuccess setSuccess={setSuccess}/>
            )
        }
        {failed &&
            (
                <ShowModalFailed setFailed={setFailed}/>
            )
        }

      </>
    
  )
}

export default Web3Modal;
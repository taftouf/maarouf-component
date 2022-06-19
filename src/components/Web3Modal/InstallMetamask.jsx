import { FaWallet } from "react-icons/fa"

const InstallMetamask = ()=>{
    return(
        <a className="border border-transparent hover:border-gray-300 bg-gray-900 dark:bg-white dark:hover:bg-gray-900 dark:hover:border-gray-900 dark:text-gray-900 dark:hover:text-white hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full" target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
            <div>
                <FaWallet />
            </div>
            <div>
                <p className="text-base leading-4">
                    Install Metamask
                </p>
            </div>
        </a>
    )
}

export default InstallMetamask;
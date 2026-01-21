import { useState } from "react";
import { ContractContext } from "./ContractContext";


const ContractProvider = ({ children }: { children: React.ReactNode }) => {
    const [address, setAddress] = useState<string>("")

    const connectWallet = (_address: string) => {
      setAddress(_address);
    }

    return (
      <ContractContext.Provider value={{ address, connectWallet }}>
        {children}
      </ContractContext.Provider>
    );
};
export default ContractProvider;
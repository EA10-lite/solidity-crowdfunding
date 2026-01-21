import { useContext } from "react";
import { ContractContext } from "../context/ContractContext";

export const useContractState = () => {
    const context = useContext(ContractContext);
    if (!context) throw new Error('useContractState must be used within a ContractProvider');
    return context;
};
'use client';
import { createContext } from 'react';

interface ContractState {
  address: string;
  connectWallet: (address: string) => void;
}

export const ContractContext = createContext<ContractState | undefined>(undefined);

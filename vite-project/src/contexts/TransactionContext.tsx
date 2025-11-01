import { createContext, Dispatch } from 'react';

export interface Transaction {
    date: string;
    amount: number;
    content: string;
    paymentMethod: string;
    category: string;
    type: "expense" | "income";
}

export type TransactionAction =
    | { type: 'ADD_ITEM'; payload: Transaction }
    | { type: 'DELETE_ITEM'; payload: Transaction };

export interface TransactionContextType {
    transactions: Transaction[];  // Array of all transactions (history)
    dispatch: Dispatch<TransactionAction>;
}

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined);
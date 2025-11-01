import React, { useReducer } from 'react';
import Form from './Form/Form';
import TransactionList from './TransactionList/TransactionList';
import { TransactionContext } from '../../contexts/TransactionContext';
import type { Transaction, TransactionAction } from '../../contexts/TransactionContext';

const transactionReducer = (state: Transaction[], action: TransactionAction): Transaction[] => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [action.payload, ...state]; // 새 항목을 맨 위에 추가
        case 'DELETE_ITEM':
            // DELETE_ITEM logic can be added later
            return state;
        default:
            return state;
    }
};

export default function Main() {
    const [transactions, dispatch] = useReducer(transactionReducer, []);
    return (
        <TransactionContext.Provider value={{ transactions, dispatch }}>
            <main>
                <Form />
                <TransactionList />
            </main>
        </TransactionContext.Provider>
    );
}
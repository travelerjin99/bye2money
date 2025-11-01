import React, { useReducer } from 'react';
import Form from './Form/Form';
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
                {/* <div>Main Component</div> */}
                <Form />
                {/* <TransactionList />  */}
                {/* 여기에 가계부의 다른 핵심 기능들이 들어갑니다. */}
                <pre>
                    {JSON.stringify(transactions, null, 2)}
                </pre>
            </main>
        </TransactionContext.Provider>
    );
}
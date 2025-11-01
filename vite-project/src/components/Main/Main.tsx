import React, { useReducer } from 'react';
import Form from './Form/Form';
import { TransactionsContext } from '../../contexts/TransactionContext';



export default function Main() {
    // const [transactions, dispatch] = useReducer(transactionsReducer, []);
    return (
        <main>
            {/* <div>Main Component</div> */}
            <Form />
            {/* <TransactionList />  */}
            {/* 여기에 가계부의 다른 핵심 기능들이 들어갑니다. */}
        </main>
    );
}
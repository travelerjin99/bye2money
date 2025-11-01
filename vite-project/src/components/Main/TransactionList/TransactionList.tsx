import React, { useContext } from 'react';
import styled from 'styled-components';
import { TransactionContext } from '../../../contexts/TransactionContext';
import type { Transaction } from '../../../contexts/TransactionContext';

const ListContainer = styled.div`
  padding: 0 24px 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TotalSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  margin-bottom: 16px;
`;

const TotalLabel = styled.div`
  font-size: 14px;
  color: #666;

  span {
    font-weight: 600;
    color: #333;
  }
`;

const TotalAmounts = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const TotalIncome = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span:first-of-type {
    font-size: 13px;
    color: #333;
    &::before {
      content: '✔ ';
    }
  }

  span:last-of-type {
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }
`;

const TotalExpense = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span:first-of-type {
    font-size: 13px;
    color: #333;
    &::before {
      content: '✔ ';
    }
  }

  span:last-of-type {
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }
`;

const DateSection = styled.div`
  margin-bottom: 16px;
`;

const DateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  margin-bottom: 0;
`;

const DateInfo = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const DateSummary = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
`;

const Income = styled.span`
  color: #333;
  font-weight: 600;
  &::before {
    content: '수입 ';
    font-weight: 500;
    color: #666;
  }
`;

const Expense = styled.span`
  color: #333;
  font-weight: 600;
  &::before {
    content: '지출 ';
    font-weight: 500;
    color: #666;
  }
`;

const TransactionItemsContainer = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const TransactionItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 120px 120px;
  gap: 16px;
  // padding: 12px 0;
  height: 48px;
  margin-bottom: 0;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Category = styled.div`
  font-size: 12px;
  color: #333;
  text-align: center;
  justify-content: center;
  background-color: #e8e8e8;
  font-weight: 500;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const PaymentMethod = styled.div`
  font-size: 13px;
  color: #666;
  text-align: center;
`;

const Amount = styled.div<{ isIncome: boolean }>`
  font-size: 15px;
  font-weight: 700;
  text-align: right;
  color: #333;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #999;
  font-size: 14px;
`;

// Helper function to format number with commas
const formatAmount = (amount: number): string => {
  return Math.abs(amount).toLocaleString('ko-KR');
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][date.getDay()];

  return `${month}월 ${day}일 ${dayOfWeek}`;
};

// Group transactions by date
const groupByDate = (transactions: Transaction[]) => {
  const grouped: { [date: string]: Transaction[] } = {};

  transactions.forEach(transaction => {
    if (!grouped[transaction.date]) {
      grouped[transaction.date] = [];
    }
    grouped[transaction.date].push(transaction);
  });

  return grouped;
};

// Calculate daily totals
const calculateDailyTotals = (transactions: Transaction[]) => {
  let income = 0;
  let expense = 0;

  transactions.forEach(transaction => {
    if (transaction.amount > 0) {
      income += transaction.amount;
    } else {
      expense += Math.abs(transaction.amount);
    }
  });

  return { income, expense };
};

export default function TransactionList() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error('TransactionList must be used within TransactionContext.Provider');
  }

  const { transactions } = context;

  if (transactions.length === 0) {
    return (
      <ListContainer>
        <EmptyState>등록된 거래 내역이 없습니다.</EmptyState>
      </ListContainer>
    );
  }

  // Calculate overall totals
  const { income: totalIncome, expense: totalExpense } = calculateDailyTotals(transactions);

  const groupedTransactions = groupByDate(transactions);
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => b.localeCompare(a));

  return (
    <ListContainer>
      <TotalSummary>
        <TotalLabel>
          전체 내역 <span>{transactions.length}건</span>
        </TotalLabel>
        <TotalAmounts>
          <TotalIncome>
            <span>수입</span>
            <span>{formatAmount(totalIncome)}원</span>
          </TotalIncome>
          <TotalExpense>
            <span>지출</span>
            <span>{formatAmount(totalExpense)}원</span>
          </TotalExpense>
        </TotalAmounts>
      </TotalSummary>

      {sortedDates.map(date => {
        const dailyTransactions = groupedTransactions[date];
        const { income, expense } = calculateDailyTotals(dailyTransactions);

        return (
          <DateSection key={date}>
            <DateHeader>
              <DateInfo>{formatDate(date)}</DateInfo>
              <DateSummary>
                {income > 0 && <Income>{formatAmount(income)}원</Income>}
                {expense > 0 && <Expense>{formatAmount(expense)}원</Expense>}
              </DateSummary>
            </DateHeader>

            <TransactionItemsContainer>
              {dailyTransactions.map((transaction, index) => (
                <TransactionItem key={index}>
                  <Category>{transaction.category}</Category>
                  <Content>{transaction.content}</Content>
                  <PaymentMethod>{transaction.paymentMethod}</PaymentMethod>
                  <Amount isIncome={transaction.amount > 0}>
                    {transaction.amount > 0 ? '+' : '-'}{formatAmount(transaction.amount)}원
                  </Amount>
                </TransactionItem>
              ))}
            </TransactionItemsContainer>
          </DateSection>
        );
      })}
    </ListContainer>
  );
}

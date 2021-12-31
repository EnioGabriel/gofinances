import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StatusBar } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from 'styled-components'

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserImage,
  UserGreetings,
  Greetings,
  Icon,
  UserName,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainer
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighlightProps {
  amount: string;
  lastTransaction: string
}
interface HighlightData {
  entries: HighlightProps,
  expensives: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [transaction, setTransaction] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({ entries: { amount: '0' }, expensives: { amount: '0' }, total: { amount: '0' } } as HighlightData);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();

  function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
    const getDataInTimestamp = collection
      // Filtrando apenas os positivos
      .filter((transaction) => transaction.type === type)
      // retornado dos positivos, apenas a data e formatando com timestamp
      .map((transaction) => new Date(transaction.date).getTime());

    // Faz o calculo para pegar a ultima transação
    const lastTransaction = new Date(Math.max.apply(Math, getDataInTimestamp));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {
      month: 'long'
    })}`
  }

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions"
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      if (item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount)
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }
    });

    setTransaction(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensive = getLastTransactionDate(transactions, 'negative');
    const totalInterval = `01 à ${lastTransactionExpensive}`;


    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpensive
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false)
  }

  useEffect(() => {
    loadTransactions();
  }, [])


  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      <StatusBar translucent={true} backgroundColor={'#5536d3'} />
      {isLoading ?
        <LoadContainer>
          <ActivityIndicator />
        </LoadContainer>
        :
        <>
          <Header>
            <UserWrapper>
              <UserImage
                source={{
                  uri: "https://avatars.githubusercontent.com/u/38878246?v=4",
                }}
              />
              <UserGreetings>
                <Greetings>Olá,</Greetings>
                <UserName>Gabriel</UserName>
              </UserGreetings>
            </UserWrapper>

            <LogoutButton borderless={false} onPress={() => { }}>
              <Icon name="power" />
            </LogoutButton>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={`Última entrada dia ${highlightData.entries.lastTransaction}`}
            />

            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={`Última saída dia ${highlightData.expensives.lastTransaction}`}
            />

            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transaction}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      }
    </Container>
  );
}

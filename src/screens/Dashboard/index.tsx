import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "react-native";

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
  LogoutButton
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighlightProps {
  amount: string;
}
interface HighlightData {
  entries: HighlightProps,
  expensives: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [transaction, setTransaction] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({ entries: { amount: '0' }, expensives: { amount: '0' }, total: { amount: '0' } } as HighlightData);


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

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
      }
    })
  }

  useEffect(() => {
    loadTransactions();
  }, [])


  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  console.log(highlightData);

  return (
    <Container>
      <StatusBar translucent={true} backgroundColor={'#5536d3'} />
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
          lastTransaction="Última entrada dia 22 de outubro"
        />

        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData.expensives.amount}
          lastTransaction="Última saída dia 11 de outubro"
        />

        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction="01 à 16 de abril"
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

    </Container>
  );
}

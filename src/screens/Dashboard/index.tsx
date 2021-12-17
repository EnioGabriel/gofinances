import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
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

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions"
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
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
    setData(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, [])

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
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 22 de outubro"
        />

        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 11 de outubro"
        />

        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
        {/* <TransactionCard data=data[0] /> */}
      </Transactions>

    </Container>
  );
}

import React from "react";
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
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "12/08/2021"
    },
    {
      id: '2',
      type: "negative",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'coffee'
      },
      date: "12/08/2021"
    },
    {
      id: '3',
      type: "negative",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'shopping-bag'
      },
      date: "12/08/2021"
    },
  ]

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

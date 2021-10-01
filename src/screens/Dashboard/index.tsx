import React from "react";
import { Container, Header, UserWrapper, UserImage, UserGreetings, Greetings, Icon, UserName } from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserImage source={{ uri: 'https://avatars.githubusercontent.com/u/38878246?v=4' }} />
          <UserGreetings>
            <Greetings>Olá,</Greetings>
            <UserName>Gabriel</UserName>
          </UserGreetings>
        </UserWrapper>

        {/* Chamando VectorIcon estilizado e passando o nome como props */}
        <Icon name='power' />
      </Header>
    </Container>
  );
}

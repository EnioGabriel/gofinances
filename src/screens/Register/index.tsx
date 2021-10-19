import React, { useState } from 'react'
import { StatusBar } from 'react-native';
import { Button } from '../../components/Forms/Button'
import { CategorySelect } from '../../components/Forms/CategorySelect'
import { Input } from '../../components/Forms/Input'
import { TransactionTypeButton } from '../../components/Forms/Input/TransactionTypeButton'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles'

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <Container>
      <StatusBar backgroundColor={'#4a27d6'} />
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder="Nome"
          />
          <Input
            placeholder="Preço"
          />

          <TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect("up")}
              // Retorna um booleano para saber se está ou não ativo
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect('down')}
              // Retorna um booleano para saber se está ou não ativo
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>

          <CategorySelect title="Categoria" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  )
}
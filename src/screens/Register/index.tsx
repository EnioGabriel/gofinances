import React, {useState} from 'react'
import { Button } from '../../components/Forms/Button'
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

  function handleTransectionTypeSelect(type: 'up' | 'down'){
    setTransactionType(type);
  }

  return(
    <Container>
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
            type = "up"
            title = "Income"
            onPress ={() => handleTransectionTypeSelect("up")}
            // Retorna um booleano para saber se está ou não ativo
            isActive = {transactionType === 'up' }
          />
          <TransactionTypeButton 
            type = "down"
            title = "Outcome"
            onPress ={() => handleTransectionTypeSelect('down')}
            // Retorna um booleano para saber se está ou não ativo
            isActive = {transactionType === 'down' }
          />
        </TransactionsTypes>

      </Fields>
      
      <Button title="Enviar"/>
    </Form>
    </Container>
  )
}
import React from 'react'
import { StatusBar } from 'react-native';
import { Button } from '../../components/Forms/Button'
import { Input } from '../../components/Forms/Input'
import { 
  Container,
  Header,
  Title,
  Form,
  Fields
} from './styles'

export function Register() {
  return(
    <Container>
      <StatusBar  backgroundColor={'#4a27d6'} />
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
      </Fields>
      
      <Button title="Enviar"/>
    </Form>
    </Container>
  )
}
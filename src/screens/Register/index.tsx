import React, { useState } from 'react'
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';

import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"

import { useForm } from 'react-hook-form';

import { InputForm } from '../../components/InputForm';
import { StatusBar } from 'react-native';
import { Button } from '../../components/Forms/Button'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { TransactionTypeButton } from '../../components/Forms/Input/TransactionTypeButton'

import { CategorySelect } from '../CategorySelect';

import {
   Container,
   Header,
   Title,
   Form,
   Fields,
   TransactionsTypes
} from './styles'

interface FormData {
   name: string;
   amount: string
}

const schema = Yup.object().shape({
   name: Yup.string().required('Nome é obrigatório'),
   amount: Yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('Preço é necessário')
})

export function Register() {
   const [transactionType, setTransactionType] = useState('');
   const [categoryModalOpen, setCategoryModalOpen] = useState(false);
   const [category, setCategory] = useState({
      key: 'category',
      name: 'Categoria',
   });

   const {
      control,
      handleSubmit,
      formState: { errors }
   } = useForm({
      resolver: yupResolver(schema)
   });

   function handleTransactionTypeSelect(type: 'up' | 'down') {
      setTransactionType(type);
   }

   function handleOpenSelectCategoryModal() {
      setCategoryModalOpen(true);
   }

   function handleCloseSelectCategoryModal() {
      setCategoryModalOpen(false);
   }

   function handleRegister(form: FormData) {
      if (!transactionType)
         return Alert.alert('Selecione o tipo da transação');

      if (category.key === "category")
         return Alert.alert('Selecione o tipo de categoria')

      const data = {
         name: form.name,
         amount: form.amount,
         transactionType,
         category: category.key
      }
   }

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <Container>
            <StatusBar translucent={true} backgroundColor={'#5536d3'} />
            <Header>
               <Title>Cadastro</Title>
            </Header>

            <Form>
               <Fields>
                  <InputForm
                     name="name"
                     control={control}
                     placeholder="Nome"
                     autoCapitalize="sentences"
                     autoCorrect={false}
                     error={errors.name && errors.name.message}
                  />

                  <InputForm
                     name="amount"
                     control={control}
                     placeholder="Preço"
                     keyboardType="numeric"
                     error={errors.amount && errors.amount.message}
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

                  <CategorySelectButton
                     title={category.name}
                     onPress={handleOpenSelectCategoryModal}
                  />
               </Fields>

               <Button
                  title="Enviar"
                  onPress={handleSubmit(handleRegister)}
               />
            </Form>

            <Modal statusBarTranslucent={true} visible={categoryModalOpen}>
               <CategorySelect
                  category={category}
                  setCategory={setCategory}
                  closeSelectCategory={handleCloseSelectCategoryModal}
               />
            </Modal>
         </Container>
      </TouchableWithoutFeedback>
   )
}

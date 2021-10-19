import React, { useState } from 'react'
import { Modal } from 'react-native';

import { useForm } from 'react-hook-form';

import { InputForm } from '../../components/InputForm';
import { Input } from '../../components/Forms/Input'
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

export function Register() {
   const [transactionType, setTransactionType] = useState('');
   const [categoryModalOpen, setCategoryModalOpen] = useState(false);
   const [category, setCategory] = useState({
      key: 'category',
      name: 'Category',
   });

   const {
      control,
      handleSubmit
   } = useForm();

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
      const data = {
         name: form.name,
         amount: form.amount,
         transactionType,
         category: category.key
      }

      console.log(data);

   }

   return (
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
               />

               <InputForm
                  name="amount"
                  control={control}
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
   )
}
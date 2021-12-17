import React, { useState } from 'react'
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import uuid from 'react-native-uuid';

import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

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
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
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

  function clearFields() {
    reset(); // Reseta dados do formulário (nome, preço)
    setTransactionType('');
    setCategory({
      key: 'category',
      name: 'Categoria'
    });
  }

  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Selecione o tipo da transação');

    if (category.key === "category")
      return Alert.alert('Selecione o tipo de categoria')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      type: transactionType === 'up' ? 'positive' : 'negative',
      category: category.key,
      date: new Date()
    }

    try {
      const dataKey = "@gofinances:transactions"

      const dataInStorage = await AsyncStorage.getItem(dataKey);
      const currentData = dataInStorage ? JSON.parse(dataInStorage) : [];

      // Pega as informações que já foram criadas (AsyncStorage) e une com a nova
      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      clearFields();

      navigation.navigate('Listagem')

    } catch {
      Alert.alert("Não foi possivel salvar")
    }
  }

  // useEffect(() => {
  //   // CRIANDO UMA FUNÇAO APENAS PARA USAR O ASYNC/AWAIT, VISTO QUE O USEEFFECT NAO COMPORTA ESSE COMANDO
  //   async function loadData() {
  //     const data = await AsyncStorage.getItem(dataKey);
  //     // ! => FORCA O TS A ENTENDER QUE O VALOR NUNCA VAI SER NULO (TO AVOID ERROR SINTAX)
  //     console.log(data!);
  //   }

  //   loadData();

  //   // REMOVENDO ITEM DO AsyncStorage
  //   // async function deleteStorage() {
  //   //   await AsyncStorage.removeItem(dataKey)
  //   // }
  //   // deleteStorage();
  // }, [])

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

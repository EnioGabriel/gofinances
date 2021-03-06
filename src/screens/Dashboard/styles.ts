import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import { BorderlessButton } from 'react-native-gesture-handler'

import { DataListProps } from ".";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;

  background-color: ${({ theme }) => theme.colors.primary};

  align-items: flex-start;
  flex-direction: row;
`;

export const UserWrapper = styled.View`
  flex: 1;
  width: 100%;

  /* padding: 0 24px; */

  /* AJUSTANDO TOPO DA TELA EM IOS */
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;

  flex-direction: row;
  /* justify-content: space-between; */
  /* align-items: center; */
`;

export const UserImage = styled.Image`
  height: ${RFValue(48)}px;
  width: ${RFValue(48)}px;
  border-radius: 10px;
  margin-left: 24px;
`;

export const UserGreetings = styled.View`
  margin-left: 13px;
`;

export const Greetings = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)`

`

// Estilizando uma biblioteca (Feather Vector Icon)
export const Icon = styled(Feather)`
  margin-top: ${getStatusBarHeight() + RFValue(8)}px;
  padding: 27px;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

// Acessa as propriedades do elemento com 'attrs'
export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;

  /* Cria uma esp??cie de z:index em rela????o ao pai */
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1%;
  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;
`

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin-bottom: 16px;
`

export const TransactionList = styled(
  FlatList as new () => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace()
  }
})`
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center
`

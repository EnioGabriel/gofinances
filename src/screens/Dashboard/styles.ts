import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  flex-direction: row;
`;

export const UserWrapper = styled.View`
  flex: 1;
  width: 100%;

  /* padding: 0 24px; */

  flex-direction: row;
  /* justify-content: space-between; */
  /* align-items: center; */
`;

export const UserImage = styled.Image`
  height: ${RFValue(48)}px;
  width: ${RFValue(48)}px;
  border-radius: 10px;
  margin-left: 13px;
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

// Estilizando uma biblioteca (Feather Vector Icon)
export const Icon = styled(Feather)`
  padding: 13px;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView`
  
`;

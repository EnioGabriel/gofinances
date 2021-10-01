import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  /* Alinhando na vertical */
  justify-content: center;
  /* Alinhando na horizontal */
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.title};
`;

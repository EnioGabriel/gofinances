import 'react-native-gesture-handler';

import React from "react";
import AppLoading from "expo-app-loading";
// Contexto para disponibilizar o tema
import { ThemeProvider } from "styled-components/native";
import theme from "./src/global/styles/theme";

import { NavigationContainer } from '@react-navigation/native'

import {
   useFonts,
   Poppins_400Regular,
   Poppins_500Medium,
   Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { AppRoutes } from './src/routes/app.routes';

export default function App() {
   const [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_700Bold,
   });

   // Aguarda carregar as fontes (Segura o inicio do App)
   if (!fontsLoaded) {
      return <AppLoading />;
   }

   return (
      <ThemeProvider theme={theme}>
         <NavigationContainer>
            <AppRoutes />
         </NavigationContainer>
      </ThemeProvider>
   );
}

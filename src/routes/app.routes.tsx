import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Register } from '../screens/Register';
import { useTheme } from 'styled-components';

import { Dashboard } from '../screens/Dashboard';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
   const theme = useTheme();

   return (
      <Navigator
         screenOptions={{
            tabBarActiveTintColor: theme.colors.secondary,
            tabBarInactiveTintColor: theme.colors.text,
            headerTransparent: true,
            // Desabilita o header
            headerShown: false,
            tabBarLabelPosition: 'beside-icon',
            tabBarStyle: {
               paddingVertical: Platform.OS === 'ios' ? 20 : 0,
               height: 88
            }
         }}
      >
         <Screen
            name="Listagem"
            component={Dashboard}
            // Estilizando configurações criadas por default
            options={{
               tabBarIcon: (({ size, color }) => (
                  <MaterialIcons
                     name="format-list-bulleted"
                     size={size}
                     color={color}
                  />
               )),
            }}
         />

         <Screen
            name="Cadastrar"
            component={Register}
            // configurações do Header que é criado por default
            options={{
               tabBarIcon: (({ size, color }) => (
                  <MaterialIcons
                     name="attach-money"
                     size={size}
                     color={color}
                  />
               )),
            }}
         />

         <Screen
            name="Resumo"
            component={Register}
            // configurações do Header que é criado por default
            options={{
               tabBarIcon: (({ size, color }) => (
                  <MaterialIcons
                     name="pie-chart"
                     size={size}
                     color={color}
                  />
               )),
            }}
         />
      </Navigator>
   )
}

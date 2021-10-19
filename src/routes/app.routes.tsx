import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
   return (
      <Navigator>
         <Screen
            name="Listagem"
            component={Dashboard}
            // configurações do Header que é criado por default
            options={{
               // Desativa o background
               headerTransparent: true,
               // Desativa o texto
               headerStatusBarHeight: 0
            }}
         />

         <Screen
            name="Cadastrar"
            component={Register}
            // configurações do Header que é criado por default
            options={{
               // Desativa o background
               headerTransparent: true,
               // Desativa o texto
               headerStatusBarHeight: 0
            }}
         />
      </Navigator>
   )
}

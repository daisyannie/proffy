import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';

// Comando para importar as fontes:
// D:\Users\daisy.annie\nlw\mobile> expo install expo-font @expo-google-fonts/archivo @expo-google-fonts/poppins
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';

export default function App() {

  // A variável fontsLoaded vai trocar seu valor pra true assim que as fontes tiverem sido carregadas com sucesso
  let [fontsLoaded] = useFonts({
    Archivo_400Regular, 
    Archivo_700Bold, 
    Poppins_400Regular, 
    Poppins_600SemiBold
  });

  // Mostra o AppLoding (página de carregamento) enquanto as fontes não tiverem sido carregadas
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <AppStack />
        <StatusBar style="light" />
      </>
    );
  }
}
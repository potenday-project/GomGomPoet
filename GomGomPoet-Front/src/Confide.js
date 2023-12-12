import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View } from 'react-native';

export default ({ navigation }) => {
    const handlePressBtn = () => navigation.navigate('Comfort');
    
    return (
        <View style={styles.container}>
            <Text>고민작성페이지</Text>
            <Button onPress={handlePressBtn} title='시/N행시' color='#841584'/>
            <StatusBar style='auto'/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

export default () => {
    const [text, onChangeText] = useState('');

    const handlePressBtn = () => {

    }
    
    return (
        <View style={styles.container}>
            <Text>곰곰시인</Text>
            <Text>사용자명</Text>
            <TextInput style={{ border: '1px solid black' }} onChangeText={onChangeText} value={text}/>
            <Button onPress={handlePressBtn} title='로그인' color='#841584'/>
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
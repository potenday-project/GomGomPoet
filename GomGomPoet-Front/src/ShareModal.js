import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { styles } from "./Style";


const CircleButton = ({ color, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.circleButton, { backgroundColor: color }]}
  />
);


const ShareModal = ({ isVisible, onClose }) => {
  const colors = ['#5adbbd', '#fba465', '#9b6aca', '#ec6c6e', '#f5aac3', '#6ec7e0', '#e86363']; // 색상 값 배열

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
        <View style={styles.header}>
          <Text style={styles.headerText}>공유하기</Text>
            <TouchableOpacity
              onPress={onClose}
              // style={[styles.button, { width: 80 }]}
            >
              <Image
                source={require("../assets/question-line.png")} // 이미지 경로는 실제 이미지에 맞게 변경하세요.
                style={styles.helpImage}
              />

              </TouchableOpacity>
        </View>

        <ScrollView style={[styles.scrollView, {backgroundColor: 'white'}]}>
        <View sylte={styles.containerCenterMiddle} >
          <View style={{alignItems: "center", justifyContent: "center", height: '70%'}}>
            <View style={{alignItems: 'center'}}>
                <ImageBackground
                  source={require("../assets/tnl_img/1.jpg")} // 실제 이미지 경로로 변경하세요.
                  style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                  // resizeMode="contain"
                >
                  <Text style={styles.shareImageText}>예시 텍스트입니다</Text>
                </ImageBackground>
            </View>
          </View>

          <View style={[styles.containerCenter, { marginTop: 10 }]}>
            <View style={{ flexDirection: "row" }}>
             {colors.map((color, index) => (
                <CircleButton key={index.toString()} color={color} onPress={() => console.log('Pressed', color)} />
              ))}
            </View>
          </View>

          <View style={[styles.containerCenter, { marginTop: 10 }]}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.button, { width: 80 }]}
              >
                <Text style={styles.buttonText}>저장하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { width: 80 }]}
              >
                <Text style={styles.buttonText}>공유하기</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        </ScrollView>

    </Modal>
  );
};

export default ShareModal;
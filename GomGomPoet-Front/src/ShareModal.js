import React, { useState, useRef } from "react";
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
import ViewShot from 'react-native-view-shot';

const CircleButton = ({ color, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.circleButton, { backgroundColor: color }]}
  />
);


const ShareModal = ({ isVisible, onClose, poem, randomIndex, color, setColor, shareHistory }) => {
  const colors = ['#5adbbd', '#fba465', '#9b6aca', '#ec6c6e', '#f5aac3', '#6ec7e0', '#e86363']; // 색상 값 배열
  const viewShotRef = useRef(null);

  const shareImage = async () => {
    try {
      // 이미지를 캡처합니다
      const uri = await viewShotRef.current.capture();

      // 이미지를 캡처한 후 일정 시간을 기다립니다 (비동기 처리가 완료되기를 기다립니다)
      await new Promise(resolve => setTimeout(resolve, 1000));

      const blob = await (await fetch(uri)).blob();
      const file = new File([blob], 'fileName.png', { type: blob.type });
      navigator.share({
        title: 'Hello',
        text: 'Check out this image!',
        files: [file]
      });
    } catch (error) {
      console.error('이미지 공유 중 오류 발생:', error);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={[styles.header, { justifyContent: 'flex-end' }]}>
        {/* <Text style={styles.headerText}>공유하기</Text> */}
        <TouchableOpacity
          onPress={onClose}
        >
          <Image
            source={require("../assets/close.png")} // 이미지 경로는 실제 이미지에 맞게 변경하세요.
            style={styles.helpImage}
          />

        </TouchableOpacity>
      </View>

      <ScrollView style={[styles.scrollView, { backgroundColor: 'white' }]}>
        <View sylte={styles.containerCenterMiddle} >
          <ViewShot ref={viewShotRef} style={{ alignItems: "center", justifyContent: "center" }} options={{ format: 'png', quality: 0.9 }}>
            <View style={{ alignItems: 'center', width: '100%' }}>
              <ImageBackground
                source={require(`../assets/tnl_img/${randomIndex}.jpg`)} // 실제 이미지 경로로 변경하세요.
                style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
              // resizeMode="contain"
              >
                <Text style={[styles.shareImageText, { color }]}>{poem}</Text>

                <View style={styles.shareLogoBox}>
                  <ImageBackground source={require(`../assets/logo.jpg`)} style={styles.logoImage} />
                </View>

              </ImageBackground>
            </View>
          </ViewShot>

          <View style={[styles.containerCenter, { marginTop: 10 }]}>
            <View style={{ flexDirection: "row" }}>
              {colors.map((color, index) => (
                <CircleButton key={index.toString()} color={color} onPress={() => setColor(color)} />
              ))}
            </View>
          </View>

          <View style={[styles.containerCenter, { marginTop: 10, marginBottom: 10 }]}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.button, { width: 100, marginRight: 10 }]}
                onPress={shareImage}
              >
                <Text style={[styles.buttonText, styles.defaultFont]}>공유하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { width: 100 }]}
                onPress={shareHistory}
              >
                <Text style={[styles.buttonText, styles.defaultFont]}>자랑하기</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>

    </Modal>
  );
};

export default ShareModal;

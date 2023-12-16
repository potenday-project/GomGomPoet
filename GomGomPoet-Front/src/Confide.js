import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PopupModal from "./PopupModal";
import Tab from "./Tab";
import { styles } from "./Style";

export default ({ navigation }) => {
  const [inputText, setInputText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handlePressBtn = (type) => navigation.navigate("Comfort", { input: inputText, type });

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible); // 모달 가시성을 토글
  };

  return (
    <ImageBackground style={styles.view} source={require(`../assets/bk-img.jpg`)}>
      <SafeAreaView
        style={styles.safeAreaContainer}
        edges={["top", "right", "bottom", "left"]}
      >
        <PopupModal isVisible={isModalVisible} onClose={toggleModal} />
        {/*
        <View style={styles.header}>
          <Text style={styles.headerText}>곰곰시인</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={require("../assets/question-line.png")} // 이미지 경로는 실제 이미지에 맞게 변경하세요.
              style={styles.helpImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerSeparator}></View>
        */}
        <View style={styles.containerCenterMiddle}>
          <View style={[styles.logoImageContainer, { marginBottom: 10 }]}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logoImage}
            />
          </View>
        </View>
        <View style={styles.containerCenterMiddle}>
          <View style={[styles.gomgomImageContainer, { marginTop: 10 }]}>
            <Image
              source={require("../assets/icon1.png")}
              style={styles.gomgomImage}
            />
          </View>
        </View>
        <View style={[styles.containerCenterMiddle, { marginTop: 10 }]}>
          <Text style={[styles.text, { width: "80%", textAlign: "center" }, styles.defaultFont]}>
            고민을 적어주시면
          </Text>
          <Text style={[styles.text, { width: "80%", textAlign: "center" }, styles.defaultFont]}>
            시와 N행시로 고민을 해결해드립니다.
          </Text>
        </View>
        <View style={[styles.containerCenterMiddle, { marginTop: 10 }]}>
          <TextInput
            style={[styles.input, styles.defaultFont]}
            placeholder="오늘의 고민을 입력해주세요."
            onChangeText={(text) => setInputText(text)}
            value={inputText}
          />
        </View>

        {/* 버튼 영역 시작 */}
        <View style={[styles.containerCenter, { marginTop: 10 }]}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.button, { width: 80 }]}
              onPress={() => handlePressBtn('poem')}
            >
              <Text style={[styles.buttonText, styles.defaultFont]}>시</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { width: 80 }]}
              onPress={() => handlePressBtn('acrosticpoem')}
            >
              <Text style={[styles.buttonText, styles.defaultFont]}>N행시</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>

      <Tab navigation={navigation} idx={0} />
    </ImageBackground>
  );
};

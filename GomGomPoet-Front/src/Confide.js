import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, SafeAreaView, Image, ImageBackground, View, TextInput, TouchableOpacity } from "react-native";
import ValidationModal from "./ValidationModal";
import { styles } from "./Style";

export default ({ navigation }) => {
    const [inputText, setInputText] = useState("");
    const [isValidVisible, setIsValidVisible] = useState(false);
    const handlePressBtn = (type) => {
        if (inputText.length < 10) {
            setIsValidVisible(true);
        } else {
            navigation.navigate("Comfort", { input: inputText, type });
        }
    };

    const toggleValidModal = () => {
        setIsValidVisible(!isValidVisible); // 모달 가시성을 토글
    };

    return (
        <ImageBackground style={styles.view} source={require(`../assets/new-bk-img.jpg`)}>
            <SafeAreaView
                style={styles.safeAreaContainer}
                edges={["top", "right", "bottom", "left"]}
            >
                <ValidationModal isVisible={isValidVisible} onClose={toggleValidModal} />

                <View style={styles.logoBox}>
                    <View style={[styles.logoImageContainer]}>
                        <Image
                            source={require("../assets/new-gom-logo.png")}
                            style={styles.logoImage}
                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={[styles.text, { textAlign: "center" }, styles.defaultFont]}>
                        고민을 적어주시면
                    </Text>
                    <Text style={[styles.text, { textAlign: "center" }, styles.defaultFont]}>
                        시와 N행시로 고민을 해결해드립니다.
                    </Text>
                </View>

                <View style={styles.containerCenterMiddle}>
                    <View style={[styles.gomgomImageContainer, { marginTop: 20 }]}>
                        <Image
                            source={require("../assets/new-gom-img.png")}
                            style={styles.gomgomImage}
                        />
                    </View>
                </View>

                <View style={styles.containerCenterMiddle}>
                    <TextInput
                        style={[styles.input, styles.defaultFont, { paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px' }]}
                        placeholder="오늘의 고민을 입력해주세요."
                        onChangeText={(text) => setInputText(text)}
                        value={inputText}
                        multiline
                    />
                </View>

                {/* 버튼 영역 시작 */}
                <View style={[styles.containerCenter, { marginBottom: 10 }]}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            style={[styles.button, { width: 100, backgroundColor: '#e4eeff', borderRadius: '5px' }]}
                            onPress={() => handlePressBtn('acrosticpoem')}
                        >
                            <Text style={[styles.buttonText, styles.defaultFont]}>N행시</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { width: 100, backgroundColor: '#ffe4f4', borderRadius: '5px' }]}
                            onPress={() => handlePressBtn('poem')}
                        >
                            <Text style={[styles.buttonText, styles.defaultFont]}>시</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <StatusBar style="auto" />
            </SafeAreaView>
        </ImageBackground>
    );
};
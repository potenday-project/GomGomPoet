import React, { useState, useRef } from "react";
import { Text, Image, View, Modal, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { styles } from "./Style";
import ViewShot from "react-native-view-shot";

const CircleButton = ({ color, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.circleButton, { backgroundColor: color }]}
    />
);

const ShareModal = ({ isVisible, onClose, poem, randomIndex, color, setColor, uuid }) => {
    const colors = ['#000000', '#3685E0', '#5adbbd', '#fba465', '#9b6aca', '#f5aac3', '#FFFFFF']; // 색상 값 배열
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

    const shareLink = () => {
        let _color = color.substring(1);
        fetch(`/api/share/${uuid}/image/${randomIndex}/color/${_color}`, {
            method: 'POST'
        }).then(res => {
            navigator.share({
                title: '곰곰시인',
                text: '곰곰시인을 통해 고민을 나누고 위로를 받아보세요. https://gomgom-poet.co.kr/share/' + uuid
            });
        })
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={[styles.header, { justifyContent: "flex-end" }]}>
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
                                <Text style={[styles.shareImageText, { color }, styles.thumbFont]}>{poem}</Text>

                                <View style={styles.shareLogoBox}>
                                    <ImageBackground source={require(`../assets/new-gom-logo.png`)} style={styles.logoImage} />
                                </View>
                            </ImageBackground>
                        </View>
                    </ViewShot>

                    <View style={[styles.containerCenter, { marginTop: 12 }]}>
                        <View style={{ flexDirection: "row" }}>
                            {colors.map((color, index) => (
                                <CircleButton key={index.toString()} color={color} onPress={() => setColor(color)} />
                            ))}
                        </View>
                    </View>

                    <View style={[styles.containerCenter, { marginTop: 12, marginBottom: 12 }]}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                style={[styles.button, { width: 100, marginRight: 10, backgroundColor: '#e4eeff', borderRadius: '5px' }]}
                                onPress={shareImage}
                            >
                                <Text style={[styles.buttonText, styles.defaultFont]}>이미지 공유</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { width: 100, backgroundColor: '#ffe4f4', borderRadius: '5px' }]}
                                onPress={shareLink}
                            >
                                <Text style={[styles.buttonText, styles.defaultFont]}>URL 공유</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
};

export default ShareModal;
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { styles as extStyles } from "./Style";

export default ({ route, navigation }) => {
    const [data, setData] = useState();

    const handlePressLogo = () => {
        navigation.navigate("Confide");
    };

    useEffect(() => {
        fetch('/api/share/' + route.params.uuid)
        .then(res => res.json())
        .then(res => setData(res));
    }, []);

    if (!data) {
        return null;
    }

    return (
        <ImageBackground style={styles.container} source={require(`../assets/new-bk-img.jpg`)}>
            <ScrollView>
                <TouchableOpacity onPress={() => handlePressLogo()}>
                    <View style={styles.logo}>
                        <ImageBackground source={require(`../assets/new-gom-logo.png`)} style={styles.logoimg} />
                    </View>
                </TouchableOpacity>
                <View style={styles.box}>
                    <ImageBackground source={require(`../assets/tnl_img/${data.image}.jpg`)} resizeMode='cover'
                        style={[styles.thumbnail, { position: 'relative' }]}>
                        <Text style={[{ color: `#${data.color}` }, extStyles.thumbFont]}>{data.poem}</Text>
                        <View style={styles.tnlLogoBox}>
                            <ImageBackground source={require(`../assets/new-gom-logo.png`)} style={[styles.logoimg, styles.tnlLogo]} />
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.myQuestion}>
                    <View style={[styles.box, styles.myQuestionBox]}>
                        <Text style={[styles.title, styles.myQuestionTitle, extStyles.defaultFont]}>나의 고민</Text>
                        <Text style={extStyles.defaultFont}>{data.input}</Text>
                    </View>
                </View>

                <View style={[styles.answerTxt, styles.box]}>
                    <Text style={[styles.title, styles.answerTitle, extStyles.defaultFont]}>
                        {data.type === 'poem' ? '시' : 'N행시'}
                    </Text>
                    <Text style={extStyles.defaultFont}>{data.poem}</Text>
                </View>

                <View style={[styles.answerMessage, styles.box]}>
                    <View style={[styles.title, styles.messageTitle, extStyles.defaultFont]}>곰곰시인의 편지</View>
                    <Text style={extStyles.defaultFont}>{data.letter}</Text>
                </View>

                <StatusBar style='auto' />
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'rgb(191, 225, 192)',
        // backgroundImage: 'radial-gradient(rgb(127 197 129) 25%, transparent 0), radial-gradient(rgb(127 197 129) 25%, transparent 0)',
        // backgroundPosition: '0 0, 40px 40px',
        // backgroundSize: '80px 80px'
    },
    logo: {
        width: '260px',
        height: '70px',
        margin: 'auto',
        marginTop: '10px',
    },
    logoimg: {
        flex: 1,
        resizeMode: 'cover', // 이미지 크기에 맞게 조절
        justifyContent: 'center',
    },
    box: {
        width: '270px',
        backgroundColor: 'rgb(247, 247, 247)',
        borderRadius: '7px',
        textAlign: 'center',
        margin: 'auto',
        marginTop: '20px'
    },
    title: {
        margin: 'auto',
        marginBottom: '10px',
        height: '30px',
        borderRadius: '7px',
        textAlign: 'center',
        lineHeight: '28px',
        padding: '2px',
        fontWeight: 'bold'
    },
    thumbnail: {
        margin: 'auto',
        width: '270px',
        minHeight: '300px',
        textAlign: 'center',
        alignItems: 'center',
        lineHeight: '290px',
        padding: '30px',
        paddingBottom: '60px'
    },
    thumbnailImage: {
        width: '100%',  // 이미지를 가득 채우도록 설정
        height: '100%', // 이미지를 가득 채우도록 설정
        resizeMode: 'cover', // 이미지 비율 유지 및 여백 채우기
        borderRadius: 7,
    },
    tnlBtnClk: {
        margin: 'auto',
        marginTop: '15px',
        width: '120px',
    },
    tnlBtnTxt: {
        textAlign: 'center',
        backgroundColor: '#612eb9',
        borderRadius: '7px',
        color: 'white',
        height: '30px',
        lineHeight: '30px'
    },
    tnlLogoBox: {
        width: '270px',
        height: '25px',
        marginBottom: '3px',
        marginRight: '3px',
        position: 'absolute',
        bottom: 0,
        alignItems: 'flex-end'
    },
    tnlLogo: {
        width: '100px',
    },
    myQuestionBox: {
        padding: '15px',
        marginTop: '60px'
    },
    myQuestionTitle: {
        width: '100px'
    },
    answerTxt: {
        marginTop: '15px',
        padding: '15px',
        whiteSpaceCollapse: 'preserve-breaks'
    },
    answerTitle: {
        width: '70px',
        backgroundColor: 'rgb(161, 215, 215)',
        color: 'white'
    },
    answerMessage: {
        marginTop: '30px',
        marginBottom: '30px',
        padding: '15px',
        whiteSpaceCollapse: 'preserve-breaks'
    },
    messageTitle: {
        width: '130px',
        backgroundColor: 'rgb(253, 208, 89)',
        color: 'white'
    }
});
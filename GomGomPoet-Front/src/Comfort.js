import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import ShareModal from "./ShareModal";
import ViewShot from 'react-native-view-shot';
import { styles as extStyles } from "./Style";

export default ({ route, navigation }) => {
    let { type, input } = route.params;
    let _poem = route.params.poem;
    let _letter = route.params.letter;
    let _image = route.params.image;
    let _color = route.params.color;
    let [randomIndex, setRandomIndex] = useState(_image || 1);
    let [poem, setPoem] = useState(_poem || '');
    let [letter, setLetter] = useState(_letter || '');
    let [color, setColor] = useState(_color || '#000000');
    let [uuid, setUuid] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const viewShotRef = useRef(null);

    const handleClickShareBtn = () => setIsModalVisible(true);

    const handlePressLogo = () => {
        navigation.navigate("Confide");
    };

    useEffect(() => {
        if (_poem) {
            return;
        }
        let min = 80;
        let max = 82;
        setRandomIndex(Math.floor(Math.random() * (max - min + 1)) + min);
        let headers = {
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'changeOrigin': true
        };
        fetchEventSource('/api/poem', {
            method: 'POST',
            headers,
            body: JSON.stringify({ input, type }),
            onmessage: ({ id, event, data }) => {
                if (event === 'uuid') {
                    setUuid(data);
                    return;
                }
                data = JSON.parse(data);
                if (event === 'signal' && data.data === '[DONE]') {
                    return;
                }
                let content = data.message.content;
                let func = data.type === 'poem' ? setPoem : setLetter;
                event === 'result' ? func(content) : func(val => val + content);
            }
        });
    }, []);

    useEffect(() => {
        if (route.params.poem) {
            let _poem = route.params.poem;
            let _letter = route.params.letter;
            let _image = route.params.image;
            let _color = route.params.color;
            setRandomIndex(_image || 1);
            setPoem(_poem || '');
            setLetter(_letter || '');
            setColor(_color || '#000000');
        }
    }, [route.params]);

    return (
        <ImageBackground style={styles.container} source={require(`../assets/new-bk-img.jpg`)}>
            <ShareModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} poem={poem} randomIndex={randomIndex} color={color} setColor={setColor} uuid={uuid}/>
            <ScrollView>
                <TouchableOpacity onPress={() => handlePressLogo()}>
                    <View style={styles.logo}>
                        <ImageBackground source={require(`../assets/new-gom-logo.png`)} style={styles.logoimg} />
                    </View>
                </TouchableOpacity>
                <ViewShot ref={viewShotRef} style={styles.box} options={{ format: 'png', quality: 0.9 }}>
                    <ImageBackground source={require(`../assets/tnl_img/${randomIndex}.jpg`)} resizeMode='cover'
                        style={[styles.thumbnail, { position: 'relative' }]}>
                        <Text style={[{ color }, extStyles.thumbFont]}>{poem}</Text>
                        <View style={styles.tnlLogoBox}>
                            <ImageBackground source={require(`../assets/new-gom-logo.png`)} style={[styles.logoimg, styles.tnlLogo]} />
                        </View>
                    </ImageBackground>
                </ViewShot>



                {/* 이미지 공유 버튼 추가 */}
                <TouchableOpacity onPress={handleClickShareBtn} style={styles.tnlBtnClk}>
                    <Text style={[styles.tnlBtnTxt, extStyles.defaultFont]}>이미지 공유하기</Text>
                </TouchableOpacity>

                <View style={styles.myQuestion}>
                    <View style={[styles.box, styles.myQuestionBox]}>
                        <Text style={[styles.title, styles.myQuestionTitle, extStyles.defaultFont]}>나의 고민</Text>
                        <Text style={extStyles.defaultFont}>{input}</Text>
                    </View>
                </View>

                <View style={[styles.answerTxt, styles.box]}>
                    <Text style={[styles.title, styles.answerTitle, extStyles.defaultFont]}>
                        {type === 'poem' ? '시' : 'N행시'}
                    </Text>
                    <Text style={extStyles.defaultFont}>{poem}</Text>
                </View>

                <View style={[styles.answerMessage, styles.box]}>
                    <View style={[styles.title, styles.messageTitle, extStyles.defaultFont]}>곰곰시인의 편지</View>
                    <Text style={extStyles.defaultFont}>{letter}</Text>
                </View>

                {/* <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.buttonText}>공유하기</Text>
        </TouchableOpacity> */}

                <StatusBar style='auto' />
            </ScrollView>
            {/*
      <View style={{ position: 'sticky', bottom: 0 }}>
        <Tab navigation={navigation} idx={0} />
      </View>
      */}
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
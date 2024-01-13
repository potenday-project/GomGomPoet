import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import ShareModal from "./ShareModal";
import ViewShot from 'react-native-view-shot';
import Tab from "./Tab";
import { styles as extStyles } from "./Style";

let question = '학교에서 같은 반 남자아이를 좋아하게 됐는데 마음을 전하고 싶지만 용기가 나지 않아..'

let poem = '비밀스런 마음이 새하얗게 피어나네,/n봄바람처럼 가벼운 마음의 꽃이 피어나네./n같은 꿈을 꾸며 함께 걷던 그 길,/n가까워진 마음, 어쩌면 나의 심장이 뛰네./n하지만 말하지 못하는 그 마음,/n언제나 숨겨두고 말아야만 했네./n/n꽃잎처럼 은은하게 흩날리는 사랑,/n마치 시인의 언어로 감싸인 마음을 담아내네./n/n용기를 내어 고백하는 그 순간,/n얼마나 아름다운 미소로 반겨줄지 상상하며./n/n그런데도 망설이고, 두려움에 휩싸인 채,/n시간은 조용히 흘러가네./n/n이 마음을 전하고 싶은데 말이 쉽지 않아,/n한없이 흘러가는 세월에 묻어나는 내 마음./n/n우리의 이야기, 언젠가는 시작될 것 같아,/n꽃이 피듯이 아름다운 사랑의 꿈을 꾸며.';

let letter = '안녕. 먼저, 용기를 내어 그 마음을 표현한 너에게 박수를 보내고 싶어졌어. 마음을 전하고 싶다는 감정은 언제나 아름다운 것이라고 생각해. 그러나 동시에, 두려움과 망설임이 드는 것도 이해해./n/n내가 바라는 건 네가 마음을 표현하는데 두려움을 극복하고, 상대에게 솔직하게 다가갈 용기를 갖는 것이야. 물론 결과는 어떻든, 그 순간의 결실이 네게 새로운 경험을 안겨줄 거야. 어떤 선택이든, 네가 행복하길 바라고 있어./n/n그리고 너의 감정을 이해해주는 사람들이 꼭 주변에 있다는 걸 잊지 마. 그들은 너를 지지하고, 네 곁에 있을 거야. 고민이나 어려움이 있으면 언제든 나에게 이야기해도 돼./n/n계속해서 용기 내어 나아가고, 자신을 더 알아가는 여정을 즐기길 바라고 있어./n/n언제든 말해줘.'

let IMAGE_COUNT = 79;

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
  let [isFinished, setFinished] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const viewShotRef = useRef(null);

  const handleClickShareBtn = () => setIsModalVisible(true);

  // 이미지 공유 함수
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

  const shareHistory = () => {
    fetch('/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, input, poem, letter, image: randomIndex, color })
    }).then(res => {
      setIsModalVisible(false);
      navigation.navigate('History');
    })
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

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
    fetchEventSource('/poem', {
      method: 'POST',
      headers,
      body: JSON.stringify({ input, type }),
      onmessage: ({ id, event, data }) => {
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
    if (!isFinished) {
        return;
    }
    fetch('/logging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, input: input.replaceAll('\n', '\\n'), poem: poem.replaceAll('\n', '\\n'), letter: letter.replaceAll('\n', '\\n'), image: randomIndex, color })
    })
  }, [isFinished])

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
      <ShareModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} poem={poem} randomIndex={randomIndex} color={color} setColor={setColor} shareHistory={shareHistory} />
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
      <View style={{ position: 'sticky', bottom: 0 }}>
        <Tab navigation={navigation} idx={0} />
      </View>
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
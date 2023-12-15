import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { fetchEventSource } from '@microsoft/fetch-event-source';

let question = '학교에서 같은 반 남자아이를 좋아하게 됐는데 마음을 전하고 싶지만 용기가 나지 않아..'

let poem = '비밀스런 마음이 새하얗게 피어나네,/n봄바람처럼 가벼운 마음의 꽃이 피어나네./n같은 꿈을 꾸며 함께 걷던 그 길,/n가까워진 마음, 어쩌면 나의 심장이 뛰네./n하지만 말하지 못하는 그 마음,/n언제나 숨겨두고 말아야만 했네./n/n꽃잎처럼 은은하게 흩날리는 사랑,/n마치 시인의 언어로 감싸인 마음을 담아내네./n/n용기를 내어 고백하는 그 순간,/n얼마나 아름다운 미소로 반겨줄지 상상하며./n/n그런데도 망설이고, 두려움에 휩싸인 채,/n시간은 조용히 흘러가네./n/n이 마음을 전하고 싶은데 말이 쉽지 않아,/n한없이 흘러가는 세월에 묻어나는 내 마음./n/n우리의 이야기, 언젠가는 시작될 것 같아,/n꽃이 피듯이 아름다운 사랑의 꿈을 꾸며.';

let letter = '안녕. 먼저, 용기를 내어 그 마음을 표현한 너에게 박수를 보내고 싶어졌어. 마음을 전하고 싶다는 감정은 언제나 아름다운 것이라고 생각해. 그러나 동시에, 두려움과 망설임이 드는 것도 이해해./n/n내가 바라는 건 네가 마음을 표현하는데 두려움을 극복하고, 상대에게 솔직하게 다가갈 용기를 갖는 것이야. 물론 결과는 어떻든, 그 순간의 결실이 네게 새로운 경험을 안겨줄 거야. 어떤 선택이든, 네가 행복하길 바라고 있어./n/n그리고 너의 감정을 이해해주는 사람들이 꼭 주변에 있다는 걸 잊지 마. 그들은 너를 지지하고, 네 곁에 있을 거야. 고민이나 어려움이 있으면 언제든 나에게 이야기해도 돼./n/n계속해서 용기 내어 나아가고, 자신을 더 알아가는 여정을 즐기길 바라고 있어./n/n언제든 말해줘.'

let IMAGE_COUNT = 79;

export default ({ route }) => {
  let { input, type } = route.params;
  let [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * (IMAGE_COUNT-1)) + 1);
  let [poem, setPoem] = useState('');
  let [letter, setLetter] = useState('');

  useEffect(() => {
    let headers = {
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'changeOrigin': true
    };
    fetchEventSource('/' + type, {
		method: 'POST',
        headers,
		body: JSON.stringify({ input }),
		onmessage: event => {
            let data = JSON.parse(event.data);
            if (data.data === '[DONE]') {
                return;
            }
            let content = data.message.content;
            if (event.event === 'result') {
                setPoem(content);
                content = content.replaceAll('\n', '\\n');
                fetchEventSource(`/${type}/letter`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({ input, content }),
                    onmessage: event => {
                        let data = JSON.parse(event.data);
                        if (data.data === '[DONE]') {
                            return;
                        }
                        let content = data.message.content;
                        if (event.event === 'result') {
                            setLetter(content);
                        } else {
                            setLetter(letter => letter + content);
                        }
                    }
                });
            } else {
                setPoem(poem => poem + content);
            }
        }
	});
  }, []);

  return (
    <View style={styles.container}>
        <View style={[styles.thumbnail, styles.box]}>
          <Image source={require(`../assets/bk_img/${randomIndex}.jpg`)} style={styles.thumbnailImage} />
        </View>

        <View style={styles.myQuestion}>
          <View style={[styles.box, styles.myQuestionBox]}>
            <Text style={[styles.title, styles.myQuestionTitle]}>나의 고민</Text>
            <Text>{input}</Text>
          </View>
        </View>

        <View style={[styles.answerTxt, styles.box]}>
          <Text style={[styles.title, styles.answerTitle]}>시</Text>
          <Text>{poem}</Text>
        </View>

        <View style={[styles.answerMessage, styles.box]}>
          <View style={[styles.title, styles.messageTitle]}>곰곰시인의 편지</View>
           <Text>{letter}</Text>
        </View>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(191, 225, 192)',
    backgroundImage: 'radial-gradient(rgb(127 197 129) 25%, transparent 0), radial-gradient(rgb(127 197 129) 25%, transparent 0)',
    backgroundPosition: '0 0, 40px 40px',
    backgroundSize: '80px 80px'
  },
  box: {
    width: '270px',
    backgroundColor: 'rgb(247, 247, 247)',
    borderRadius: '7px',
    textAlign: 'center',
    margin: 'auto',
    marginTop: '15px'
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
    marginTop: '20px',
    width: '270px',
    height: '300px',
    textAlign: 'center',
    alignItems: 'center',
    lineHeight: '290px'
  },
  thumbnailImage: {
    width: '100%',  // 이미지를 가득 채우도록 설정
    height: '100%', // 이미지를 가득 채우도록 설정
    resizeMode: 'cover', // 이미지 비율 유지 및 여백 채우기
    borderRadius: 7,
  },
  myQuestionBox: {
    padding: '15px',
    marginTop: '30px'
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
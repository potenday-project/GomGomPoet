import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Tab from "./Tab";
import { Dimensions } from "react-native";
// import { data } from "./Data";
import { styles } from "./Style";

const windowWidth = Dimensions.get("window").width;
const roundBoxWidthPercentage = 90;

export default ({ navigation }) => {
  const [data, setData] = useState([]);

  const roundBoxWidth = (windowWidth * roundBoxWidthPercentage) / 100;

  const handlePressDetailBtn = (data) => {
    navigation.navigate('Comfort', data);
  }

  useEffect(() => {
    fetch('/history')
      .then(res => res.json())
      .then(res => setData(res))
  }, []);

  return (
    <View style={styles.view}>
      <SafeAreaView
        style={styles.safeAreaContainer}
        edges={["top", "right", "bottom", "left"]}
      >
        {/*
        <View style={styles.header}>
          <Text style={styles.headerText}>히스토리</Text>
        </View>
        <View style={styles.headerSeparator}></View>
  */}
        <View style={styles.containerCenterMiddle}>
          <FlatList
            data={data}
            height="100%"
            style={styles.totalListbox}
            contentContainerStyle={styles.itemList}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.itemContainer,
                  { minWidth: roundBoxWidth }, // roundBoxWidth를 minWidth로 설정
                ]}
              >
                <View style={styles.contentContainer}>
                  <View style={styles.circleImage}>
                    <Image source={require(`../assets/tnl_img/${item.image}.jpg`)} style={styles.userImage} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={[styles.title, styles.defaultFont]}>{item.date.replace(/T.+/, '')}</Text>
                    <Text style={[styles.description, {width: '170px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}, styles.defaultFont]}>{item.input}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { position: 'relative', right: '40px' }]} onPress={() => handlePressDetailBtn(item)}>
                      <Text style={styles.defaultFont}>상세보기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
      <View style={{marginTop: -10}}>
        <Tab navigation={navigation} idx={2} />
      </View>
    </View>
  );
};

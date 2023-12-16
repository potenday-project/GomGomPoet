import React, { useState } from "react";
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
import { data } from "./Data";
import { styles } from "./Style";

const windowWidth = Dimensions.get("window").width;
const roundBoxWidthPercentage = 90;

export default ({ navigation }) => {
  const roundBoxWidth = (windowWidth * roundBoxWidthPercentage) / 100;

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
                    <Image source={item.image} style={styles.userImage} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.date}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                      <Text></Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
      <Tab navigation={navigation} idx={2} />
    </View>
  );
};

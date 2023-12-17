import React, { useState } from "react";
import { styles } from "./Style";
import { Text, Image, View, TouchableOpacity } from "react-native";

const TabButton = ({ label, idx, isSelected, onPress }) => {
  let iconSource;
  if (idx === 0) {
    iconSource = isSelected
      ? require("../assets/home-fill.png")
      : require("../assets/home-line.png");
  } else if (idx === 1) {
    iconSource = isSelected
      ? require("../assets/pencil-fill.png")
      : require("../assets/pencil-line.png");
  } else if (idx === 2) {
    iconSource = isSelected
      ? require("../assets/inbox-2-fill.png")
      : require("../assets/inbox-2-line.png");
  } else {
    iconSource = isSelected
      ? require("../assets/pencil-fill.png")
      : require("../assets/pencil-line.png");
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.tabButton]}>
      <Image source={iconSource} />
      <Text
        style={[
          styles.tabButtonText,
          isSelected ? styles.tabButtonTextSelected : null,
          styles.defaultFont
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ({ navigation, idx = 0, disabled }) => {
  const [selectedTabIdx, setSelectedTabIdx] = useState(idx);
  const handlePressButton = (_idx) => {
    switch (_idx) {
      case 0:
        navigation.navigate("Confide");
        break;
      case 1:
        navigation.navigate("Comfort");
        break;
      case 2:
        navigation.navigate("History");
        break;
      // case 3:
      //   navigation.navigate("Mypage");
      //   break;

      default:
        break;
    }
  };

  return (
    <View style={styles.tabBar}>
      <TabButton
        label="고민해결"
        idx={0}
        isSelected={selectedTabIdx === 0}
        onPress={() => {
          if (!(selectedTabIdx === 0 && disabled)) {
            handlePressButton(0);
          }
        }}
      />
      {/* <TabButton
        label="Tab 2"
        idx={selectedTabIdx}
        isSelected={selectedTabIdx === 1}
        onPress={() => handlePressButton(1)}
      /> */}
      <TabButton
        label="자랑하기"
        idx={2}
        isSelected={selectedTabIdx === 2}
        onPress={() => {
          if (!(selectedTabIdx === 2 && disabled)) {
            handlePressButton(2);
          }
        }}
      />
      {/* <TabButton
        label="Tab 4"
        idx={3}
        isSelected={selectedTabIdx === 3}
        onPress={() => handlePressButton(3)}
      /> */}
    </View>
  );
};

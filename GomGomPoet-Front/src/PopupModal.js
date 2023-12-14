import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Image } from "react-native";
import { styles } from "./Style";

const PopupModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require("../assets/test1.png")}
              style={styles.modalHelpImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PopupModal;

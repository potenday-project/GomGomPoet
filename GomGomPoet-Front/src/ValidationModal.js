import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "./Style";

const PopupModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={() => onClose(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={[styles.text, { textAlign: "center" }, styles.defaultFont]}
            >
              고민을 10자 이상 입력해주세요.
            </Text>
            <View style={[styles.containerCenter, { marginTop: 10 }]}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => onClose(true)}
                  style={[
                    styles.button,
                    {
                      width: 100,
                      backgroundColor: "#e4eeff",
                      borderRadius: "5px",
                    },
                  ]}
                >
                  <Text style={[styles.buttonText, styles.defaultFont]}>
                    확인
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PopupModal;

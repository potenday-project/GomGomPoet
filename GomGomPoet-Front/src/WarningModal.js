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
              모든 사용자에게 고민, 답변이 보여지게 됩니다
            </Text>
            <Text
              style={[styles.text, { textAlign: "center" }, styles.defaultFont]}
            >
              자랑하시겠습니까?
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
                    예
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onClose(false)}
                  style={[
                    styles.button,
                    {
                      width: 100,
                      backgroundColor: "#ffe4f4",
                      borderRadius: "5px",
                    },
                  ]}
                >
                  <Text style={[styles.buttonText, styles.defaultFont]}>
                    아니오
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

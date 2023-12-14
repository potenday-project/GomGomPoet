import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "white",
  },
  safeAreaContainer: {
    flex: 1,
  },
  // 중앙, 가운데 정렬
  containerCenterMiddle: {
    flex: 1,
    alignItems: "center", // 수평 중앙 정렬
    justifyContent: "center", // 수직 중앙 정렬
  },
  // 가운데 정렬
  containerCenter: {
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#404040",
  },
  input: {
    height: 240,
    width: "90%",
    marginTop: 10,
    paddingHorizontal: 8,
    backgroundColor: "#F6FAF4",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#0dc56c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 5, // 버튼 사이의 간격을 설정
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  // 헤더
  header: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row", // 가로로 요소를 나열
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  headerSeparator: {
    marginTop: 6,
    height: 1, // 선의 높이
    backgroundColor: "#E0E0E0", // 선의 색상
  },

  // Confide.js
  helpImage: {
    width: 24, // 적절한 크기로 조정
    height: 24, // 적절한 크기로 조정
  },
  gomgomImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center", // 수평 중앙 정렬
    alignItems: "center", // 수직 중앙 정렬
  },
  gomgomImage: {
    backgroundColor: "#FFFCCC",
    width: "100%", // 이미지를 부모 컨테이너의 크기에 맞게 조정
    height: "100%", // 이미지를 부모 컨테이너의 크기에 맞게 조정
    resizeMode: "cover",
    borderRadius: 100,
  },
  // History.js
  itemList: {
    justifyContent: "space-between", // 가로 정렬을 시작으로 설정
  },
  itemContainer: {
    marginVertical: 8,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row", // 가로 방향으로 요소를 나열
    // alignItems: "center", // 가운데 정렬
  },
  circleImage: {
    flex: 0.2,
    backgroundColor: "#fff",
    borderRadius: 100,
    width: 40, // 원하는 크기로 조정
    height: 40, // 원하는 크기로 조정
    overflow: "hidden",
    marginLeft: 10,
    marginRight: 10,
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 0.6, // 남은 공간을 모두 차지하도록 설정
  },
  title: {
    fontSize: 14,
    marginBottom: 2,
  },
  description: {
    fontSize: 16,
  },
  buttonContainer: {
    flex: 0.2,
    flexDirection: "row", // 가로 방향으로 요소를 나열
    alignItems: "center", // 가운데 정렬
  },
  // 탭
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#F9F9F9",
    paddingVertical: 10,
    marginBottom: 5,
    borderTopColor: "#E0E0E0",
    borderTopWidth: 1, // 맨 위에 선을 추가
  },
  tabButton: {
    flex: 1,
    marginTop: -10,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#F9F9F9",
  },
  tabButtonText: {
    fontWeight: "bold",
    color: "black",
  },
  tabButtonTextSelected: {
    color: "blue", // 선택된 탭의 텍스트 색
  },
  // 모달
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 어두운 배경 색
  },
  modalHelpImage: {
    width: "90%",
    height: undefined,
    aspectRatio: 1,
  },
});

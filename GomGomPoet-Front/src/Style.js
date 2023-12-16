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
    backgroundColor: 'rgb(191, 225, 192)',
    backgroundImage: 'radial-gradient(rgb(127 197 129) 25%, transparent 0), radial-gradient(rgb(127 197 129) 25%, transparent 0)',
    backgroundPosition: '0 0, 40px 40px',
    backgroundSize: '80px 80px'
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
    marginTop: 10,
    marginBottom: 0,
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


  shareImageContainer: {
    width: '80%', // 이미지 컨테이너 너비를 100%로 설정
    alignItems: 'center', // 중앙 정렬
  },
  shareImage: {
    width: '80%', // 이미지 너비를 90%로 설정
    height: 200, // 원하는 높이로 설정
    justifyContent: 'center', // 이미지 내 텍스트를 중앙에 정렬
  },
  shareImageText: {
    textAlign: 'center', // 텍스트를 중앙 정렬
    color: 'white', // 텍스트 색상을 설정
    fontSize: 18, // 텍스트 크기를 설정
    fontWeight: 'bold', // 글꼴 두께 설정
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // 텍스트 배경색 설정
    padding: 100, // 텍스트 주변 패딩 설정
  },
  scrollView: {
    flex: 1, // 스크롤 뷰가 모달의 나머지 공간을 채우도록 함
  },

  circleButton: {
    width: 40, // 원하는 크기로 조절
    height: 40, // 원하는 크기로 조절
    borderRadius: 20, // width / 2 로 설정하여 완벽한 원을 만듦
    marginHorizontal: 5, // 버튼 사이의 간격
    // 버튼에 그림자나 다른 스타일을 추가할 수 있습니다.
  },

  logoImageContainer: {
    width: 200,
    height: 70,
    justifyContent: 'center'
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});

const mongoose = require("mongoose");

// Schema 정의
const userSchema = new mongoose.Schema(
  {
    username: String,
    userID: String,
    poneNumber: String,
    email: String,
    password: String,
    time: String,
  },
  {
    versionKey: false,
  }
);

// 클래스 정의
class userClass {
  // 문서 수준의 작업을 위한 메서드
  async hi(i) {
    try {
      console.log("Basic-Setting");
      if (i === 0) {
        console.log("i === 0");
      } else {
        console.log("i ==! 0");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

// 클래스 메서드 연결
userSchema.loadClass(userClass);

// 모델 생성
const User = mongoose.model("Basic-Setting-User", userSchema);

module.exports = User;

const { ref } = require("joi");
const UserRepository = require("../repositories/users.repository");
const TokenRepository = require("../repositories/tokens.repository");
const jwt = require("jsonwebtoken");

class UserService {
  userRepository = new UserRepository();
  tokenRepository = new TokenRepository();

  // 중복되는 닉네임 찾기
  findNickname = async (nickname) => {
    const existNickname = await this.userRepository.findNickname(nickname);
    return existNickname;
  };

  // 중복되는 이메일 찾기
  findEmail = async (email) => {
    const existEmail = await this.userRepository.findEmail(email);
    return existEmail;
  };

  // 회원가입
  signup = async (
    nickname,
    password,
    email,
    location,
    profile_image,
    introduction
  ) => {
    const signupData = await this.userRepository.signup(
      nickname,
      password,
      email,
      location,
      profile_image,
      introduction
    );
    return signupData;
  };

  // 회원탈퇴 API
  deleteSignup = async (user_id) => {
    await this.userRepository.deleteSignup(user_id);
    return;
  };

  // 로그인 가능한 회원인지 확인
  loginUser = async (nickname) => {
    const loginUser = await this.userRepository.login(nickname);
    return loginUser;
  };

  // accessToken 생성
  createAccessToken = async (loginUser) => {
    const { user_id } = loginUser;
    const accessToken = jwt.sign({ user_id: user_id }, process.env.ACCESS_KEY, {
      expiresIn: process.env.ACCESS_EXPIRES,
    });
    return accessToken;
  };
  // refreshToken 생성
  createRefreshToken = async () => {
    const refreshToken = jwt.sign({}, process.env.REFRESH_KEY, {
      expiresIn: process.env.REFRESH_EXPIRES,
    });
    return refreshToken;
  };

  // Tokens table에 refresh token 저장
  saveToken = async (loginUser, refreshToken) => {
    const { user_id } = loginUser;
    await this.tokenRepository.saveToken(user_id, refreshToken);
  };

  // logout 했을 때, token 삭제
  logout = async (user_id) => {
    await this.tokenRepository.deleteToken(user_id);
    return;
  };
}

module.exports = UserService;

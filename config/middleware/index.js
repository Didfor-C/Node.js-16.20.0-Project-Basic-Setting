const express = require("express");
const helmet = require("helmet"); // 기본 보안 설정을 위해
const morgan = require("morgan"); // HTTP 요청 로깅을 위해
var cookieParser = require("cookie-parser");

module.exports = (app) => {
  // Helmet을 사용하여 보안을 위한 몇 가지 HTTP 헤더 설정
  /**
   * CSP: XSS 공격 방지를 위해 콘텐츠 로딩 제한.
   * X-DNS-Prefetch-Control: DNS 프리페치 동작 제어.
   * Expect-CT: Certificate Transparency 강제.
   * X-Frame-Options: 클릭 잭킹 방지를 위해 프레임 내 렌더링 제한.
   * X-Powered-By: 사용 기술 정보 숨김.
   * HSTS: HTTPS만 허용.
   * X-Download-Options: 자동 다운로드 방지.
   * X-Content-Type-Options: MIME 스니핑 방지.
   * X-Permitted-Cross-Domain-Policies: 어도비 제품의 도메인 간 데이터 로드 정책 설정.
   * Referrer-Policy: Referrer 정보 제어.
   */
  app.use(helmet());

  // 로깅을 위해 morgan 사용
  app.use(morgan("combined"));
  //app.use(morgan("dev"));

  // 클라이언트 쿠키 파싱 --> req.cookies 객체에 저장
  app.use(cookieParser());

  // JSON 요청 본문 파싱
  app.use(express.json());
  // URL 인코딩된 요청 본문을 파싱 --> req.body에 저장
  app.use(express.urlencoded({ extended: false }));
  // 정적 파일을 제공 가능한 Express의 기본 제공 미들웨어 함수
  app.use(express.static("public"));
  //app.use(express.static(path.join(__dirname, "public")));

  console.log("Middleware setup Done");
};

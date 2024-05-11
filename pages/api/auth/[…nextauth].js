import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),

    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: { label: "아이디 or 이메일", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const connection = await mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "",
        });

        try {
          const [rows, fields] = await connection.execute(
            "SELECT * FROM altuser WHERE loginId = ? OR email = ?",
            [credentials.login, credentials.login]
          );

          if (rows.length === 0) {
            console.log("해당 로그인 ID 또는 이메일은 없음");
            return null;
          }

          const user = rows[0];

          const pwcheck = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!pwcheck) {
            console.log("비밀번호가 일치하지 않음");
            return null;
          }

          return user;
        } catch (error) {
          console.error("인증 중 오류 발생:", error);
          return null;
        }
      },
    }),
  ],
  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  secret: "tjdwl123123123",
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);

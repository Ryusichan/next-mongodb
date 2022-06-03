import React, { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { useCurrentUser } from "@/hooks/index";

const SignupPage = () => {
  const [user, { mutate }] = useCurrentUser();
  const [errorMsg, setErrorMsg] = useState("");

  // 로그인되어있으면 메인페이지로 이동
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.replace("/");
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
    };
    // fetch 하는 REST API 주소
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    //201 가입하기 작동이 잘 됐을 경우, 가입한 user 정보를 userObj에 리턴받아서 mutate함수로 현재의 사용자 정보를 업데이트하는 형식
    if (res.status === 201) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold mb-5">가입하기</h1>
        <div className="col-lg-6 mx-auto">
          <form onSubmit={handleSubmit}>
            {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
            <div className="form-floating mb-2">
              <input
                id="name"
                type="text"
                name="name"
                className="form-control"
                placeholder="이름"
              />
              {/* @ts-ignore */}
              <label forhtml="name">이름</label>
            </div>
            <div className="form-floating mb-2">
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="이메일 주소"
              />
              {/* @ts-ignore */}
              <label forhtml="email">이메일 주소</label>
            </div>
            <div className="form-floating mb-2">
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="비밀번호"
              />
              {/* @ts-ignore */}
              <label forhtml="password">비밀번호</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">
              가입하기
            </button>
          </form>
          <button
            type="button"
            className="w-100 btn btn-lg btn-secondary px-4 gap-3"
            onClick={() => Router.replace("/")}
          >
            홈으로
          </button>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

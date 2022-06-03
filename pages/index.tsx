import React from "react";
import Link from "next/link";
import { useCurrentUser } from "../hooks/index";

export default function IndexPage() {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    mutate(null);
  };

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">
        {user ? user.name : "stranger"} 님 반갑습니다.
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mt-4 mb-4 fw-normal">
          NextJS와 MongoDB를 이용한 로그인 세션 구현 샘플입니다.
          <br />
          계정이 있으시면 아래 로그인 버튼을 누르시고,
          <br />
          없으시면 가입하기 버튼을 눌러 계정을 만드십시요.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          {user ? (
            <button
              type="button"
              className="btn btn-primary btn px-4 gap-3"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          ) : (
            <button type="button" className="btn btn-primary btn px-4 gap-3">
              <Link href="/login">로그인</Link>
            </button>
          )}
          <button type="button" className="btn btn-outline-secondary btn px-4">
            <Link href="/signup">가입하기</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

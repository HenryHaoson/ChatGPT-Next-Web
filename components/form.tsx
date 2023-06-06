"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./home.module.scss";
import { IconButton } from "./button";
import { showToast } from "./ui-lib";
import { hFetch } from "@/app/utils/fetch";

export default function Form({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === "login") {
          signIn("credentials", {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(({ ok, error }) => {
            setLoading(false);
            if (!error) {
              router.push("/");
            } else {
              showToast(error)
            }
          });
        } else {
          hFetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            }),
          }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
             showToast("注册成功，正在跳转到首页");
              setTimeout(() => {
                router.push("/");
              }, 2000);
            } else {
              showToast(await res.text());
            }
          });
        }
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="邮箱地址"
          className="block text-xs text-gray-600 uppercase"
        >
          邮箱地址
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="邮箱地址"
          autoComplete="email"
          required
          className={styles["chat-input"]}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          密码
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className={styles["chat-input"]}
        />
      </div>
      <IconButton
      text={type === "login" ? "登录" : "注册"}
      />
      {type === "login" ? (
        <p className="text-center text-sm text-gray-600">
         还没有账号？{" "}
          <Link href="/register" className="font-semibold text-gray-800">
            注册
          </Link>
        
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          已经有账号了?{" "}
          <Link href="/login" className="font-semibold text-gray-800">
            登录
          </Link>
        </p>
      )}
    </form>
  );
}

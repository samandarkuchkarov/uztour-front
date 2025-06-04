"use client";
import useStore from "@/store/useStore";
import styles from "./page.module.css";

export default function Home() {
  const user = useStore((state) => state.user);
  console.log(user);
  return (
    <div>
      <div></div>
    </div>
  );
}

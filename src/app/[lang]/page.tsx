"use client";
import useStore from "@/store/useStore";
import styles from "./page.module.css";
import Transfer from "../components/Transfer";
import ExcursionList from "../components/ExcursionList";
import { excursions } from "@/consts";

export default function Home() {
  const user = useStore((state) => state.user);
  return (
    <div>
      <Transfer />
      <ExcursionList title="Популярные экскурсии" data={excursions} />
    </div>
  );
}

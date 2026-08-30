"use client";
import { useState } from "react";

import s from "./drop-down.module.scss";
import { ChevronDown } from "../icons/chevron-down/chevron-down";
import { InfoCard } from "@/shared/data/info-cards-data";
import Link from "next/link";

type PropsData = {
  data: InfoCard[];
};

export const DropDown = ({ data }: PropsData) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={s.dictionarySelect}>
      <div onClick={() => setIsOpen(!isOpen)} className={s.selectedVariant}>
        <span>Tools</span>
        <ChevronDown />
      </div>

      <div className={`${s.selectVariants} ${isOpen ? s.open : ""}`}>
        {data.map((link, index) => (
          <Link
            href={link.link}
            key={index}
            onClick={() => {
              setIsOpen(false);
            }}
            className={s.dictionariesVariant}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

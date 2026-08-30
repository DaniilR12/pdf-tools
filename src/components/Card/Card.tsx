import Link from "next/link";
import s from "./Card.module.scss";
import { ReactNode } from "react";
import { ArrowLongRight } from "@/shared/ui/icons";

type CardProps = {
  link: string;
  imageOne: ReactNode;
  imageTwo: ReactNode;
  name: string;
  description: string;
};

export const Card = ({
  link,
  imageOne,
  imageTwo,
  name,
  description,
}: CardProps) => {
  return (
    <Link href={link} className={s.cardLink}>
      <div className={s.cardContainer}>
        <div className={s.iconsContainer}>
          <div className={s.icons}>{imageOne}</div>
          <ArrowLongRight />
          <div className={s.icons}>{imageTwo}</div>
        </div>
        <div className={s.textInfoContainer}>
          <h4 className={s.name}>{name}</h4>
          <p className={s.description}>{description}</p>
        </div>
        <span className={s.button}>
          Open tool <ArrowLongRight />
        </span>
      </div>
    </Link>
  );
};

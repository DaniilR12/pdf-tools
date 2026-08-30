import { Card } from "@/components/Card/Card";
import s from "./page.module.scss";
import Illustration from "./(ui)/(image)/illustration.png";
import Image from "next/image";
import { INFO_CARDS } from "@/shared/data/info-cards-data";

export default function Home() {
  return (
    <div className={s.page}>
      <main className={s.main}>
        <section className={s.bannerContainer}>
          <div className={s.bannerCopy}>
            <span className={s.eyebrow}>FILE WORKSPACE</span>
            <h1>Simple tools for your files</h1>
            <p>Convert, extract and transform PDF and image files online.</p>
            <a className={s.primaryAction} href="#tools">
              Explore tools
            </a>
          </div>
          <div className={s.illustrationFrame}>
            <Image
              className={s.imageBanner}
              src={Illustration}
              alt="Illustration"
            />
          </div>
        </section>
        <section className={s.toolsSection} id="tools">
          <div className={s.sectionHeading}>
            <div>
              <span className={s.eyebrow}>YOUR TOOLKIT</span>
              <h2>What would you like to make?</h2>
            </div>
            <p>Five focused tools. No clutter.</p>
          </div>
          <div className={s.intro}>
            {INFO_CARDS.map((info, index) => (
              <Card
                description={info.description}
                imageOne={info.imageOne}
                imageTwo={info.imageTwo}
                link={info.link}
                name={info.name}
                key={index}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

import HeaderCosmetics from "@src/components/HeaderCosmetics";
import React from "react";
import img1 from "@assets/images/research/0043.jpg";
import img2 from "@assets/images/research/0044.jpg";
import img3 from "@assets/images/footer-icons.png";
import img4 from "@assets/images/research/0046.jpg";
import img5 from "@assets/images/research/0047.jpg";
import img6 from "@assets/images/research/0048.jpg";
import img7 from "@assets/images/research/0049.jpg";
import img8 from "@assets/images/research/0050.png";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import FooterCosmetics from "@src/components/FooterCosmetics";
import NewFooter from "@src/components/new_footer";

function index() {
  return (
    <div>
      <HeaderCosmetics />
      <div
        className="container my-20"
        style={{ width: "90%", margin: "auto" }}
      >
        <div className=" py-20">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/Q1vW06j_1U8?si=6mLv2nOCcOefSoCX"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div className="py-20 flex flex-col md:flex-row  gap-40 mb-40">
          <div className="md:w-3/5 text-[#1b251f] flex flex-col justify-center">
            <p className="text-xl font-semibold">
              Research jargon can sometimes be overwhelming and difficult to
              breakdown. We don't expect you to know or understand all the
              science we employ to give you the very best through our work at
              Matxin Labs Pvt Ltd. We will not hide behind complex terminology
              and try to sound smart - instead, we'll break it down for you.
            </p>
            <p className="text-lg my-20">
              There are two major fields that we utilise to develop our personal
              care:
            </p>
            <div className="text-lg">
              <div className="flex items-center gap-4 mb-4 ">
                <div>
                  <CircleCheck strokeWidth={1} size={35} />
                </div>
                <div>
                  <p>
                    Pharmacognosy or the study of the physical, chemical,
                    biochemical and biological properties of substances obtained
                    from natural origin and plant sources
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <CircleCheck strokeWidth={1} size={35} />
                </div>
                <div>
                  <p>
                    Cosmetology or the knowledge and study of application of
                    treatments in skin care, hair care & body care
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-2/5 grid place-items-center">
            <Image src={img1} alt="img" className="w-auto h-full rounded-md" />
          </div>
        </div>
        <div className="py-20 flex flex-row-reverse gap-40">
          <div className="md:w-3/5 text-[#1b251f] flex flex-col justify-center">
            <p className="text-xl font-semibold">
              {" "}
              We're research oriented meaning we like to closely examine natural
              sources to formulate dermatology grade personal care for you. No
              product reaches its final stages without clinical testing and
              trials first. A strong sense of well-being and a healthy
              sustainable lifestyle is our motivation behind every creation at
              our labs.
            </p>
            <p className="text-lg my-20">
              To ensure high standards of quality the following quality
              processes are followed in manufacturing:
            </p>
            <div className="text-lg">
              <Image
                src={img3}
                alt="img"
                className="w-full h-full rounded-md hidden md:block"
              />
              <Image
                src={img8}
                alt="img"
                className="w-full h-full rounded-md md:hidden"
              />
            </div>
          </div>
          <div className="w-2/5 md:grid place-items-center hidden">
            <Image src={img2} alt="img" className="w-auto h-full rounded-md" />
          </div>
        </div>
        <div className="my-[4rem] grid gap-8 md:grid-cols-2 md:gap-x-[10rem] md:gap-y-20">
          <Image src={img4} alt="img" className="w-full h-full rounded-md" />
          <Image src={img5} alt="img" className="w-full h-full rounded-md" />
          <Image src={img6} alt="img" className="w-full h-full rounded-md" />
          <Image src={img7} alt="img" className="w-full h-full rounded-md" />
        </div>
      </div>
      <FooterCosmetics />
    </div>
  );
}

export default index;

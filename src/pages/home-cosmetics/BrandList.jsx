import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

import br1 from "@assets/images/home-cosmetics/br1.png";
import br2 from "@assets/images/home-cosmetics/br2.png";
import br3 from "@assets/images/home-cosmetics/br3.png";
import br4 from "@assets/images/home-cosmetics/br4.png";
import br5 from "@assets/images/home-cosmetics/br5.png";

const brand = [
  {
    id: 1,
    pic: "https://mitvana.com/wp-content/uploads/2022/06/2.svg",
    desc: "Cruelty Free",
  },
  {
    id: 2,
    pic: "https://mitvana.com/wp-content/uploads/2022/06/3.svg",
    desc: "Ancient Wisdom Modern Science",
  },
  {
    id: 3,
    pic: "https://mitvana.com/wp-content/uploads/2022/07/51-600x600.png",
    desc: "Natural Actives",
  },
  { id: 4, pic: "https://mitvana.com/wp-content/uploads/2022/06/5.svg" ,desc : "Free From Harmful Chemicals" },
  {
    id: 5,
    pic: "https://mitvana.com/wp-content/uploads/2022/07/5-1-600x600.png", desc : "Made with Love"
  },
];

const BrandList = () => {
  const flickityRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Flickity
      const FlickityClass = require("flickity");
      flickityRef.current = new FlickityClass(".blog-slideshow", {
        imagesLoaded: false,
        adaptiveHeight: false,
        contain: true,
        groupCells: "100%",
        dragThreshold: 5,
        cellAlign: "left",
        wrapAround: true,
        prevNextButtons: false,
        percentPosition: true,
        pageDots: false,
        autoPlay: false,
        pauseAutoPlayOnHover: true,
      });
    }
    // Cleanup Flickity on unmount
    return () => {
      if (flickityRef.current) {
        flickityRef.current.destroy();
      }
    };
  }, []);

  return (
    <React.Fragment>
      <section className="kellas-medical-brand-list py-5 position-relative">
        <Container>
          <div
            className="row justify-content-between d-flex align-items-center blog-slideshow"
            dir="ltr"
          >
            {brand.map((item) => (
              <div className="col-6 col-sm-4 w-lg-20 brand-item" style={{
                display:"flex",
                alignItems:"center",
                flexDirection:"column"
              }} key={item.id}>
                <Link href="#!">
                  <img
                    src={item.pic}
                    alt=""
                    height="150px"
                    width="150px"
                    className="img-fluid max-w-200 mx-auto d-block"
                  />
                  <p className="text-center text-lima">{item.desc}</p>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};
export default BrandList;

import React from 'react'
import MainSlide from '@pages/home-jewelry/MainSlide'
import CatSection from '@pages/home-jewelry/CatSection'
import Cards from '@pages/home-jewelry/Cards'
import Blogs from '@pages/home-jewelry/Blogs'
import Shipping from '@pages/home-jewelry/Shipping'
import FooterPage from '@src/components/Footer'
import InstaSection from '@pages/home-jewelry/InstaSection'
import OurBestSelling from '@pages/home-jewelry/OurBestSelling'
import OurTrending from '@pages/home-jewelry/OurTrending'
import HomeJewelryHeader from '@src/components/Headers/HomeJewelryHeader'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeJewelry = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Jewelry" />
            <div className="jewelry-home">

                <HomeJewelryHeader />

                {/* main slide */}
                <MainSlide />

                {/* cat section */}
                <CatSection />

                {/* our best selling */}
                <OurBestSelling />

                {/* cards */}
                <Cards />

                {/* our trendings */}
                <OurTrending />

                {/* blogs */}
                <Blogs />

                {/* insta */}
                <InstaSection />

                {/* shipping */}
                <Shipping />

                {/* Footer */}
                <FooterPage />

            </div>
        </React.Fragment>
    )
}

export default HomeJewelry
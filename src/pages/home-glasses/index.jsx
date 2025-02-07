import React, { useEffect } from 'react'
import HomeSection from '@pages/home-glasses/HomeSection';
import CatSection from '@pages/home-glasses/CatSection';
import Products from '@pages/home-glasses/Products';
import ShippingInfo from '@pages/home-glasses/ShippingInfo';
import LatestNews from '@pages/home-glasses/LatestNews';
import GlassesList from '@pages/home-glasses/GlassesList';
import FooterDark from '@src/components/FooterDark';
import HeaderGlasses from '@src/components/HeaderGlasses';
import TopBanner from '@src/components/Headers/TopBanner';
import HeadTitle from '@src/commonsections/HeadTitle';

const HomeGlasses = () => {

    useEffect(() => {
        document.body.classList.add('font-raleway');
        return () => {
            document.body.classList.remove('font-raleway');
        };
    }, []);


    return (
        <React.Fragment>
            <HeadTitle title="Home Glasses" />
            <TopBanner topclass="navbar-glass" />

            <HeaderGlasses />

            <div>
                {/* main slide */}
                <HomeSection />

                {/* double cat */}
                <CatSection />

                {/* our products */}
                <Products />

                {/* shipping info */}
                <ShippingInfo />

                {/* latest news */}
                <LatestNews />

                {/* glasses list */}
                <GlassesList />

                {/* Footer */}
                <FooterDark />
            </div>
        </React.Fragment>
    )
}

export default HomeGlasses
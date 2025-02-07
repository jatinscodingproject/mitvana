import React from 'react'
import HomeSection from '@pages/home-lingeries/HomeSection';
import OurStory from '@pages/home-lingeries/OurStory';
import NewArrivals from '@pages/home-lingeries/NewArrivals';
import TrandingItems from '@pages/home-lingeries/TrandingItems';
import Blogs from '@pages/home-lingeries/Blogs';
import Brands from '@pages/home-lingeries/Brands';
import Banner from '@pages/home-lingeries/Banner';
import FooterLingeries from '@src/components/FooterLingeries'
import HeaderLingeries from '@src/components/HeaderLingeries';
import HeadTitle from '@src/commonsections/HeadTitle';

const HomeLingeries = () => {

    return (
        <React.Fragment>
            <HeadTitle title="home Lingeries" />
            {/* header */}
            <HeaderLingeries />

            {/* main slide */}
            <HomeSection />

            {/* our story */}
            <OurStory />

            {/* NEW ARRIVALS */}
            <NewArrivals />

            {/* Trandingitems */}
            <TrandingItems />

            {/* popular blog */}
            <Blogs />

            {/* brand */}
            <Brands />

            {/* cards banner */}
            <Banner />

            {/* Footer */}
            <FooterLingeries />

        </React.Fragment>
    )
}

export default HomeLingeries

import React from 'react'
import FollowInstagram from '@src/commonsections/FollowInstagram'
import LatestBlogs from '@src/commonsections/LatestBlogs'
import Ourproduct from '@src/commonsections/Ourproduct'
import Shipping from '@src/commonsections/Shipping'
import Trending from '@src/commonsections/Trending'
import FooterPage from '@src/components/Footer'
import HomeSection from '@pages/home-lookbook/HomeSection'
import CatSection from '@pages/home-lookbook/CatSection'
import Productsale from '@pages/home-lookbook/Productsale'
import TopBanner from '@src/components/Headers/TopBanner'
import PopupPage from '@src/components/Popup'
import Header2 from '@src/components/Header2'
import HeadTitle from '@src/commonsections/HeadTitle'


const HomeLookbook = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Lookbook" />
            
            <TopBanner />


            {/* header */}
            <Header2 />

            <div>
                {/* main */}
                <HomeSection />

                {/* cat section */}
                <CatSection />

                {/* sale */}
                <Productsale />

                {/* trending */}
                <Trending />

                {/* our product */}
                <Ourproduct />

                {/* latest - blog */}
                <LatestBlogs />

                {/* instagram */}
                <FollowInstagram />

                {/* shipping */}
                <Shipping />

                {/* footer */}
                <FooterPage />

                <PopupPage />
            </div>
        </React.Fragment>
    )
}

export default HomeLookbook
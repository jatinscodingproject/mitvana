import React from 'react'
import ProductSale from '@pages/home-categories-links/ProductSale'
import Trending from '@src/commonsections/Trending'
import Ourproduct from '@src/commonsections/Ourproduct'
import LatestBlogs from '@src/commonsections/LatestBlogs'
import FollowInstagram from '@src/commonsections/FollowInstagram'
import Shipping from '@src/commonsections/Shipping'
import FooterPage from '@src/components/Footer'
import HomeSection from '@pages/home-categories-links/Homesection'
import CatSection from '@pages/home-categories-links/CatSection'
import TopBanner from '@src/components/Headers/TopBanner'
import Header from '@src/components/Headers/Header'
import PopupPage from '@src/components/Popup'
import HeadTitle from '@src/commonsections/HeadTitle'



const HomeCategoriesLink = () => {


    return (
        <React.Fragment>
            <HeadTitle title="Categories Links"/>
            <TopBanner />

            {/* header */}
            <Header />

            <div>
                {/* Home section */}
                <HomeSection />

                {/* cat section */}
                <CatSection />

                {/* sale */}
                <ProductSale />

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
              
                {/* popup */}
                <PopupPage />

            </div>
        </React.Fragment>
    )
}

export default HomeCategoriesLink
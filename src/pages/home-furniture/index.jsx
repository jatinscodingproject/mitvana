import React from 'react'
import HomeSection from '@pages/home-furniture/HomeSection'
import Info from '@pages/home-furniture/Info'
import NewProduct from '@pages/home-furniture/NewProduct'
import RecentProject from '@pages/home-furniture/RecentProject'
import HappyCustomer from '@pages/home-furniture/HappyCustomer'
import FeaturedCollection from '@pages/home-furniture/FeaturedCollection'
import Collection from '@pages/home-furniture/Collection'
import Blogs from '@pages/home-furniture/Blogs'
import NewsLetter from '@pages/home-furniture/NewsLetter'
import FooterFurniture from '@src/components/FooterFurniture'
import PopupPage from '@src/components/Popup'
import HeaderFurniture from '@src/components/HeaderFurniture'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeFurniture = () => {

    return (
        <React.Fragment>
            <HeadTitle title="Home Furniture" />
            {/* header */}
            <HeaderFurniture />

            <div>
                {/* slide */}
                <HomeSection />

                {/* info */}
                <Info />

                {/* collection */}
                <NewProduct />

                {/* recent project  */}
                <RecentProject />

                {/* happy customer testimonial */}
                <HappyCustomer />

                {/* featured-collection */}
                <FeaturedCollection />

                {/* collection */}
                <Collection />

                {/* feature blog */}
                <Blogs />

                {/* newsletter */}
                <NewsLetter />

                {/* footer */}
                <FooterFurniture />

                <PopupPage />
            </div>

        </React.Fragment>
    )
}

export default HomeFurniture
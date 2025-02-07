import React from 'react'
import MainSection from '@pages/home-fashion-trend/MainSection'
import BlogPost from '@pages/home-fashion-trend/BlogPost'
import TrendInsta from '@pages/home-fashion-trend/TrendInsta'
import Shipping from '@src/pages/home-fashion-trend/Shipping'
import FooterTrend from '@src/components/FooterTrend'
import BestSeller from '@pages/home-fashion-trend/BestSeller'
import HomeFashionTrendHeader from '@src/components/Headers/HomeFashionTrendHeader'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeFashionTrend = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Fashion Trend" />
            <div className="home-fashion-trend">

                {/* header */}
                <HomeFashionTrendHeader />
                {/* main */}
                <MainSection />

                {/* best seller */}
                <BestSeller />

                {/* blog post */}
                <BlogPost />

                {/* trend insta */}
                <TrendInsta />

                {/* shipping */}
                <Shipping />

                {/* footer */}
                <FooterTrend />

            </div>
        </React.Fragment>
    )
}

export default HomeFashionTrend
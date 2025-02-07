import React, { useEffect } from 'react'
import HomeSection from '@pages/home-medical/HomeSection';
import Banner from '@pages/home-medical/Banner';
import Categories from '@pages/home-medical/Categories';
import DealSection from '@pages/home-medical/DealSection';
import SellingItems from '@pages/home-medical/SellingItems';
import Brands from '@pages/home-medical/Brands';
import MedicalBlogs from '@pages/home-medical/MedicalBlogs';
import MedicalShippingInfo from '@pages/home-medical/MedicalShippingInfo';
import FooterMedical from '@src/components/FooterMedical';
import HeaderMedical from '@src/components/HeaderMedical';
import PopupPage from '@src/components/Popup';
import HeadTitle from '@src/commonsections/HeadTitle';


const HomeMedical = () => {

    useEffect(() => {
        document.body.classList.add('wrapper_cus', 'font-open-sans');
        return () => {
            document.body.classList.remove('wrapper_cus', 'font-open-sans');
        };
    }, []);

    return (
        <React.Fragment>
            <HeadTitle title="Home Medical" />
            {/* header */}
            <HeaderMedical />

            <div>
                {/* main slide */}
                <HomeSection />

                {/* banner */}
                <Banner />

                {/* categories */}
                <Categories />

                {/* deal-section */}
                <DealSection />

                {/* Best selling items */}
                <SellingItems />

                {/* brand-list section */}
                <Brands />

                {/* kalles-medical-blog-post */}
                <MedicalBlogs />

                {/* medical-shipping-info */}
                <MedicalShippingInfo />

                {/* Footer */}
                <FooterMedical />

                <PopupPage />

            </div>
        </React.Fragment>
    )
}

export default HomeMedical
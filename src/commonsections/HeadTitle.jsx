import Head from "next/head";
import React from "react";

const HeadTitle = ({ title, data }) => {
    return (
        <React.Fragment>
            <Head>
                <title>{title} | The Science of Herbs</title>
                {data}
            </Head>
        </React.Fragment>
    )
}
export default HeadTitle
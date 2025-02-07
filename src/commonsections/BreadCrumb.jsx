import React from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";

const BreadCrumb = ({ title, subTitle, url }) => {
  return (
    <React.Fragment>
      <div className="main-project-section">
        <Container>
          <div className="d-flex justify-content-between align-items-center py-3">
            <nav className="customDiv" aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 fs-13">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href={`/product-category/${url}`}>{title}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {" "}
                  {subTitle}
                </li>
              </ol>
            </nav>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default BreadCrumb;

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Toyota",
      imageUrl: "/departments/toyota.jpg",
    },
    {
      name: "Mahindra",
      imageUrl: "/departments/mahindra.jpg",
    },
    {
      name: "Indigo",
      imageUrl: "/departments/indigo.jpg",
    },
    {
      name: "Nano",
      imageUrl: "/departments/nano.jpg",
    },
    {
      name: "Maruti Suzuki",
      imageUrl: "/departments/maruti.jpg",
    },
    {
      name: "Nissan",
      imageUrl: "/departments/nissan.jpg",
    },
    {
      name: "Mercedes",
      imageUrl: "/departments/mercedes.jpg",
    },
    {
      name: "Swift",
      imageUrl: "/departments/alto.jpg",
    },
    {
      name: "Alto",
      imageUrl: "/departments/alto.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="container departments">
        <h2>Vehicles</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="card">
                <div className="depart-name">{depart.name}</div>
                <img src={depart.imageUrl} alt="Department" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;

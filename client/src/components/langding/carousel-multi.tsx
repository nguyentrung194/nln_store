import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ActionAreaCard } from "../common/card";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const images = [
  "/images/carousel.png",
  "/images/carousel.png",
  "/images/carousel.png",
  "/images/carousel.png",
  "/images/carousel.png",
  "/images/carousel.png",
  "/images/carousel.png",
];

export const CarouselMulti = (props: any) => {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={props.deviceType !== "mobile" ? true : false}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container z-0"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={props.deviceType}
      arrows={true}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {images.map((el) => {
        return <ActionAreaCard image={el} />;
      })}
    </Carousel>
  );
};

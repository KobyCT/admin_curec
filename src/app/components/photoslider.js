import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function PhotoSlider({ images = [] }) {
  return (
    <Carousel>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Image ${index}`} />
          <p className="legend">{index}</p>
        </div>
      ))}
    </Carousel>
  );
}

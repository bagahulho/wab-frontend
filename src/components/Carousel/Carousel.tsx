import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.css';
import Image1 from '../../assets/1.png'
import Image2 from '../../assets/2.png'
import Image3 from '../../assets/3.png'
import Image4 from '../../assets/4.png'

const CarouselComponent: React.FC = () => {
    return (
        <Carousel className="carousel-container">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Image1}
                    alt="Первый слайд"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Image2}
                    alt="Второй слайд"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Image3}
                    alt="Третий слайд"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Image4}
                    alt="Третий слайд"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselComponent;
import React, { useEffect, useState } from "react"
import "./Slider.scss"
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Pagination } from "swiper/modules";

export const Slider = ({ item }) => {
    const [width, setWidth] = useState(window.innerWidth)

    const setImages = () => {
        const oldPagination = document.querySelectorAll('.swiper-pagination-bullet')
        for (let i = 0; i < oldPagination.length; i++) {
            oldPagination[i].classList.add('SmallImg')
            if (!oldPagination[i].hasChildNodes()) {
                oldPagination[i].innerHTML = `<img class="SmallImgStyle" src=${item.img[i].img} alt="Фото товара" />`
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setImages()
            const hasChildNodes = Array.from(document.querySelectorAll('.swiper-pagination-bullet')).every(pagination => pagination.hasChildNodes())
            if (hasChildNodes) {
                clearInterval(interval)
            }
        }, 10)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setImages()
        // eslint-disable-next-line
    }, [width])

    return (
        <>
            {width > 1100 &&
                <>
                    <div className="ItemImagesSmall"></div>
                    <div className="BigImgSliderBox">
                        <div className="BigImgSlider">
                            <Swiper
                                modules={[Pagination]}
                                className="mySwiper"
                                pagination={{
                                    el: '.ItemImagesSmall',
                                    clickable: true
                                }}
                            >
                                {item.img && item.img.map((img, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <img
                                                key={i}
                                                className="BigImg"
                                                src={img.img}
                                                alt="Фото товара"
                                            />
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                </>
            }
            {width <= 1100 &&
                <>
                    <div className="BigImgSliderBox">
                        <div className="BigImgSlider">
                            <Swiper
                                modules={[Pagination]}
                                className="mySwiper"
                                pagination={{
                                    el: '.ItemImagesSmall2',
                                    clickable: true
                                }}
                            >
                                {item.img && item.img.map((img, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <img
                                                key={i}
                                                className="BigImg"
                                                src={img.img}
                                                alt="Фото товара"
                                            />
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                    <div className="ItemImagesSmall2"></div>
                </>
            }
        </>
    )
}
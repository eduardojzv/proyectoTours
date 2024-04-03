// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
// import required modules
import { Navigation, Pagination, Thumbs, FreeMode, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import { useState } from 'react';
export default function SwiperComponent({ images }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                pagination={{ dynamicBullets: true }}
                thumbs={{ swiper: thumbsSwiper }}
                effect={'fade'}
                grabCursor={true}
                modules={[Navigation, Pagination, EffectFade, Thumbs, FreeMode]}
                centeredSlides={true}
                slidesPerView={'auto'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }}
                navigation={true}
                loop={true}
                //onSlideChange={() => console.log('slide change')}
                //onSwiper={(swiper) => console.log(swiper)}
                className='w-full h-96 relative m-4'
            >
                {images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <Image
                            className="rounded-lg"
                            src={img.img}
                            alt={""}
                            fill={true}
                            priority={true}
                            quality={100}
                            sizes="(max-width: 768px) 100vw,700px"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="flex flex-row items-center h-32 relative p-1"
            >
                {images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <Image
                            className="rounded-lg"
                            src={img.img}
                            alt={""}
                            fill={true}
                            priority={true}
                            quality={100}
                            sizes="(max-width: 768px) 100vw,700px"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

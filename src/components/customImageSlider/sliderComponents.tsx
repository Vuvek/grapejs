import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";

interface ImageSlidesProps {
  slides: {
    title: string;
    image: string;
    description: string;
    buttonText: string;
    buttonBackgroundColor: string;
    textColor: string;
    mediaType: string;
  }[];
}

const ImageSlider = ({ slides }: ImageSlidesProps) => {
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
      >
        {slides?.map((item, index) => {
          return (
            <div key={`slide-${index}`}>
              <SwiperSlide key={`slide-${index}`}>
                <div className="relative">
                  {item.image ? (
                    item.mediaType == "image" ? (
                      <img src={item.image} alt={item.title} />
                    ) : (
                      <iframe
                        name="Vimeo"
                        className={`p-0 w-full aspect-[7/3]`}
                        style={{ aspectRatio: "7/3" }}
                        src={`https://player.vimeo.com/video/${item.image}?autoplay=1&loop=1&background=1&muted=1`}
                        allow="autoplay"
                      ></iframe>
                    )
                  ) : (
                    <img
                      src="https://www.anniesannuals.com/cdn-cgi/image//https://storage.anniesannuals.com/annies/1/store/5/images/main-page-banner-01.jpg"
                      alt="Placeholder"
                    />
                  )}
                  <div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                      className="font-bold text-lg"
                      style={{ color: item.textColor }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="font-bold text-sm"
                      style={{ color: item.textColor }}
                    >
                      {item.description}
                    </div>
                    <div
                      style={{
                        backgroundColor: item.buttonBackgroundColor,
                      }}
                    >
                      {item.buttonText}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImageSlider;

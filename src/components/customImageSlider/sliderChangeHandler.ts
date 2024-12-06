import { Slide } from "./gsSlider";

const getSlides = (model: any, defaultSlides: Slide[]): Slide[] => {
  const attributes = model.get("attributes");
  return attributes ? attributes.slides : defaultSlides;
};

const updateSlides = (model: any, slides: Slide[]) => {
  model.set("attributes", { slides });
};

export const handleImageChangeHandler = (
  model: any,
  value: string,
  index: number,
  defaultSlides: Slide[]
) => {
  const slides = getSlides(model, defaultSlides);
  const updatedSlides = slides.map((slide, i) =>
    i === index ? { ...slide, image: value } : slide
  );
  updateSlides(model, updatedSlides);
};

export const handleTitleChangeHandler = (
  model: any,
  value: string,
  index: number,
  defaultSlides: Slide[]
) => {
  const slides = getSlides(model, defaultSlides);
  const updatedSlides = slides.map((slide, i) =>
    i === index ? { ...slide, title: value } : slide
  );
  updateSlides(model, updatedSlides);
};

export const handleDescriptionChangeHandler = (
  model: any,
  value: string,
  index: number,
  defaultSlides: Slide[]
) => {
  const slides = getSlides(model, defaultSlides);
  const updatedSlides = slides.map((slide, i) =>
    i === index ? { ...slide, description: value } : slide
  );
  updateSlides(model, updatedSlides);
};

export const handleButtonTextChangeHandler = (
  model: any,
  value: string,
  index: number,
  defaultSlides: Slide[]
) => {
  const slides = getSlides(model, defaultSlides);
  const updatedSlides = slides.map((slide, i) =>
    i === index ? { ...slide, buttonText: value } : slide
  );
  updateSlides(model, updatedSlides);
};

export const handleButtonBackgroundChangeHandler = (
  model: any,
  value: string,
  index: number,
  defaultSlides: Slide[]
) => {
  const slides = getSlides(model, defaultSlides);
  const updatedSlides = slides.map((slide, i) =>
    i === index ? { ...slide, buttonBackgroundColor: value } : slide
  );
  updateSlides(model, updatedSlides);
};

export const handleTextColorChangeHandler = (
  model: any,
  value: string,
  index: number,
  defaultSlides: Slide[]
) => {
  const slides = getSlides(model, defaultSlides);
  const updatedSlides = slides.map((slide, i) =>
    i === index ? { ...slide, textColor: value } : slide
  );
  updateSlides(model, updatedSlides);
};

export const handleMediaTypeChangeHandler = (
  model: any,
  value: string,
  index: number,
  defaultSlides: Slide[]
) => {
  const slides = getSlides(model, defaultSlides);
  const updatedSlides = slides.map((slide, i) =>
    i === index ? { ...slide, mediaType: value } : slide
  );
  updateSlides(model, updatedSlides);
};

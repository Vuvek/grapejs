const getSlides = (model: any, defaultSlides: any[]): any[] => {
  const attributes = model.get("attributes");
  return attributes ? attributes.logoSlides : defaultSlides;
};

const updateSlides = (model: any, logoSlides: any[]) => {
  model.set("attributes", { logoSlides });
};

export const handleImageChangeHandler = (
  model: any,
  value: string,
  index: number,
  defaultSlides: any[]
) => {
  const slides = getSlides(model, defaultSlides);
  const updatedSlides = slides.map((slide, i) =>
    i === index ? { ...slide, image: value } : slide
  );
  updateSlides(model, updatedSlides);
};

export const handleImageAltTagChangeHandler = (
  model: any,
  value: string,
  index: number,
  defaultSlides: any[]
) => {
  const slides = getSlides(model, defaultSlides);
  const updatedSlides = slides.map((slide, i) =>
    i === index ? { ...slide, alt: value } : slide
  );
  updateSlides(model, updatedSlides);
};

export const handleImageLinkChangeHandler = (
  model: any,
  value: string,
  index: number,
  defaultSlides: any[]
) => {
  const slides = getSlides(model, defaultSlides);
  const updatedSlides = slides.map((slide, i) =>
    i === index ? { ...slide, link: value } : slide
  );
  updateSlides(model, updatedSlides);
};

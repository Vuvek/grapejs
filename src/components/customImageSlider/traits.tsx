const AllTraits = (index: number) => {
  return [
    {
      type: "text",
      label: `Slide ${index + 1} Media Type`,
      name: `slide${index + 1}_media_type`,
      changeProp: true,
    },
    {
      type: "text",
      label: `Slide ${index + 1} Image`,
      name: `slide${index + 1}_image`,
      changeProp: true,
    },
    {
      type: "text",
      label: `Slide ${index + 1} Title`,
      name: `slide${index + 1}_title`,
      changeProp: true,
    },
    {
      type: "textarea",
      label: `Slide ${index + 1} Description`,
      name: `slide${index + 1}_description`,
      changeProp: true,
    },
    {
      type: "text",
      label: `Slide ${index + 1} Button`,
      name: `slide${index + 1}_button`,
      changeProp: true,
    },
    {
      type: "color",
      label: `Slide ${index + 1} Button Background Color`,
      name: `slide${index + 1}_button_background`,
      changeProp: true,
    },
    {
      type: "color",
      label: `Slide ${index + 1} text Color`,
      name: `slide${index + 1}_text_color`,
      changeProp: true,
    },
  ];
};

export default AllTraits;

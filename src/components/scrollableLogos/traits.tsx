const AllTraits = (index: number) => {
  return [
    {
      type: "text",
      label: `logoSlide ${index + 1} Image`,
      name: `logoSlide${index + 1}_image`,
      changeProp: true,
    },
    {
      type: "text",
      label: `logoSlide ${index + 1} Image Alt`,
      name: `logoSlide${index + 1}_image_alt`,
      changeProp: true,
    },
    {
      type: "text",
      label: `logoSlide ${index + 1} Image Link`,
      name: `logoSlide${index + 1}_image_link`,
      changeProp: true,
    },
  ];
};

export default AllTraits;

import { Editor } from "grapesjs";
import { createRoot } from "react-dom/client";
import ImageSlider from "./sliderComponents";
import AllTraits from "./traits";
import { v4 as uuidv4 } from "uuid";
import {
  handleButtonBackgroundChangeHandler,
  handleButtonTextChangeHandler,
  handleDescriptionChangeHandler,
  handleImageChangeHandler,
  handleMediaTypeChangeHandler,
  handleTextColorChangeHandler,
  handleTitleChangeHandler,
} from "./sliderChangeHandler";

export interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonBackgroundColor: string;
  textColor: string;
  mediaType: string;
}

const GsSlider = (editor: Editor, pageId: string) => {
  const defaultSlides: Slide[] = [
    {
      image:
        "https://www.anniesannuals.com/cdn-cgi/image//https://storage.anniesannuals.com/annies/1/store/5/images/main-page-banner-01.jpg",
      title: "Default Slide 1",
      description: "Description",
      buttonText: "Button",
      buttonBackgroundColor: "white",
      textColor: "white",
      mediaType: "image",
    },
  ];

  editor.Components.addType("custom-slider", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: true,
        editable: true,

        attributes: {
          slides: defaultSlides,
          id: uuidv4(),
        },
        traits: [
          {
            type: "button",
            label: "Add Slide",
            name: "add_slide",
            command: "add-slide",
            text: "Add Slide",
          },
        ],
      },
      init() {
        const attributes = this.get("attributes");
        const componentId = attributes ? attributes.id : "";
        fetch(`api/loadGrapesData?id=${pageId}`)
          .then((res) => res.json())
          .then((response) => {
            const component = response.data.data.pages[0].frames?.map(
              (com: any) => {
                return com.component.components;
              }
            );
            const getAttributes = component[0].map((data: any) => {
              return data.attributes;
            });
            const getComponentFromId = getAttributes.find(
              (attr: any) => attr.id === componentId
            );
            if (getComponentFromId) {
              this.set("attributes", {
                slides: getComponentFromId.slides,
              });
              getComponentFromId.slides.forEach((_: any, index: number) => {
                this.addSlideTraits(index);
              });
            }
          });
        this.listenTo(this, "change:attributes", this.updateSlider);
        editor.Commands.add("add-slide", () => {
          this.addSlide();
        });
        this.addSlideTraits(0);
      },
      updateSlider() {
        const attributes = this.get("attributes");
        const slides = attributes ? attributes.slides : defaultSlides;
        this.trigger("slides:updated", slides);
      },
      addSlide() {
        const attributes = this.get("attributes");
        const slides = attributes ? attributes.slides : defaultSlides;
        slides.push({
          image: "",
          title: "",
          description: "",
          buttonText: "",
          buttonBackgroundColor: "",
          textColor: "",
          mediaType: "image",
        });
        this.set("attributes", { slides });
        this.addSlideTraits(slides.length - 1);
      },
      addSlideTraits(index: number) {
        const traits = AllTraits(index);
        this.addTrait(traits);
        this.on(`change:slide${index + 1}_media_type`, (model, value) => {
          handleMediaTypeChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });

        this.on(`change:slide${index + 1}_image`, (model, value) => {
          handleImageChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });

        this.on(`change:slide${index + 1}_title`, (model, value) => {
          handleTitleChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });

        this.on(`change:slide${index + 1}_description`, (model, value) => {
          handleDescriptionChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });
        this.on(`change:slide${index + 1}_button`, (model, value) => {
          handleButtonTextChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });
        this.on(
          `change:slide${index + 1}_button_background`,
          (model, value) => {
            handleButtonBackgroundChangeHandler(
              model,
              value,
              index,
              defaultSlides
            );
            model.updateSlider();
          }
        );
        this.on(`change:slide${index + 1}_text_color`, (model, value) => {
          handleTextColorChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });
      },
    },
    view: {
      onRender({ el, model }) {
        const root = createRoot(el);
        const attributes = model.get("attributes");
        const slides = attributes ? attributes.slides : defaultSlides;

        root.render(<ImageSlider slides={slides} />);

        model.on("slides:updated", (slides) => {
          root.render(<ImageSlider slides={slides} />);
        });

        const addButton = el.querySelector(
          'button[name="add_slide"]'
        ) as HTMLButtonElement;
        if (addButton) {
          addButton.innerText = "Add Slide";
          addButton.onclick = () => {
            model.trigger("change:add_slide");
          };
        }
      },
    },
  });

  editor.BlockManager.add("slider", {
    label: "Slider",
    attributes: { class: "fa fa-sliders " },
    category: "React-component",
    content: { type: "custom-slider" },
  });
};

export default GsSlider;

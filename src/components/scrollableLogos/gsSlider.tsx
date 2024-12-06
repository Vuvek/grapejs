import { Editor } from "grapesjs";
import { createRoot } from "react-dom/client";
import SrollableLogos from "./scrollableLogos";
import AllTraits from "./traits";
import { v4 as uuidv4 } from "uuid";

import {
  handleImageAltTagChangeHandler,
  handleImageChangeHandler,
  handleImageLinkChangeHandler,
} from "./logoChangeHandler";

const GsLogosSlider = (editor: Editor, pageId: string) => {
  const defaultSlides = [
    {
      image:
        "https://redefinecommerce.blob.core.windows.net/lanomedia/1/store/5/images/logo-1.png",
      alt: "Default Alt Text",
      link: "https://www.example.com",
    },
  ];

  editor.Components.addType("Slider-logos", {
    model: {
      defaults: {
        tagNmae: "div",
        draggable: true,
        droppable: true,
        editable: true,
        attributes: {
          logoSlides: defaultSlides,
          id: uuidv4(),
        },
        traits: [
          {
            type: "button",
            label: "Add logoSlide",
            name: "add-logoSlide",
            command: "add-logoSlide",
            text: "Add logoSlide",
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
            if (getComponentFromId && getComponentFromId.logoSlides) {
              this.set("attributes", {
                logoSlides: getComponentFromId.logoSlides,
              });
              getComponentFromId.logoSlides.forEach((_: any, index: number) => {
                this.addSlideTraits(index);
              });
            }
          });

        console.log("componentIdcomponentId", editor.getComponents());
        this.listenTo(this, "change:attributes", this.updateSlider);
        editor.Commands.add("add-logoSlide", () => {
          this.addSlide();
        });
        this.addSlideTraits(0);
      },
      updateSlider() {
        const attributes = this.get("attributes");
        const logoSlides = attributes ? attributes.logoSlides : defaultSlides;
        this.trigger("logoSlides:updated", logoSlides);
      },

      addSlide() {
        const attributes = this.get("attributes");
        const logoSlides = attributes ? attributes.logoSlides : defaultSlides;
        logoSlides.push({
          image: "",
          alt: "",
          link: "",
        });
        this.set("attributes", { logoSlides });

        this.addSlideTraits(logoSlides.length - 1);
      },
      addSlideTraits(index: number) {
        const traits = AllTraits(index);

        this.addTrait(traits);

        this.on(`change:logoSlide${index + 1}_image`, (model, value) => {
          handleImageChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });
        this.on(`change:logoSlide${index + 1}_image_alt`, (model, value) => {
          handleImageAltTagChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });
        this.on(`change:logoSlide${index + 1}_image_link`, (model, value) => {
          handleImageLinkChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });
      },
    },
    view: {
      onRender({ el, model }) {
        const root = createRoot(el);
        const attributes = model.get("attributes");
        const logoSlides = attributes ? attributes.logoSlides : defaultSlides;

        root.render(<SrollableLogos slides={logoSlides} />);

        model.on("logoSlides:updated", (logoSlides) => {
          root.render(<SrollableLogos slides={logoSlides} />);
        });

        const addButton = el.querySelector(
          'button[name="add-logoSlide"]'
        ) as HTMLButtonElement;
        if (addButton) {
          addButton.innerText = "Add logoSlide";
          addButton.onclick = () => {
            model.trigger("change:add-logoSlide");
          };
        }
      },
    },
  });

  editor.BlockManager.add("Logo-Slider", {
    label: "Slider Logos",
    category: "React-component",
    content: { type: "Slider-logos" },
  });
};

export default GsLogosSlider;

import { Editor } from "grapesjs";

const GenerelStyleManager = (editor: Editor) => {
  const addGeneralStyleSector = () => {
    editor.StyleManager.addSector("general", {
      name: "General",
      open: false,
      buildProps: [
        "float",
        "display",
        "position",
        "top",
        "right",
        "left",
        "bottom",
      ],
    });
  };

  editor.on("component:selected", () => {
    addGeneralStyleSector();
  });
};

export default GenerelStyleManager;

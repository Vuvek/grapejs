import { Editor } from "grapesjs";

const ExtraStyleManager = (editor: Editor) => {
  const addExtraStyleManager = () => {
    editor.StyleManager.addSector("extra", {
      name: "Extra",
      open: false,
      buildProps: ["opacity", "cursor", "overflow"],
    });
  };

  editor.on("component:selected", () => {
    addExtraStyleManager();
  });
};

export default ExtraStyleManager;

import { Editor } from "grapesjs";

const AddSaveDataPanel = (editor: Editor) => {
  editor.Panels.addButton("options", [
    {
      id: "save-db",
      className: "fas fa-save",
      command: "save-db",
      attributes: {
        title: "Save Changes",
        style: "padding-top:7px",
      },
    },
  ]);
};

export default AddSaveDataPanel;

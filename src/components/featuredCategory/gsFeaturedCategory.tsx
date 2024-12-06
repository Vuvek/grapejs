import { Editor } from "grapesjs";
import { createRoot } from "react-dom/client";
import FeaturedCategory from "./featuredCategory";

const GsFeaturedCategory = (editor: Editor, serverSideData: any) => {
  const filteredData = serverSideData?.slice(0, 4)?.map((item: any) => ({
    id: item.id,
    seName: item.seName,
    image: item.imagePath,
    name: item.title,
  }));

  editor.Components.addType("dynamic-products", {
    model: {
      defaults: {
        attributes: {
          serverSideData: filteredData,
        },
      },
    },
    view: {
      onRender({ el, model }) {
        const root = createRoot(el);
        const data = model.get("attributes");
        root.render(<FeaturedCategory serverSideData={data?.serverSideData} />);
      },
    },
  });

  editor.BlockManager.add("featuredCategory", {
    label: "Featured Category",
    category: "React-component",
    content: { type: "dynamic-products" },
  });
};

export default GsFeaturedCategory;

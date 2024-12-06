import { Editor } from "grapesjs";
import React from "react";
import { createRoot } from "react-dom/client";
import Listing from "./listingComponents";
import { serversideDataProps } from "@/app/page";

const GsListing = (editor: Editor, serverSideData: serversideDataProps[]) => {
  editor.Components.addType("react-listing", {
    view: {
      onRender({ el }) {
        const root = createRoot(el);
        root.render(<Listing data={serverSideData} />);
      },
    },
  });

  editor.BlockManager.add("listing", {
    label: "listing",
    category: "React-component",
    content: { type: "react-listing" },
  });
};

export default GsListing;

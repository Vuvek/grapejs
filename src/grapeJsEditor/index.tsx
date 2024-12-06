"use client";
import grapesjs, { Editor } from "grapesjs";
import gsPluginForms from "grapesjs-plugin-forms";
import gsWebpage from "grapesjs-preset-webpage";
import gsBlocks from "grapesjs-blocks-basic";
import gsFlexBlock from "grapesjs-blocks-flexbox";
import gsCustome from "grapesjs-custom-code";
import React, { useEffect, useRef } from "react";
import "grapesjs/dist/css/grapes.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { serversideDataProps } from "@/app/page";
import GsListing from "@/components/listing/gsListing";
import AddSaveDataPanel from "./panel/saveData";
import GsSlider from "@/components/customImageSlider/gsSlider";
import GsFeaturedCategory from "@/components/featuredCategory/gsFeaturedCategory";
import GsLogosSlider from "@/components/scrollableLogos/gsSlider";
import { usePathname } from "next/navigation";

interface grapejsEditorProps {
  serverSideData?: serversideDataProps[];
  projectID?: string;
}
const GrapeJsEditor: React.FC<grapejsEditorProps> = ({ serverSideData }) => {
  const params = usePathname();
  const pageId = params.split("").slice(1).join("") || "grapesjs";

  const editorRef = useRef<Editor | null>(null);

  const loadEndpoint = `/api/loadGrapesData?id=${pageId}`;
  const saveEndpoint = "/api/saveGrapesData";

  useEffect(() => {
    editorRef.current = grapesjs.init({
      height: "100vh",
      container: "#gjs",
      width: "auto",
      fromElement: true,
      plugins: [gsCustome, gsBlocks, gsPluginForms, gsWebpage, gsFlexBlock],
      pluginsOpts: {
        "grapesjs-blocks-basic": {
          flexGrid: true,
        },
      },
      selectorManager: { componentFirst: true },
      storageManager: {
        type: "remote",
        autoload: true,
        options: {
          remote: {
            contentTypeJson: true,
            urlLoad: loadEndpoint,
            urlStore: saveEndpoint,
            onStore: (data) => {
              return { id: pageId, data };
            },
            onLoad: (result) => {
              return result.data.data || {};
            },
          },
        },
        autosave: true,
        stepsBeforeSave: 1,
      },
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
          "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
          '/styles/main.css'
        ],
      },
    });

    // Add icon in panel
    AddSaveDataPanel(editorRef.current);

    editorRef.current.setStyle(`@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');`)
    editorRef.current.StyleManager.addProperty('typography', {
      name: 'Font Family',
      property: 'font-family',
      type: 'select',
      defaults: 'Arial, sans-serif', // Default font
      options: [
        { id: 'Arial, sans-serif', name: 'Arial' },
        { id: "'Raleway', sans-serif", name: 'Raleway' }, // Add Raleway
        { id: 'Times New Roman, serif', name: 'Times New Roman' },
        { id: "'Courier New', monospace", name: 'Courier New' },
      ],
    });
    editorRef.current?.on('load', () => {
      const head = editorRef.current?.Canvas.getDocument().head;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap';
      head?.appendChild(link);
    });

    // Add custom component
    GsListing(editorRef.current, serverSideData || []);
    GsSlider(editorRef.current, pageId);
    GsFeaturedCategory(editorRef.current, serverSideData);
    GsLogosSlider(editorRef.current, pageId);
  }, [serverSideData]);

  return (
    <div>
      <div id="gjs"></div>
    </div>
  );
};

export default GrapeJsEditor;

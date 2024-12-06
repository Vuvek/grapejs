"use client";
import React, { useEffect, useState } from "react";
import ImageSlider from "@/components/customImageSlider/sliderComponents";
import SrollableLogos from "@/components/scrollableLogos/scrollableLogos";
import FeaturedCategory from "../featuredCategory/featuredCategory";

const renderComponent = (component: any, index: number) => {
  if (component.type === "textnode") {
    return component.content;
  }

  const { tagName, type, components, attributes, classes } = component;
  const Tag = tagName || "div";

  const classNameValue = Array.isArray(classes)
    ? classes
        .map((cls: any) => (typeof cls === "string" ? cls : cls.name || ""))
        .filter(Boolean)
        .join(" ")
    : typeof classes === "object" && classes.className
    ? classes.className
    : "";

  const elementProps = {
    className: classNameValue,
    ...attributes,
  };

  if (type === "image") {
    return (
      <img
        key={index}
        id={attributes?.id}
        src={attributes?.src}
        alt={attributes?.alt || "image"}
        className={classes?.map((cls: any) => cls.name).join(" ")}
      />
    );
  }

  if (type === "button") {
    return (
      <button key={index} {...attributes} disabled>
        {components && components.map(renderComponent)}
      </button>
    );
  }

  if (type === "link") {
    return (
      <a key={index} href={attributes?.href || "#"} {...attributes}>
        {components && components.map(renderComponent)}
      </a>
    );
  }

  return (
    <Tag key={index} {...elementProps}>
      {components &&
        components.map((child: any, idx: number) =>
          renderComponent(child, idx)
        )}
    </Tag>
  );
};

const Preview = ({ pageId }: { pageId: string }) => {
  const [finalData, setFinalData] = useState<any>([]);
  const [stylesData, setStylesData] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/loadGrapesData?id=${pageId || "grapesjs"}`
        );
        const data = await response.json();
        setFinalData(data.data.data.pages[0].frames[0].component.components);
        setStylesData(data.data.data.styles);
      } catch (error) {
        console.error("Error loading component data:", error);
      }
    };

    fetchData();
  }, [pageId]);

  useEffect(() => {
    if (stylesData) {
      const styleTag = document.createElement("style");
      styleTag.textContent = stylesData
        .map((style: any) => {
          const cssString = Object.entries(style.style)
            .map(([key, value]) => `${key}: ${value};`)
            .join(" ");

          const selector = style.selectors[0].name
            ? `.${style.selectors[0].name}`
            : `${style.selectors}`;

          if (style.mediaText) {
            return `@media ${style.mediaText} { ${selector} {${cssString}}}`;
          } else if (style.state === "hover") {
            return `${selector}:hover {${cssString}}`;
          } else {
            return `${selector} {${cssString}}`;
          }
        })
        .join(" ");
      document.head.appendChild(styleTag);

      return () => {
        document.head.removeChild(styleTag);
      };
    }
  }, [stylesData]);

  return (
    <div>
      {finalData.map((item: any, index: number) => {
        if (item.type === "custom-slider") {
          return <ImageSlider slides={item.attributes?.slides} key={index} />;
        } else if (item.type === "Slider-logos") {
          return (
            <SrollableLogos slides={item.attributes?.logoSlides} key={index} />
          );
        } else if (item.type === "dynamic-products") {
          console.log("if");
          return (
            <FeaturedCategory
              key={index}
              serverSideData={item?.attributes?.serverSideData}
            />
          );
        } else {
          return <div key={index}>{renderComponent(item, index)}</div>;
        }
      })}
    </div>
  );
};

export default Preview;

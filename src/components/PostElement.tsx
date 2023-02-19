/* eslint-disable @next/next/no-img-element */
import { createElement, memo } from "react";

interface Props {
   tag: string;
   content?: string;
   imageSource?: string;
   imageAltText?: string;
}

const PostElement = ({ tag, content, imageSource, imageAltText }: Props) => {
   switch (tag) {
      case "img":
         return <img src={imageSource} alt={imageAltText} />;
      default:
         const element = createElement(tag, {
            dangerouslySetInnerHTML: { __html: content },
         });
         return element;
   }
};

export default memo(PostElement);

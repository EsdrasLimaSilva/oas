/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

export type EditorDataType = {
   tag: string;
   key: string;
   content?: string;
   source?: string;
   altText?: string;
}[];

export type EditorUtilsType = {
   findElementIndex(elementKey: string, state: EditorDataType): number;
   pushElement(elementTag: string): void;
   appendParagraph(relativeCurrentIndex: number): void;
   pushImage(): void;
   updateContent: (elementId: string, newContent: string) => void;
   updateImageData(source: string, altText: string, imageId: string): void;
   changeElement: (key: string, newTag: string) => void;
   removeElement: (key: string) => void;
   save(): void;
};

export const EditorContext = createContext<{
   editorState: EditorDataType;
   editorUtils: EditorUtilsType;
   focusedElement: string;
} | null>(null);

const EditorProvider = ({ children }: { children: ReactNode }) => {
   const [editorState, setEditorState] = useState<EditorDataType>([]);
   const [focusedElement, setFocusedElement] = useState("");

   const setState = (data: EditorDataType) => {
      setEditorState(() => data);
   };

   const editorUtils = useMemo(
      () => ({
         findElementIndex(elementKey: string, state: EditorDataType) {
            const index = state.findIndex((el) => el.key == elementKey);
            return index;
         },

         pushElement(elementTag: string) {
            const elementId = uuid();
            setFocusedElement(elementId);
            setEditorState((prev) => [...prev, { tag: elementTag, content: "", key: elementId }]);
         },

         appendParagraph(relativeCurrentIndex: number) {
            setEditorState((prev) => {
               const firstPart = prev.slice(0, relativeCurrentIndex + 1);
               const secondPart = prev.slice(relativeCurrentIndex + 1, prev.length);

               const newParagraphId = uuid();
               firstPart.push({ tag: "p", content: "", key: newParagraphId });

               const newState = [...firstPart, ...secondPart];
               console.log("-->", firstPart);

               setFocusedElement(newParagraphId);
               return newState;
            });
         },

         pushImage() {
            const imageId = uuid();
            setFocusedElement(imageId);
            setEditorState((prev) => [
               ...prev,
               { tag: "img", key: imageId, source: "", altText: "" },
            ]);
         },

         updateContent: (elementId: string, newContent: string) => {
            setEditorState((prev) => {
               const index = prev.findIndex((el) => el.key == elementId);
               const newState = [...prev];
               newState[index].content = newContent;
               return newState;
            });
         },

         updateImageData(source: string, altText: string, imageId: string) {
            setEditorState((prev) => {
               const index = editorUtils.findElementIndex(imageId, prev);
               const newState = [...prev];
               newState[index].source = source;
               newState[index].altText = altText;
               return newState;
            });
         },

         changeElement: (key: string, newTag: string) => {
            setEditorState((prev) => {
               const index = editorUtils.findElementIndex(key, prev);
               const newState = [...prev];
               newState[index].tag = newTag;
               return newState;
            });
         },

         removeElement: (key: string) => {
            setEditorState((prev) => {
               const newState = prev.filter((el) => el.key != key);
               return newState;
            });
         },

         save() {
            localStorage.setItem("localData", JSON.stringify(editorState));
         },
      }),
      [],
   );

   return (
      <EditorContext.Provider value={{ editorState, editorUtils, focusedElement }}>
         {children}
      </EditorContext.Provider>
   );
};

export default EditorProvider;

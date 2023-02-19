/* eslint-disable react-hooks/exhaustive-deps */
import { EditorContext } from "@/contexts/EditorContext";
import { editPost, getSpecificPost, ResponsePost } from "@/services/sanityClient";
import styles from "@/styles/editor.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";
import { ImSpinner10, ImSpinner11, ImSpinner6, ImSpinner7, ImSpinner8 } from "react-icons/im";
import EditorElement from "./EditorElement";
import EditorImageElement from "./EditorImageElement";
import Toolbar from "./Toolbar";

const EditorContainer = () => {
   const [post, setPost] = useState<ResponsePost | null>(null);
   const [saving, setSaving] = useState(false);
   const context = useContext(EditorContext);
   const { editorState, editorUtils, focusedElement } = context!;
   const router = useRouter();

   useEffect(() => {
      (async () => {
         const post = await getSpecificPost(String(router.query.postId));
         setPost(post[0]);
      })();
   }, []);

   useEffect(() => {
      if (post) {
         editorUtils.setState(JSON.parse(post.content));
      }
   }, [post]);

   useEffect(() => {
      document.getElementById(focusedElement)?.focus();
   }, [focusedElement]);

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (post) {
         try {
            setSaving(true);
            const form = e.target as HTMLFormElement;
            const title = (form[0] as HTMLInputElement).value;
            const content = JSON.stringify(editorState);
            const description = (form[1] as HTMLInputElement).value;
            const tags = (form[2] as HTMLInputElement).value.split(",");
            const category = (form[3] as HTMLInputElement).value;
            const coverUrl = (form[4] as HTMLInputElement).value;

            const sanityResponse = await editPost({
               _id: post!._id,
               _type: "post",
               title,
               description,
               content,
               category,
               tags,
               coverUrl,
            });
         } catch (error) {
         } finally {
            setSaving(false);
         }
      }
   };

   return (
      <div
         className={styles.editorContainer}
         onKeyDown={(e) => {
            if (e.key == "Enter") {
               e.preventDefault();
               const relativeIndex = editorUtils.findElementIndex(
                  (e.target as HTMLTextAreaElement).id,
                  editorState,
               );
               editorUtils.appendParagraph(relativeIndex);
               return false;
            }
         }}
      >
         <Toolbar />

         {editorState.map((element) => {
            if (element.tag == "img") {
               return (
                  <EditorImageElement
                     key={element.key}
                     elementkey={element.key}
                     source={String(element.source)}
                     alt={String(element.altText)}
                     editorUtils={editorUtils}
                  />
               );
            } else {
               return (
                  <EditorElement
                     key={element.key}
                     elementKey={element.key}
                     elementTag={element.tag}
                     content={element.content || ""}
                     editorUtils={editorUtils}
                  />
               );
            }
         })}

         <form onSubmit={handleSubmit} className={styles.mainForm}>
            <h2>Meta data</h2>
            <input type="text" placeholder="título do post" defaultValue={post?.title} required />
            <textarea
               cols={30}
               rows={10}
               placeholder="meta description"
               defaultValue={post?.description}
               required
            ></textarea>
            <input
               type="text"
               placeholder="tags, separadas, por vírgulas"
               defaultValue={post?.tags.join(",")}
               required
            />
            <input type="text" placeholder="category" defaultValue={post?.category} required />
            <input type="text" placeholder="coverUrl" defaultValue={post?.coverUrl} required />

            <button type="submit" disabled={saving}>
               {saving ? (
                  <span>
                     <ImSpinner8 />
                  </span>
               ) : (
                  "save"
               )}
            </button>
         </form>
      </div>
   );
};

export default EditorContainer;

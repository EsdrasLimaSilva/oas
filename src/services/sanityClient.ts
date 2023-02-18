import { createClient } from "@sanity/client";
import { v4 as uuid } from "uuid";

export interface Post {
   title: string;
   description: string;
   content: string;
   category: string;
   tags: string[];
}

export interface ResponsePost extends Post {
   _id: string;
   _type: string;
}

const client = createClient({
   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
   dataset: "production",
   useCdn: false,
   apiVersion: "2023-02-17",
   token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const pushToPosts = async (postId: string) => {
   try {
      client
         .patch(String(process.env.NEXT_PUBLIC_SANITY_ALL_POSTS_ID))
         .setIfMissing({ all: [] })
         .insert("before", "all[0]", [{ _ref: postId }])
         .commit({
            autoGenerateArrayKeys: true,
         });
   } catch (err) {
      throw err;
   }
};

export const getPosts = async (keyword: string) => {
   const posts =
      await client.fetch(`*[_type == "post" && _id == "${keyword}" || category match "${keyword}" || "${keyword} in tags"]{
   title,
   description,
   tags,
   _id,
   _type,
   content
}`);

   return posts;
};

export const getSpecificPost = async (postId: string) => {
   const post = await client.fetch(`*[_type == "post" && _id == "${postId}"]{
   title,
   description,
   tags,
   _id,
   _type,
   content
}`);

   return post;
};

export const createPost = async ({ title, description, content, category, tags }: Post) => {
   try {
      const postId = uuid();

      const doc = {
         _type: "post",
         _id: postId,
         title,
         description,
         content,
         category,
         tags: [...tags],
      };

      const sanityResponse = await client.createIfNotExists(doc);
      await pushToPosts(postId);

      return sanityResponse;
   } catch (err) {
      throw err;
   }
};

export const editPost = async (post: ResponsePost) => {
   try {
      const doc = { ...post };
      console.log(doc);
      // const sanityResponse = await client.createOrReplace(doc);
   } catch (err) {
      throw err;
   }
};

export const getRecentPosts = async () => {
   try {
      const sanityResponse =
         await client.fetch(`*[_type == "posts" && _id == "${process.env.NEXT_PUBLIC_SANITY_ALL_POSTS_ID}"]{
   all[0...10]->{_id, _type, title, description, content, tags}
}`);

      return sanityResponse;
   } catch (err) {
      throw err;
   }
};

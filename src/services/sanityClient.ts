import { createClient } from "@sanity/client";
import { v4 as uuid } from "uuid";

export interface Post {
   title: string;
   description: string;
   content: string;
   category: string;
   tags: string[];
   coverUrl: string;
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
      await client
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

// you need to remove from the reference array. Otherwise you won't be able to delete it
const removeFromPosts = async (postId: string) => {
   try {
      await client
         .patch(String(process.env.NEXT_PUBLIC_SANITY_ALL_POSTS_ID))
         .unset([`all[_ref=="${postId}"]`])
         .commit();
   } catch (error) {
      throw error;
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
   content,
   coverUrl
}`);

   return posts;
};

export const getSpecificPost = async (postId: string) => {
   const sanityResponse = await client.fetch(`*[_type == "post" && _id == "${postId}"]{
   title,
   description,
   tags,
   _id,
   _type,
   content,
   coverUrl,
   category
}`);

   return sanityResponse[0];
};

export const createPost = async ({
   title,
   description,
   content,
   category,
   tags,
   coverUrl,
}: Post) => {
   try {
      const postId = uuid();

      const doc = {
         _type: "post",
         _id: postId,
         title,
         description,
         content,
         category,
         coverUrl,
         tags: [...tags],
      };

      const sanityResponse = await client.createIfNotExists(doc);
      await pushToPosts(postId);

      return sanityResponse;
   } catch (err) {
      throw err;
   }
};

export const deletePost = async (postId: string) => {
   try {
      await removeFromPosts(postId);
      const sanityResponse = await client.delete(postId);
      return sanityResponse;
   } catch (error) {
      throw error;
   }
};

export const editPost = async (post: ResponsePost) => {
   try {
      const doc = { ...post };
      const sanityResponse = await client.createOrReplace(doc);
      return sanityResponse;
   } catch (err) {
      throw err;
   }
};

export const getRecentPosts = async () => {
   try {
      const sanityResponse =
         await client.fetch(`*[_type == "posts" && _id == "${process.env.NEXT_PUBLIC_SANITY_ALL_POSTS_ID}"]{
   all[0...10]->{
      title,
      description,
      tags,
      _id,
      _type,
      content,
      coverUrl
   }
}`);

      return sanityResponse[0].all;
   } catch (err) {
      throw err;
   }
};

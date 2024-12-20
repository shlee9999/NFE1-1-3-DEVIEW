import { DEV_DEPENDENCIES_LIST } from "@constants/devDependenciesList";

export type DevDependency = (typeof DEV_DEPENDENCIES_LIST)[number];

export type DevDependenciesList = {
  // id: number;
  dependency: DevDependency;
  version: string;
}[];

export type TPost = {
  _id: string;
  title: string;
  detail: string;
  author: {
    _id: string;
    userId: string;
  };
  code: string;
  devDependencies: DevDependency[];
  devVersions: string[];
  likesCount: number;
  viewsCount: number;
  scrapsCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TPostDetail = TPost & {
  liked: boolean;
  scraped: boolean;
  isAuthor: boolean;
};

export type CommonPostRequestProps = Pick<TPost, "title" | "detail" | "devDependencies" | "code" | "devVersions"> & {
  postId: string;
};

export type CommonPostResponseProps = {
  posts: TPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
};

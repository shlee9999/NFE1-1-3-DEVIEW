import { Loading } from "@components/Common/Loading";
import { PostListItem } from "@components/Common/PostListItem";
import { NoUserContent } from "@components/MyPage/NoUserContent";
import { TPost } from "@customTypes/post";
import { getUserPosts } from "@services/post/getUserPosts";
import { useQuery } from "@tanstack/react-query";

export const PostsContent = () => {
  const { data, isLoading, error } = useQuery<{ posts: TPost[] }, Error>({
    queryKey: ["userPosts"],
    queryFn: () =>
      getUserPosts({
        page: 1,
        limit: 10,
        title: "",
        content: "",
        devDependencies: []
      })
  });

  if (isLoading)
    return (
      <div className="flex">
        <Loading />
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  if (!data || data.posts.length === 0) return <NoUserContent type="post" />;

  return (
    <div className="">
      {data.posts.map((post) => (
        <PostListItem key={post._id} postItem={post} />
      ))}
    </div>
  );
};

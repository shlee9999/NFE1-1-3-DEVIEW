import { Loading } from "@components/Common/Loading";
import { PostList } from "@components/Common/PostList";
import { CommonPostResponseProps } from "@customTypes/post";
import useSuspenseInfinite from "@hooks/useSuspenseInfinite";
import { getPopularPosts } from "@services/post/getPopularPosts";
import { getPosts } from "@services/post/getPosts";
import { getUserPosts } from "@services/user/getUserPosts";
import { useCallback, useRef } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
type PostPageUserPostListProps = {
  sort: "latest" | "views";
  id?: string;
  setSort: React.Dispatch<React.SetStateAction<"latest" | "views">>;
  setUserId?: React.Dispatch<React.SetStateAction<string>>;
};
export const PostPageList = ({ sort, id, setUserId, setSort }: PostPageUserPostListProps) => {
  const fc = sort === "views" ? getPopularPosts : getPosts;

  const headerText = { latest: "최신", views: "인기" };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfinite<
    CommonPostResponseProps & { userId?: string }
  >({
    key: ["PostPage", sort, id],
    fetchFunc: id
      ? ({ page, limit }) => getUserPosts({ page, limit, sort: sort, userId: id })
      : ({ page, limit }) => fc({ page, limit }),
    limit: 10
  });
  if (data.pages[0]?.userId && setUserId) {
    setUserId(data.pages[0].userId);
  }
  const posts = data.pages.flatMap((page) => page.posts);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );
  const handleClick = () => {
    const value = sort === "latest" ? "views" : "latest";
    setSort(value);
  };
  return (
    <div>
      <div className="flex w-full items-center justify-between pt-12">
        <div className="flex text-16 md:text-20">
          <div className="font-bold text-secondary">{data?.pages[0].totalPosts}</div>개의 질문
        </div>
        <button
          onClick={handleClick}
          className="rounded p-1 pr-2 text-14 text-secondary ring-2 ring-primary transition-all flex-center hover:ring-secondary md:text-16"
        >
          <CgArrowsExchangeAltV className="right-1 text-20 md:text-24" />
          {`${headerText[sort]}순`}
        </button>
      </div>
      {posts && (
        <>
          <PostList posts={posts} />
          <div ref={lastPostElementRef}></div>
        </>
      )}
      {isFetchingNextPage && (
        <div className="flex">
          <Loading />
        </div>
      )}
    </div>
  );
};

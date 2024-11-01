import { Feedback, CommentList, CommentWrite, PostDetail } from "@components/PostDetailPage";
import { useParams } from "react-router-dom";
import usePostDetail from "@hooks/usePostDetail";
import { Navigate } from "react-router-dom";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { post, isLoading, isError, error } = usePostDetail({
    postId: id ?? undefined,
    enabled: Boolean(id)
  });

  // ID가 없는 경우 메인 페이지로 리다이렉트
  if (!id) {
    return <Navigate to="/" replace />;
  }
  console.log("PostDetailPage: ", post);
  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <div className="m-auto my-[1.625rem] flex max-w-[1240px] flex-col gap-12 px-5">
        <div className="animate-pulse">
          <div className="bg-gray-200 mb-4 h-8 w-3/4 rounded"></div>
          <div className="bg-gray-200 mb-2 h-4 w-1/2 rounded"></div>
          <div className="bg-gray-200 h-64 w-full rounded"></div>
        </div>
      </div>
    );
  }

  // 에러 발생 시 에러 메시지 표시
  if (isError) {
    return (
      <div className="m-auto my-[1.625rem] flex max-w-[1240px] flex-col gap-12 px-5">
        <div className="text-red-500">에러가 발생했습니다: {error?.message ?? "알 수 없는 오류가 발생했습니다."}</div>
      </div>
    );
  }

  // 데이터가 없는 경우 메시지 표시
  if (!post) {
    return (
      <div className="m-auto my-[1.625rem] flex max-w-[1240px] flex-col gap-12 px-5">
        <div>게시글을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="m-auto my-[1.625rem] flex max-w-[1240px] flex-col gap-12 px-5">
      <PostDetail post={post} />
      <Feedback isClicked={post.liked} total={post.likesCount} subject={post._id}/>
      <CommentWrite />
      <CommentList />
    </div>
  );
}

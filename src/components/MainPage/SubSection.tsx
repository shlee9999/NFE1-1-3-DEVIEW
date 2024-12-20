import { SubBannerWrap } from "@components/MainPage/SubBannerWrap";
import { SubBannerSkeleton } from "@components/MainPage/SubBannerSkeleton";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const SubSection = () => {
  return (
    <div className="bg-lightyellow flex-center">
      <div className="flex w-full max-w flex-col">
        <div className="px-4 pt-10 text-20 font-semibold md:px-10 md:text-24">답변을 기다리는 질문</div>
        <ErrorBoundary fallbackRender={({ error }) => <SubBannerSkeleton error={error.message} isError={true} />}>
          <Suspense fallback={<SubBannerSkeleton />}>
            <SubBannerWrap />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

import { Loading } from "@components/Common/Loading";
import { TabMenu } from "@components/MyPage/TabMenu";
import { UserProfile } from "@components/MyPage/UserProfile";
import { UserInfo } from "@customTypes/userInfo";
import { getUserInfo } from "@services/auth/getUserInfo";
import { useQuery } from "@tanstack/react-query";

export default function MyPage() {
  const {
    data: userInfo,
    isLoading,
    error
  } = useQuery<UserInfo, Error>({
    queryKey: ["userInfo"],
    queryFn: getUserInfo
  });

  if (isLoading) {
    return (
      <div className="flex">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-4 flex max-w flex-col gap-6 py-12 md:gap-12 2xl:mx-auto">
      {userInfo && <UserProfile userInfo={userInfo} />}
      <TabMenu />
    </div>
  );
}

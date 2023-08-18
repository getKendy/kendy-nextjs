// import { Suspense } from "react";
import AlertStats from "./_component/alert-stats";

// import { AuthShowcase } from "./_components/auth-showcase";
// import {
//   CreatePostForm,
//   PostCardSkeleton,
//   PostList,
// } from "./_components/posts";

// export const runtime = "edge";

export default function HomePage() {
  return (
    <main>
      {/* <div className="container mt-12 flex flex-col items-center justify-center gap-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-pink-400">T3</span> Turbo
        </h1>
        <AuthShowcase />

        <div className="h-[40vh] w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }
          >
            <PostList />
          </Suspense>
        </div>
      </div> */}
      <AlertStats />
    </main>
  );
}

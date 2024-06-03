import Onboarding from "@/components/onboarding";

export default async function Page() {
  return (
    <div className="container px-5 mx-auto">
      <Onboarding />
      <div>
        <div className=" left-0 width-full height[102px] relative">
          <iframe
            src="https://anchor.fm/codingcatdev/embed/episodes/4-9---Flutter-2024---Build-beautiful--native-experiences-across-platforms-from-a-single-codebase-e2gnnhj"
            className="top-0 left-0 width-full height-full absolute border-none"
            allowFullScreen
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-white flex flex-col justify-center items-center gap-4 h-[40vh]">
        <div className="text-5xl font-bold flex items-center justify-center gap-3">Buy Me A chai <span><img className="mt-[-20px]" src="/tea.gif" width={44} alt="" /></span></div>
        <p>A crowdfunding platform for creaters. Get funded by your fans and followers. </p>
        <p>A place where your fans can buy you a chai. Unleash the power of your fans and get your projects funded.</p>
        <div>
          <Link href={"/login"}>
            <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          </Link>
          <Link href={"/about"}>
            <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"> </div>

      <div className="container mx-auto text-white pb-20 pt-14">
        <h2 className="text-center font-bold text-3xl mb-14">Your Fans can buy you a Chai</h2>
        <div className="flex justify-around gap-5">
          <div className="item space-y-1 flex flex-col items-center">
            <img className="rounded-full bg-white w-[88px] h-[88px] p-2" src="/desk.gif" alt="desk" />
            <p className="font-bold">Fund Yourself</p>
            <p className="w-60 text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-1 flex flex-col items-center">
            <img className="rounded-full bg-white w-[88px] h-[88px]" src="/coin.gif" alt="desk" />
            <p className="font-bold">Fund Yourself</p>
            <p className="w-60 text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-1 flex flex-col items-center">
            <img className="rounded-full bg-white w-[88px] h-[88px]" src="/group.gif" alt="desk" />
            <p className="font-bold">Fans want to help</p>
            <p className="w-60 text-center">Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"> </div>

      <div className="container mx-auto text-white pb-20 pt-14 flex flex-col justify-center items-center">
        <h2 className="text-center font-bold text-3xl mb-14">Learn more about us</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/MlKLOMwC6DA?si=QTqU8Wi1x7hnWYr-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex justify-center flex-col items-center h-[44vh] text-white" >
      <div className="font-bold my-3 md:text-5xl xl:text-7xl text-4xl">Buy Me a Chai
      </div>
      <p className="px-5 text-center md:text-2xl xl:text-3xl text-xl ">A crowdfunding platform for creators .Get funded by your fans and followers. Start Now</p>
      <div className="my-5">
        
        <Link href={'/login'}><button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button></Link>
        <Link href={'/about'}>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
      </Link>
      </div>
    </div>
    <div className="bg-black h-1 opacity-10">

    </div>
    <div className="container mx-auto text-white ">
      <h1 className="text-2xl md:text-4xl text-center my-8 font-bold">Your Fans can buy you a chai</h1>
      

        <div className="flex gap-5 flex-wrap  justify-center my-4">
          <div className="item flex w-[450px]  flex-col items-center justify-center px-4 box-border">
            <img src="tea.gif" className="rounded-full p-2" width={150} alt="" />
            <p className="font-bold my-3 xl:text-2xl text-3xl md:text-xl">Fund Yourself</p>
            <p className="text-center xl:text-xl  md:text-sm text-2xl">Your fans are available for you to help you</p>
          </div>
          <div className="item flex w-[450px]  flex-col items-center justify-center px-4 box-border">
            <img src="tea.gif" className="rounded-full p-2" width={150} alt="" />
            <p className="font-bold my-3 xl:text-2xl text-3xl md:text-xl">Fund Yourself</p>
            <p className="text-center xl:text-xl  md:text-sm text-2xl">Your fans are available for you to help you</p>
          </div>
          <div className="item flex w-[450px]  flex-col items-center justify-center px-4 box-border">
            <img src="tea.gif" className="rounded-full p-2" width={150} alt="" />
            <p className="font-bold my-3 xl:text-2xl text-3xl md:text-xl">Fund Yourself</p>
            <p className="text-center xl:text-xl  md:text-sm text-2xl">Your fans are available for you to help you</p>
          </div>
      
      </div>
    </div>
    </>
  );
}

export const metadata = {
  title : "Home - Get Me A chai"
}
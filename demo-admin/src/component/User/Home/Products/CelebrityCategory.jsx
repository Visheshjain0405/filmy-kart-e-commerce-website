import React,{useEffect} from 'react'
import MaheshBabu from "../../../assets/hero/maheshbabu.jpg";
import AjithKumar from "../../../assets/hero/ajithkumar.jpg";
import AlluArjun from "../../../assets/hero/alluarjun.jpg";
import Rajinikanth from "../../../assets/hero/rajinikanth.jpg";
import { Link } from 'react-router-dom';
import Glide from "@glidejs/glide"


const CelebritiesData = [
    {
        id: 1,
        img: MaheshBabu,
        name: "MaheshBabu",
    },
    {
        id: 2,
        img: AjithKumar,
        name: "AjithKumar",
    },
    {
        id: 3,
        img: AlluArjun,
        name: "AlluArjun",
    },
    {
        id: 4,
        img: Rajinikanth,
        name: "Rajinikanth",
    },
];

function CelebrityCategory() {

    useEffect(() => {
        const slider = new Glide(".glide-04", {
          type: "carousel",
          focusAt: "center",
          perView: 3,
          autoplay: 3500,
          animationDuration: 700,
          gap: 24,
          classNames: {
            nav: {
              active: "[&>*]:bg-wuiSlate-700",
            },
          },
          breakpoints: {
            1024: {
              perView: 2,
            },
            640: {
              perView: 1,
            },
          },
        }).mount()
    
        return () => {
          slider.destroy()
        }
      }, [])

    return (
        // <div className='mt-[300px]' data-aos="fade-up">
        //     <h1 className='text-3xl text-center font-bold mb-5 -mt-[300px]'>Browse By Celebrities</h1>
        //     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center mx-[50px]'>
        //         {CelebritiesData.map((data) => (
        //             <div className='h-[550px] w-[350px]'>
        //                 <Link to={`/celebrityproduct/${data.name}`}>
        //                 <img src={data.img} className='h-[90%] w-[100%]' />
        //                 </Link>
        //                 <h1 className='text-center text-2xl p-1 font-bold'>{data.name}</h1>
        //             </div>
        //         ))}

        //     </div>

        // </div>
   




        <>
        {/*<!-- Component: Carousel with controls outside --> */}
        <div className="glide-04 relative w-full">
            <h1 className='text-4xl text-center font-bold italic my-[25px]'>Celebrities Wise Products</h1>
          {/*    <!-- Slides --> */}
          <div className="overflow-hidden mx-[80px]" data-glide-el="track">
            <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            <Link to={`/moviecategory/${'ps2'}`}>

              <li>
                <img
                  src="https://wallpapers.com/images/hd/ram-charan-hd-pouting-on-stage-0w8d008f7nfhohk9.jpg"
                  className="m-auto h-[300px] object-cover max-h-full w-full max-w-full"
                />
              </li>
              </Link>

              <Link to={`/moviecategory/${'ps2'}`}>

              <li>
                <img
                  src="https://wallpapercave.com/wp/wp7128574.jpg"
                  className="m-auto h-[300px] object-cover w-full max-w-full"
                />
              </li>
              </Link>

              <Link to={`/moviecategory/${'ps2'}`}>

              <li>
                <img
                  src='https://i.pinimg.com/564x/da/56/cd/da56cd8d973d8916ea3ed397de80b429.jpg'
                  className="m-auto h-[300px] object-cover w-full max-w-full"
                />
              </li>
              </Link>

              <Link to={`/moviecategory/${'ps2'}`}>

              <li>
                <img
                  src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202306/thalapathy_vijay-sixteen_nine.jpg?VersionId=Agiq7qLXhvFrGLVr8Wr_kkCk6o7Bs5AK&size=690:388"
                  className="m-auto h-[300px] object-cover w-full max-w-full bg-center"
                />
              </li>
              </Link>

              <Link to={`/moviecategory/${'ps2'}`}>

              <li>
                <img
                  src='https://filmfare.wwmindia.com/content/2020/aug/maheshbabu31596961174.jpg'
                  className="m-auto h-[300px] object-cover w-full max-w-full"
                />
              </li>
              </Link>
            </ul>
          </div>
          {/*    <!-- Controls --> */}
          <div
            className="flex w-full items-center justify-center gap-2 p-4"
            data-glide-el="controls"
          >
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 dark:text-white focus-visible:outline-none lg:h-12 lg:w-12"
              data-glide-dir="<"
              aria-label="prev slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <title>prev slide</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
            </button>
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 dark:text-white focus-visible:outline-none lg:h-12 lg:w-12"
              data-glide-dir=">"
              aria-label="next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <title>next slide</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
        {/*<!-- End Carousel with controls outside --> */}
      </>




    )
}

export default CelebrityCategory
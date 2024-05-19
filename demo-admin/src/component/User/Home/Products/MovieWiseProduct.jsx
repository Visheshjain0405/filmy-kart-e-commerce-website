import React from 'react'
import rrr from "../../../assets/hero/rrr.jpg"
import leo from "../../../assets/hero/main.jpg"
import ps2 from "../../../assets/hero/rrr.jpg"
import salaar from "../../../assets/hero/salaar.jpg"
import adipurush from "../../../assets/hero/adipurush.jpg"
import hanuman from "../../../assets/hero/rrr.jpg"
import gunturkaaran from "../../../assets/hero/rrr.jpg"
import ayalaan from "../../../assets/hero/rrr.jpg"
import jailer from "../../../assets/hero/jailer.jpeg"
import { Link } from 'react-router-dom'
function MovieWiseProduct() {
    return (
        // <div className='my-12'>
        //     <h1 className='text-4xl text-center mb-12'>OFFICIAL MERCHANDISE</h1>
        //     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        //   <div className="grid gap-4">
        //     <div>
        //       <img className="h-auto max-w-full rounded-lg" src={rrr} alt="" />
        //     </div>
        //     <div>
        //       <img className="h-auto max-w-full rounded-lg" src={vr} alt="" />
        //     </div>
        //     <div>
        //       <img className="h-auto max-w-full rounded-lg" src={ps2} alt="" />
        //     </div>
        //   </div>
        //   <div className="grid gap-4">
        //     <div>
        //       <img className="h-auto max-w-full rounded-lg" src={salaar} alt="" />
        //     </div>
        //     <div>
        //       <img className="h-auto max-w-full rounded-lg" src={adipurush} alt="" />
        //     </div>
        //     <div>
        //       <img className="h-auto max-w-full rounded-lg" src={hanuman} alt="" />
        //     </div>
        //   </div>
        //   <div className="grid gap-4">
        //     <div>
        //       <img className="h-auto max-w-full rounded-lg" src={gunturkaaran} alt="" />
        //     </div>
        //     <div>
        //       <img className="h-auto max-w-full rounded-lg" src={ayalaan} alt="" />
        //     </div>
        //     <div>
        //       <img className="h-auto max-w-full rounded-lg" src={jailer} alt="" />
        //     </div>
        //   </div>
        //   <div className="grid gap-4">
        //     <div>
        //       <img className="h-auto max-w-full rounded-lg" src={rrr} alt="" />
        //     </div>
        //     <div>
        //       <img className="h-auto max-w-full rounded-lg" src={rrr} alt="" />
        //     </div>
        //     <div>
        //       <img className="h-auto max-w-full rounded-lg" src={rrr} alt="" />
        //     </div>
        //   </div>
        // </div>
        // </div>
        <>
        {/* <div data-aos="fade-up" data-dos-duration="3000">
        <h1 className='text-center text-[50px] my-10'>OFFICIAL MERCHANDISE</h1>
            <section className="bg-white dark:bg-gray-900 p-2 dark:text-white">
                <div className="py-4 px-2 mx-auto max-w-screen sm:py-4 lg:px-2 lg:mx-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
                        <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 dark:bg-gray-900 h-auto md:h-full flex flex-col">
                            <a
                                href=""
                                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
                            >
                                <img
                                    src={salaar}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
                                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                                    Salaar
                                </h3>
                            </a>
                        </div>
                        <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50 dark:bg-gray-900" >
                            <a
                                href=""
                                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4"
                            >
                                <img
                                    src={leo}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
                                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                                    Leo
                                </h3>
                            </a>
                            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                                <a
                                    href=""
                                    className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                                >
                                    <img
                                        src={adipurush}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
                                    <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                                        Adipurush
                                    </h3>
                                </a>
                                <a
                                    href=""
                                    className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                                >
                                    <img
                                        src={jailer}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
                                    <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                                        Jailer
                                    </h3>
                                </a>
                            </div>
                        </div>
                        <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 dark:bg-gray-900 h-auto md:h-full flex flex-col">
                            <a
                                href=""
                                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
                            >
                                <img
                                    src={rrr}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
                                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                                    RRR
                                </h3>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            </div> */}
            <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
                <h1 className='text-4xl text-center my-[50px]'>Movie Wise Products</h1>
  <div className="-m-1 flex flex-wrap md:-m-2">
    <div className="flex w-1/2 flex-wrap">
      <div className="w-1/2 p-1 md:p-2">
      <Link to={`/moviecategory/${'leo'}`}>
        
        <img
          alt="gallery"
          className="block h-full w-full rounded-lg object-cover object-center"
          src="https://www.wallsnapy.com/img_gallery/maaveeran-sivakarthikeyan-wallpaper-hd-1080p-8423228.jpg"
        />
        </Link>
      </div>
      <div className="w-1/2 p-1 md:p-2">
      <Link to={`/moviecategory/${'master'}`}>

        <img
          alt="gallery"
          className="block h-full w-full rounded-lg object-cover object-center"
          src="https://i.pinimg.com/originals/89/d8/67/89d8675fef4d45625f2def905a47d58d.jpg"
        />
        </Link>
      </div>
      <div className="w-full p-1 md:p-2">
      <Link to={`/moviecategory/${'salaar'}`}>

        <img
          alt="gallery"
          className="block h-full w-full rounded-lg object-cover object-center"
          src="https://wallpapercave.com/wp/wp8981276.jpg"
        />
        </Link>
      </div>
    </div>
    <div className="flex w-1/2 flex-wrap">
      <div className="w-full p-1 md:p-2">
      <Link to={`/moviecategory/${'rrr'}`}>

        <img
          alt="gallery"
          className="block w-full rounded-lg object-cover object-center"
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYxEx-v-njH4TY9eYOTApyFGQFVjWIzBYN4nxSS0-ds_UmuSLDQF6zY5tWT_-opDflWTvgG0WiRuEWDErlkahBp5TUS5c8b3QImSsPcntlEBhvkjYKo70tyTxARzO47JciOPNmv7KeruBd2qG0LUreYLARYLmI8YzTZ-ckElWkX7H2z0EPfIrrXMezcw/s16000/HDgallery%20Naatu%20Naatu%20Still%20NTR%20RC.jpg"
        />
        </Link>
      </div>
      <div className="w-1/2 p-1 md:p-2">
      <Link to={`/moviecategory/${'leo'}`}>

        <img
          alt="gallery"
          className="block h-full w-full rounded-lg object-cover object-center"
          src="https://live.staticflickr.com/65535/52667109963_4f76301b9a_b.jpg"
        />
        </Link>
      </div>
      <div className="w-1/2 p-1 md:p-2">
      <Link to={`/moviecategory/${'hanuman'}`}>
        
        <img
          alt="gallery"
          className="block h-full w-full rounded-lg object-cover object-center"
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRaF-XEC9fdVnAIfOfPj7oRUAyI-xJ2yTdJwOBQMAUjxXo8ftod-nW-6yDK4D_fkaHk1SZdM6EdkBvy_rGqET048oLV-PAPXIE_6KWPOkUlmr1Kw7hA_j3mj-q_CnNzFEpWtrPaIvSM6xQifjMYiCGBrKDHGTCa38clIV2ycVzFIWopsc-o9Ni0caFew/s1600/HAN-TEASER-50M-POSTER-LOCK-PLAIN-742367.jpg"
        />
        </Link>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default MovieWiseProduct
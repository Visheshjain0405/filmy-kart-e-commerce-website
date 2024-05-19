import React from 'react'
import Navbar from '../../Home/Navbar/Navbar'
import { Link } from 'react-router-dom'

function MovieCategory() {
    return (
        <div>
            <Navbar />
            <div className='mx-[100px]'>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="grid gap-4">
                        <div>
                            <Link to={`/moviecategory/${'salaar'}`}>
                            <img
                                className="h-auto max-w-full rounded-lg"
                                src="https://pbs.twimg.com/media/GA5FenxbUAA3Tts?format=jpg&name=4096x4096"
                                alt=""
                            />
                            </Link>
                        </div>
                        <div>
                            <Link to={`/moviecategory/${'rrr'}`}>
                            <img
                                className="h-auto max-w-full rounded-lg"
                                src='https://chennaivision.com/tamil-movies/wp-content/uploads/2021/07/RRR_LYCA_Insta.jpg'
                                // src="https://play-lh.googleusercontent.com/gwBnh1EkQ5Bjw6Ir4ZdlxRgVaVXRAAVShgNYBpkfZrTgUhbCALvqOxHuRHWGOEs2sBwE"
                                alt=""
                            />
                            </Link>
                        </div>
                        <div>
                            <Link to={`/moviecategory/${'salaar'}`}>
                            <img
                                className="h-auto max-w-full rounded-lg"
                                src="https://play-lh.googleusercontent.com/gwBnh1EkQ5Bjw6Ir4ZdlxRgVaVXRAAVShgNYBpkfZrTgUhbCALvqOxHuRHWGOEs2sBwE"
                                alt=""
                            />
                            </Link>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Link to={`/moviecategory/${`ps2`}`}>
                            <img
                                className="h-auto max-w-full rounded-lg"
                                src="https://img.onmanorama.com/content/dam/mm/en/entertainment/entertainment-news/images/2023/4/28/ponniyin-selvan-2.jpg.transform/576x300/image.jpg"
                                alt=""
                            />
                            </Link>
                        </div>
                        <div>
                            <Link to={`/moviecategory/${`leo`}`}>
                            <img
                                className="h-auto max-w-full rounded-lg"
                                src="https://i.pinimg.com/originals/46/37/db/4637dbeccdf457d9086f4e19e3737863.jpg"
                                alt=""
                            />
                            </Link>
                        </div>
                        <div>
                            <Link to={`/moviecategory/${`maaveeran`}`}>
                            <img
                                className="h-auto max-w-full rounded-lg"
                                src="https://m.media-amazon.com/images/M/MV5BNzU3YmY5ZjAtMTIxYy00ODg2LWI0YzItMTVhNGM4YWIzNmYyXkEyXkFqcGdeQXVyMTQ4MTg3Njcx._V1_.jpg"
                                alt=""
                            />
                            </Link>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Link to={`/moviecategory/${`jailer`}`}>
                            <img
                                className="h-auto max-w-full rounded-lg"
                                src="https://www.kerala9.com/wp-content/uploads/2023/08/Jailer-Movie-hd-posters-001.jpg"
                                alt=""
                            />
                            </Link>
                        </div>
                        <div>
                            <Link to={`/moviecategory/${'master'}`}>
                            <img
                                className="h-auto max-w-full rounded-lg"
                                src="https://pbs.twimg.com/media/ENH_PGfU0AMIwYI.jpg:large"
                                alt=""
                            />
                            </Link>
                        </div>
                        <div>
                            <Link to={`/moviecategory/${'hanuman'}`}>
                            <img
                                className="h-[250px] max-w-full rounded-lg"
                                src="https://economictimes.indiatimes.com/thumb/height-450,width-600,imgsize-112166,msid-106888809/hanumandb.jpg?from=mdr"
                                alt=""
                            />
                            </Link>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Link to={`/moviecategory/${'vikram'}`}>
                            <img
                                className="h-[200px] max-w-full rounded-lg"
                                src="https://assets.thehansindia.com/h-upload/2022/06/03/1295898-vikram-movie.webp"
                                alt=""
                            />
                            </Link>
                        </div>
                        <div>
                            <Link to={`/moviecategory/${'adipurush'}`}>
                            <img
                                className="h-auto max-w-full rounded-lg"
                                src="https://m.media-amazon.com/images/M/MV5BZThlY2M1MGYtZjA1MC00YTMzLTkzMTUtZWQyZjU5ODBmYmVjXkEyXkFqcGdeQXVyMTE0MTY2Mzk2._V1_.jpg"
                                alt=""
                            />
                            </Link>
                        </div>
                        <div>
                            <Link to={`/moviecategory/${'bahubali'}`}>
                            <img
                                className="h-auto max-w-full rounded-lg"
                                src="https://m.media-amazon.com/images/I/71i8a-PnChL._AC_UF1000,1000_QL80_.jpg"
                                alt=""
                            />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MovieCategory
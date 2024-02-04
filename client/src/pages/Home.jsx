import { useState } from "react";
import Nav from '../components/Nav'
import AuthModal from "../components/AuthModal"
import { useCookies } from "react-cookie"
export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken

  const handleClick = () => {
    if (authToken) {
      removeCookie('UserId', cookies.UserId)
      removeCookie('AuthToken', cookies.AuthToken)
      window.location.reload()
      return
    }
    setShowModal(true)
    setIsSignUp(true)
  }
  // state to manage the dark mode


  return (
    <div className="font-orka bg-[#9dc7e2] dark:bg-[#0B283B]">
      <Nav
        authToken={authToken}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="flex justify-around flex-row">
        <div className="flex flex-col justify-center items-center text-[#912626] dark:text-yellow-500">
          <div className="flex flex-row justify-center items-center text-[#912626] dark:text-yellow-500">
            <img className="eye h-[35vh]" src="/assets/eye.gif" />
            <h1 className="text-[30vh] font-orka drop-shadow-3xl">RCA</h1>
          </div>
          <p className="mr-80 ml-60 mb-64 text-2xl font-bold text-justify ">"Stop soloing and start jamming! Find your musical soulmate in a swipe."</p>
        </div>

        <img
          width={"450px"}
          className="music mb-28 mt-14" src="/assets/music.svg" alt=""
        />
      </div>

      {/* second components */}
      <div className="flex gap-20 items-center flex-col min-h-screen mb-20">
        <div className="text-center">
          <h1 className="text-[75.7px] text-[#100d54] dark:text-[#f4eccb] leading-tight font-orka">
            The Artists
            <br />
            have landed<a className="text-pink-700">.</a>
          </h1>
          <p className="text-xl px-40 mt-2 font-mono dark:text-orange-400">
            Art isn&apos;t just expression. It&apos;s politics, it&apos;s a dialogue, it&apos;s a debate. And with so much going on in the world, we artists can't help but have our say in matters of interest.
          </p>
        </div>
        <div className="wave" />
      </div>

      {/* third components */}
      <div className="flex gap-20  flex-col">
        <div
          id="login"
          className="text-center relative h-[100vh]">
          <h1 className="text-[75.7px] text-[#114e32] font-maliki dark:text-yellow-500 leading-tight">Signup</h1>
          <button className="bg-gray-900 dark:bg-slate-500 hover:bg-slate-500 font-mono text-white py-2 px-4 rounded-full mt-8" onClick={handleClick}>
            {authToken ? 'Signout' : 'Tune In →'}
          </button>
          {showModal && (
            <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
          )}
          <img className="absolute top-0 left-0 h-[25vh] rotate-12" src="/assets/orange.png" alt="Orange Image" />
          <img className="absolute top-0 right-0 h-[40vh]" src="/assets/3pg.svg" alt="3PG Image" />
          <img className="absolute bottom-0 left-0 h-[40vh] rotate-90" src="/assets/ray.svg" alt="Ray Image" />
          <img className="absolute bottom-0 right-0 h-[45vh]" src="/assets/mic.png" alt="Mic Image" />
        </div>
      </div>
    </div>
  );
}
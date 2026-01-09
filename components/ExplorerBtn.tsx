'use client';
import Image from "next/image"
const ExplorerBtn = () => {
  return (
    <>
    <button  type="button" className="mt-7 mx-auto" id='explore-btn' onClick={() => console.log('Explore clicked')}>
        <a href="#events">
            Explore Events
          <Image src="/icons/arrow-down.svg" alt="arrow-down" height={24} width={24}/>
        </a>
    </button>
    </>
  )
}

export default ExplorerBtn
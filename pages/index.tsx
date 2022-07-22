import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import Link from 'next/link'
import { Navbar } from '@components/layout/navbar'
import { MaxWidth } from '@components/layout/MaxWidth'
import { Email } from "@components/common/svg/Email";
import { Github } from '@components/common/svg/Github'

const Home: NextPageWithLayout = () => {
  return (<>
    <div className='px-2 lg:my-4 lg:flex lg:space-x-2'>
      <div className='flex mb-1'>
        <Email height={24} fill="currentColor" />
        <a className='ml-2' href='mailto: minjunsz@postech.ac.kr'>minjunsz@postech.ac.kr</a>
      </div>
      <div className='flex'>
        <Github height={24} fill="currentColor" />
        <a className='ml-2' href='https://github.com/minjunsz'>https://github.com/minjunsz</a>
      </div>
    </div>
    <hr className='my-4 border-black dark:border-white' />
    <div className='lg:flex my-2'>
      <div className='text-2xl font-bold border-b w-fit px-2 mb-4 lg:border-b-0 lg:w-64'>Research Interests</div>
      <div className='lg:flex-grow lg:ml-2 lg:border-l lg:pl-4 border-black dark:border-white'>
        <ol className='list-decimal ml-8 lg:ml-4'>
          <li>Graph generative model - inspired by Chemical intuition</li>
          <li>Graph representation learning</li>
          <li>Interpretable machine learning</li>
        </ol>
      </div>
    </div>
    <div className='my-2 lg:flex lg:mt-8'>
      <div className='text-2xl font-bold border-b w-fit px-2 mb-4 lg:border-b-0 lg:w-64'>Research Experience</div>
      <div className='lg:flex-grow lg:ml-2 lg:border-l lg:pl-4 border-black dark:border-white'>
        <ul className='ml-4 lg:ml-0'>
          <li className='my-2'>
            <div className='text-lg'>Total Synthesis Lab (Organic Chemistry)</div>
            <div className='pl-2 text-sm text-neutral-600 dark:text-neutral-400'>Research topic ......</div>
          </li>
          <li className='my-2'>
            <div className='text-lg'>Total Synthesis Lab (Organic Chemistry)</div>
            <div className='pl-2 text-sm text-neutral-600 dark:text-neutral-400'>Research topic ......</div>
          </li>
        </ul>
      </div>
    </div>
  </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Navbar>
      <MaxWidth>
        {page}
      </MaxWidth>
    </Navbar>
  )
}

export default Home

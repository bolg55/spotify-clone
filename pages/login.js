import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'

const Login = ({ providers }) => {
  return (
    <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
      <Image
        src='https://links.papareact.com/9xl'
        alt=''
        height='208'
        width='208'
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className='bg-[#2ED660] text-white p-5 rounded-full mt-5'
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

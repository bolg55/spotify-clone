import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'

const Sidebar = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <div className='pb-36 p-5 overflow-y-scroll text-xs h-screen lg:text-sm text-gray-500 border-r border-gray-900 scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex'>
      <div className='space-y-4'>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='w-5 h-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='w-5 h-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <LibraryIcon className='w-5 h-5' />
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />
        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='w-5 h-5' />
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='w-5 h-5 text-blue-500' />
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='w-5 h-5 text-green-500' />
          <p>Your Episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />

        {playlists.map((playlist) => (
          <p
            onClick={() => setPlaylistId(playlist.id)}
            key={playlist.id}
            className='cursor-pointer hover:text-white'>
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar

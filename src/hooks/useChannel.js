import { useState, useEffect } from 'react'
import { getChannelAPI } from '@/apis/article'
export function useChannel() {
  const [channelList, setChannelList] = useState([])
    useEffect(() => {
      const getChannelList = async () => {
        const res = await getChannelAPI()
        setChannelList(res.data.channels)
      }
      getChannelList()
    }, [])
  return {
      channelList
    }
}
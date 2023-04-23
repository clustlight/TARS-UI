import Card from '../components/Card'
import { Recording } from '../types/recording'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const getRecordings = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_TARS_SERVER_ENDPOINT}/recordings`)
  console.log(response.status)
  const data = await response.json()

  return data.recordings as Recording[]
}

export default function Home() {
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    getRecordings().then(data => {
      setRecordings(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <>
      <Head>
        <title>TARS-UI</title>
      </Head>

      <main className='mx-10 my-10 space-y-3'>
        <h3>・録画一覧 ({recordings?.length})</h3>

        <div>
          {isLoading && <div>Loading...</div>}
          <div className='grid grid-cols-5 gap-2 md:grid-cols-6 md:gap-10'>
            {recordings &&
              recordings.map(recording => <Card key={recording.live_id} recording={recording} />)}
          </div>
        </div>
      </main>
    </>
  )
}

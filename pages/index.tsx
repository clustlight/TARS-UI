import dayjs from 'dayjs'
import Card from '../components/Card'
import { Recording } from '../types/recording'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

const getRecordings = async (endpoint: string) => {
  const response = await fetch(`${endpoint}/recordings`)
  const data = await response.json()

  return data.recordings as Recording[]
}

const startRecording = async (endpoint: string, screen_id: string) => {
  const response = await fetch(`${endpoint}/recordings/${screen_id}`, {
    method: 'POST'
  })
  const data = await response.json()

  return data as Recording
}

const stopRecording = async (endpoint: string, screen_id: string) => {
  const response = await fetch(`${endpoint}/recordings/${screen_id}`, {
    method: 'DELETE'
  })

  const data = await response.json()

  return data
}

export default function Home() {
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [refresh, setRefresh] = useState<boolean>(false)
  const [updateAt, setUpdateAt] = useState<string>('---')

  const [endpoint, setEndpoint] = useState<string>('')

  const recordingInputRef = useRef<HTMLInputElement>(null)

  const intervalInputRef = useRef<HTMLInputElement>(null)
  const [intervalSec, setIntervalSec] = useState<number>(30)

  useEffect(() => {
    if (endpoint === '') {
      setEndpoint(`http://${window.location.hostname}:${window.location.port}`)
    }
    setUpdateAt('----/--/-- --:--:--')
    getRecordings(endpoint).then(data => {
      setRecordings(data)
      setUpdateAt(dayjs().format('YYYY/MM/DD HH:mm:ss'))
    })
    const interval = setInterval(() => {
      setRefresh(previous => !previous)
    }, intervalSec * 1000)
    return () => clearInterval(interval)
  }, [refresh, endpoint, intervalSec])

  return (
    <>
      <Head>
        <title>TARS-UI</title>
      </Head>

      <main className='mx-10 my-10 space-y-10'>
        <div className='flex w-1/2 items-center space-x-5 border-2 px-5 py-2'>
          <span>更新間隔 (秒)</span>
          <input
            type='text'
            ref={intervalInputRef}
            defaultValue='30'
            className='w-16 rounded-3xl border-2 border-indigo-200 bg-gray-100 px-5 py-0.5 outline-none focus:border-emerald-400'
          />
          <button
            className='rounded-2xl border-2 border-violet-400 px-4 py-1.5'
            onClick={() => {
              const data: number = Number(intervalInputRef.current?.value)
                ? Number(intervalInputRef.current?.value)
                : 30
              setIntervalSec(data)
            }}
          >
            設定
          </button>
          <span className='font-medium'>最終更新: {updateAt}</span>
        </div>
        <div className='flex space-x-4 py-5'>
          <h3 className='text-xl font-bold'>・録画タスク ({recordings?.length})</h3>
          <div className='space-x-5'>
            <input
              type='text'
              ref={recordingInputRef}
              className='rounded-3xl border-2 border-indigo-200 bg-gray-100 px-5 py-0.5 outline-none focus:border-emerald-400'
            />
            <button
              className='rounded-2xl border-2 border-blue-400 px-4 py-1.5'
              onClick={() => {
                startRecording(endpoint, recordingInputRef.current?.value as string)
                setRefresh(previous => !previous)
              }}
            >
              開始
            </button>
            <button
              className='rounded-2xl border-2 border-red-400 px-4 py-1.5'
              onClick={() => {
                stopRecording(endpoint, recordingInputRef.current?.value as string)
                setRefresh(previous => !previous)
              }}
            >
              終了
            </button>
            <button
              className='rounded-2xl border-2 border-violet-400 px-4 py-1.5'
              onClick={() => setRefresh(previous => !previous)}
            >
              更新
            </button>
          </div>
        </div>

        <div>
          <div className='grid grid-cols-5 gap-2 md:grid-cols-6 md:gap-10'>
            {recordings &&
              recordings.map(recording => <Card key={recording.live_id} recording={recording} />)}
          </div>
        </div>

        <div className='flex space-x-4 py-5'>
          <h3 className='text-xl font-bold'>・自動録画対象 (未実装)</h3>
          <div className='space-x-5'>
            <input
              type='text'
              className='rounded-3xl border-2 border-indigo-200 bg-gray-100 px-5 py-0.5 outline-none focus:border-emerald-400'
            />
            <button className='rounded-2xl border-2 border-blue-400 px-4 py-1.5'>追加</button>
            <button className='rounded-2xl border-2 border-red-400 px-4 py-1.5'>削除</button>
          </div>
        </div>
      </main>
    </>
  )
}

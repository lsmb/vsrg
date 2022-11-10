import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import Vrg from '../components/vrg'

import { getMapFile } from '../lib/getMap'

export async function getStaticProps() {
  const map = await getMapFile('/rainlord.osu')

  return {
    props: {
      map: map
    }
  }
}


export default function Home({ map }) {
  return (
    <Layout>
      <Head>
        <title>Hello</title>
      </Head>
      <Vrg map={map}></Vrg>
    </Layout>
  )
}


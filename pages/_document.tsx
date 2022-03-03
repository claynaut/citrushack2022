import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='description' content='Citrus Hack, a 24-hour hackathon hosted at University of California, Riverside.' />
          <link href='https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' rel='stylesheet' />
          <link rel='icon' href='/favicon.ico' />
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='512x512' href='/favicon-512x512.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
          <link rel='preload' as='image' href='/assets/logo.svg' />
          <link rel='preload' as='image' href='/assets/sponsors/gcap.svg' />
          <link rel='preload' as='image' href='/assets/sponsors/wolfram.svg' />
          <link rel='preload' as='image' href='/assets/sponsors/fedex.svg' />
          <link rel='preload' as='image' href='/assets/sponsors/sketch.svg' />
          <link rel='preload' as='image' href='/assets/sponsors/triad.svg' />
          <link rel='preload' as='image' href='/assets/sponsors/acm-ucr.svg' />
          <link rel='preload' as='image' href='/assets/sponsors/ieee.svg' />
          <link rel='preload' as='image' href='/assets/tracks/diversity-light.svg' />
          <link rel='preload' as='image' href='/assets/tracks/diversity-dark.svg' />
          <link rel='preload' as='image' href='/assets/tracks/sustainability-light.svg' />
          <link rel='preload' as='image' href='/assets/tracks/sustainability-dark.svg' />
          <link rel='preload' as='image' href='/assets/tracks/health-light.svg' />
          <link rel='preload' as='image' href='/assets/tracks/health-dark.svg' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

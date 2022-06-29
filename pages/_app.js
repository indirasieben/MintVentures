import '../styles/globals.css'
import '../styles/common.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import { IntlProvider } from 'react-intl'
import { useRouter } from 'next/router'
import * as locales from '../locales'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const { locale, defaultLocale, pathname, asPath } = router
    const localeCopy = locales[locale]
    const messages = localeCopy[pathname]

    //ant design国际化
    const antLocale = locale === 'zh' ? zhCN : enUS

    return (
        <ConfigProvider locale={antLocale}>
            <IntlProvider
                locale={locale}
                defaultLocale={defaultLocale}
                messages={messages}
            >
                <>
                    <Head>
                        <title>mint ventures</title>
                        <meta name="google-site-verification" content="92_Trto-mgAwm26m9U7hlhhD-Q30X8RCY1aGFzGWWDY" />
                        <meta name="robots" content="index,follow,noodp"></meta>
                        <meta name="keywords" content="cryptocurrency investing,value investing,defi,funding,blockchain vc,degen vc,web3 investing"></meta>
                        <meta name="Description" CONTENT="Driven by deep thinking, Mint Ventures focuses on cryptocurrency and early stage blockchain start-up."></meta>
                    </Head>
                    <Component {...pageProps} />
                </>
            </IntlProvider>
        </ConfigProvider>
    )
}

export default MyApp

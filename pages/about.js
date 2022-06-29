import 'styles/about.less'
import { useIntl } from 'react-intl'
import { Layout, Button, Anchor, Row, Col } from 'antd'
import Footer from 'components/footer'
import { useRouter } from 'next/router'

const { Header, Content } = Layout
const { Link } = Anchor
export default function About(props) {
    //国际化
    const { formatMessage } = useIntl()
    const f = (id) => formatMessage({ id })
    const router = useRouter()
    const localChange = (e) => {
        switch (e) {
            case 'en':
                window.location.href = '/about'
                break
            case 'zh':
                window.location.href = '/en/about'
                break
        }
    }
    return (
        <>
            <Layout>
                <Header className="about-header">
                    <div id="logo">
                        <img
                            src="/images/logo-horizontal.svg"
                            alt=""
                            onClick={() => {
                                router.push('/#home')
                            }}
                        />
                    </div>
                    <div
                        className="lang-btn"
                        onClick={() => {
                            localChange(props.locale)
                        }}
                    >
                        <span>{f('locale')}</span>
                    </div>
                    <Anchor
                        affix={false}
                        offsetTop={120}
                        style={{ float: 'right', paddingRight: 50 }}
                        onClick={(e, link) => {
                            router.push('/' + link.href)
                        }}
                    >
                        <Link href="#home" title={f('home')} />
                        <Link href="#portfolio" title={f('portfolio')} />
                        <Link href="#team" title={f('team')} />
                        <Link href="#insights" title={f('insights')} />
                        <Link href="#contact_us" title={f('contractUs')} />
                    </Anchor>
                </Header>
            </Layout>
            <div
                className="about"
                style={{ maxWidth: props.locale == 'zh' ? '60rem' : '71rem' }}
            >
                <p className="title">{f('aboutUs')}</p>
                <p className="title-info">
                    {f('aboutUsDesc1')}
                    <br /> {f('aboutUsDesc2')}
                    <br />
                    {f('aboutUsDesc3')}
                </p>
                <div className="info-box">
                    <div className="info-item">
                        <div className="info-img info-img1">
                            <div className="info-tit">
                                <p>{f('our')}</p>
                                <p>{f('strengh')}</p>
                            </div>
                        </div>
                        <div className="info-content">
                            <p>{f('ourStrenghDesc1')}</p>
                            <p>{f('ourStrenghDesc2')}</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-img info-img2">
                            <div className="info-tit">
                                <p>{f('our')}</p>
                                <p>{f('belief')}</p>
                            </div>
                        </div>
                        <div className="info-content">
                            <p>{f('ourBeliefDesc1')}</p>
                            <p>{f('ourBeliefDesc2')}</p>
                            <p>{f('ourBeliefDesc3')}</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-img info-img3">
                            <div className="info-tit">
                                <p>{f('investment')}</p>
                                <p>{f('philosophy')}</p>
                            </div>
                        </div>
                        <div className="info-content">
                            <p>{f('investmentPhilosophyDesc1')}</p>
                            <p>{f('investmentPhilosophyDesc2')}</p>
                            <p>{f('investmentPhilosophyDesc3')}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export async function getStaticProps({ locale }) {
    return {
        props: {
            locale,
        },
    }
}

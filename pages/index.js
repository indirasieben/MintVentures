import { Layout, Button, Anchor, Row, Col, message } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import 'styles/Index.less'
import { useIntl } from 'react-intl'
import { protfolio } from 'data/protfolio'
import { teamDataEn, teamDataZh } from 'data/team'
import Footer from 'components/footer'
import { useRouter } from 'next/router'

const { Header, Content } = Layout
const { Link } = Anchor

export default function Home(props) {
    const [list, setList] = useState({ row: [] })
    const { locale } = props
    useEffect(async () => {
        try {
            const result = await fetch(`/api/insight/${locale}`)
            const data = await result.json()
            setList(data)
        } catch (e) {}
    }, [])
    //国际化
    const { formatMessage } = useIntl()
    const f = (id) => formatMessage({ id })
    const router = useRouter()

    const urlClick = (url) => {
        if (url) {
            window.open(url)
        }
    }
    const localChange = (e) => {
        switch (e) {
            case 'zh':
                window.location.href = '/'
                break
            case 'en':
                window.location.href = '/zh/'
                break
        }
    }
    const [showSubmit, setShowSubmit] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [submitData, setSubmitData] = useState({
        firstName: '',
        lasttName: '',
        email: '',
    })
    useEffect(async () => {
        if (isSubmit) {
            try {
                const result = await fetch('/api/subscribe', {
                    method: 'POST',
                    body: JSON.stringify(submitData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (result.status == 200) {
                    setShowSubmit(false)
                    message.success(f('submitSuccess'))
                } else {
                    message.error(f('submitError'))
                }
            } catch (e) {}
            setIsSubmit(false)
        }
    }, [isSubmit])
    useEffect(() => {
        if (!showSubmit) {
            document.getElementById('FirstName').value = ''
            document.getElementById('LastName').value = ''
            document.getElementById('eMail').value = ''
        }
    }, [showSubmit])
    return (
        <Layout className="mint">
            <Header className="header">
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
                >
                    <Link href="#home" title={f('home')} />
                    <Link href="#portfolio" title={f('portfolio')} />
                    <Link href="#team" title={f('team')} />
                    <Link href="#insights" title={f('insights')} />
                    <Link href="#contact_us" title={f('contractUs')} />
                </Anchor>
            </Header>
            <Layout>
                <Content id="home">
                    <div className="mint-home">
                        <div>
                            <p className="mint-desc">
                                <span>{f('homeDesc1')}</span>
                                <span>{f('homeDesc2')}</span>
                            </p>
                            <Button
                                type="primary"
                                onClick={() => {
                                    router.push('/about')
                                }}
                            >
                                {f('aboutUs')}
                            </Button>
                        </div>
                    </div>
                </Content>
                <Content id="portfolio">
                    <MintGridLabel
                        enName="portfolio"
                        color={['01c1a4', '00dfc2']}
                        name={f('portfolio')}
                    />
                    <PortfolioCom
                        params={props.protfolio}
                        urlClick={urlClick}
                    />
                </Content>
                <Content id="team">
                    <MintGridLabel
                        enName="team"
                        color={['474541', '8b8c8e']}
                        name={f('team')}
                    />
                    <TeamCom params={props.teams} />
                </Content>
                <Content id="insights">
                    <MintGridLabel
                        enName="insights"
                        color={['648493', '8eb0bf']}
                        name={f('insights')}
                    />
                    <InsightsCom
                        params={list.rows}
                        urlClick={urlClick}
                        locale={locale}
                    />
                </Content>
                <Content>
                    <ContactUsCom
                        onContract={() => {
                            setShowSubmit(true)
                        }}
                    />
                    <Footer />
                </Content>
                <SubscribeSubmit
                    showSubmit={showSubmit}
                    submitData={submitData}
                    onSubmit={() => {
                        let firstName =
                            document.getElementById('FirstName').value
                        let lastName = document.getElementById('LastName').value
                        let email = document.getElementById('eMail').value
                        //对电子邮件的验证
                        var emailreg =
                            /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
                        if (!firstName || !lastName || !email) {
                            message.warning(f('inputError'))
                            return
                        }
                        if (!emailreg.test(email)) {
                            message.warning(f('emailError'))
                            return false
                        }
                        setSubmitData({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                        })
                        setIsSubmit(true)
                    }}
                    onClose={() => {
                        setShowSubmit(false)
                    }}
                />
            </Layout>
        </Layout>
    )
}

function MintGridLabel({ name, color, enName }) {
    return (
        <div className="mint-box">
            <div
                className="box-left mint-grid-label"
                style={{
                    backgroundImage: `linear-gradient(to right, #${color[0]}, #${color[1]})`,
                }}
            >
                <span>{name}</span>
                <div className="bottom-triangle"></div>
                <img
                    className="image-left"
                    src={`/images/${enName}_left.png`}
                    alt=""
                />
                <img
                    className="image-right"
                    src={`/images/${enName}_right.png`}
                    alt=""
                />
            </div>
            <div
                className="box-right"
                style={{
                    backgroundImage: `linear-gradient(to right, #${color[1]}, #${color[0]})`,
                }}
            >
                <div className="top-triangle"></div>
            </div>
        </div>
    )
}

function PortfolioCom({ params, urlClick }) {
    //国际化
    const { formatMessage } = useIntl()
    const f = (id) => formatMessage({ id })
    const allKeys = Object.keys(params)
    return (
        <div className="mint-portfolio">
            {allKeys.map((itemKey, indexKey) => {
                return (
                    <div className="portfolio-box" key={itemKey}>
                        <div className="portfolio-label">
                            <span>{f(itemKey)}</span>
                            <span className="portfolio-border"></span>
                        </div>
                        <div className="portfolio-img">
                            <Row>
                                {params[itemKey].map((item, index) => {
                                    return (
                                        <Col
                                            xxl={6}
                                            xl={6}
                                            lg={8}
                                            md={8}
                                            sm={12}
                                            xs={12}
                                            className="portfolio-item"
                                            key={itemKey + index}
                                        >
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                onClick={() => {
                                                    urlClick(item.link)
                                                }}
                                            />
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function TeamCom({ params }) {
    return (
        <div className="mint-team">
            {params.map((item, index) => {
                return (
                    <div className="team-card" key={index}>
                        <div
                            className="team-info"
                            style={{
                                backgroundImage: `url(${item.img})`,
                            }}
                        >
                            <div className="team-role">
                                {item.role.map((r, rI) => {
                                    return <span key={item.name + rI}>{r}</span>
                                })}
                            </div>
                            <div className="team-name">{item.name}</div>
                        </div>
                        <div className="team-desc">
                            <span className="email">{item.email}</span>
                            <span className="desc">{item.desc}</span>
                            <span className="subDesc">{item.subDesc}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function InsightImg({ src }) {
    const [img,setImg] = useState(src);
    const onImgError = () => {
        setImg(null);
    }
    return (
        <div className="insights-img">
            {img ? (
                <img src={img} alt="" onError={onImgError} />
            ) : (
                <div className="insights-none-img">
                    <img src="/images/logo-horizontal.svg" alt="" />
                </div>
            )}
        </div>
    )
}

function InsightsCom({ params, urlClick, locale }) {
    //国际化
    const { formatMessage } = useIntl()
    const f = (id) => formatMessage({ id })
    return (
        <div className="mint-insights">
            {params &&
                params.map((item, index) => {
                    let desc = item.desc.replace(/<[^>]+>/g, '')
                    desc =
                        desc.length > 300
                            ? `${desc.substring(0, 300)}...`
                            : desc
                    return (
                        <div
                            className="insights-box"
                            key={index}
                            onClick={() => {
                                urlClick(item.link)
                            }}
                        >
                            <InsightImg src={item.img}/>
                            <div className="insights-info">
                                <span
                                    className="insights-title"
                                    title={item.title}
                                >
                                    {item.title}
                                </span>
                                <span className="insights-desc">{desc}</span>
                                <span className="insights-time">
                                    {item.postAt}
                                </span>
                            </div>
                        </div>
                    )
                })}
            <div className="insights-more">
                <div
                    className="btn-more"
                    onClick={() => {
                        const url = locale === 'zh' ? 'https://www.chainnews.com/u/518693287595.htm' : 'https://mint-ventures.medium.com';
                        urlClick(url);
                    }}
                >
                    {f('more')}
                </div>
            </div>
        </div>
    )
}

function ContactUsCom({ onContract }) {
    //国际化
    const { formatMessage } = useIntl()
    const f = (id) => formatMessage({ id })
    return (
        <div className="mint-contract-us">
            <div className="contract-us-box">
                <div className="contract-us-head" id="contact_us">
                    <span>{f('contractUs')}</span>
                    <img
                        className="image-left"
                        src={`/images/contact_us_left.png`}
                        alt=""
                    />
                    <img
                        className="image-right"
                        src={`/images/contact_us_right.png`}
                        alt=""
                    />
                </div>
                <span className="contract-us-desc">{f('contractDesc')}</span>
                <span className="contract-us-email">{f('contractEmail')}</span>
                <span className="contract-us-subdesc">
                    {f('contractSubDesc')}
                </span>
                <div className="contract-us-more">
                    <div className="btn-more" onClick={onContract}>
                        {f('contractBtn')}
                    </div>
                </div>
            </div>
        </div>
    )
}
function SubscribeSubmit({ showSubmit, submitData, onSubmit, onClose }) {
    //国际化
    const { formatMessage } = useIntl()
    const f = (id) => formatMessage({ id })
    return (
        <div
            className="subscribe-mask"
            style={{ display: showSubmit ? 'block' : 'none' }}
        >
            <div className="subscribe-submit-box">
                <div className="subscribe-submit-box-tit">
                    <span>{f('contractBtn')}</span>
                    <span
                        className="subscribe-submit-box-tit-close"
                        onClick={() => {
                            onClose()
                        }}
                    >
                        +
                    </span>
                </div>
                <div className="subscribe-submit-box-content">
                    <div className="subscribe-submit-box-content-item">
                        <p>{f('firstName')}</p>
                        <input id="FirstName" type="text" />
                    </div>
                    <div className="subscribe-submit-box-content-item">
                        <p>{f('lastName')}</p>
                        <input id="LastName" type="text" />
                    </div>
                    <div className="subscribe-submit-box-content-item">
                        <p>{f('eMail')}</p>
                        <input id="eMail" type="text" />
                    </div>
                    <div className="subscribe-submit-box-content-btnbox">
                        <Button
                            className="submit-btn"
                            type="primary"
                            onClick={() => {
                                onSubmit()
                            }}
                        >
                            {f('submitBtn')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export async function getStaticProps({ locale }) {
    const teams = locale === 'en' ? teamDataEn : teamDataZh
    return {
        props: {
            locale,
            teams,
            protfolio,
        },
    }
}

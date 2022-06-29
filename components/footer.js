import '../styles/footer.less'
import { Popover } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Footer() {
    const router = useRouter()

    return (
        <div className="footer">
            <div className="footer-logo">
                <Image
                    src="/images/footer/footer_logo.png"
                    width={220}
                    height={74}
                />
            </div>
            <div className="footer-contet">
                <p className="copy-right">
                    All rights reserved. Copyright © 2022, Mint Ventures.
                </p>
                <div className="icon-box">
                    <div className="icon">
                        <Image
                            src="/images/footer/medium.png"
                            width={48}
                            height={48}
                            onClick={() => {
                                window.open('https://medium.com/@Mint-Ventures')
                            }}
                        />
                    </div>
                    <div className="icon">
                        <Image
                            src="/images/footer/twitter.png"
                            width={48}
                            height={48}
                            onClick={() => {
                                window.open('https://twitter.com/mintventures2')
                            }}
                        />
                    </div>
                    <div className="icon">
                        <Popover
                            content={
                                <div>
                                    <Image
                                        src="/images/footer/qrcode_weixin.jpg"
                                        width={180}
                                        height={180}
                                    />
                                </div>
                            }
                            trigger="hover"
                        >
                            <Image
                                src="/images/footer/weixin.png"
                                width={48}
                                height={48}
                            />
                        </Popover>
                    </div>
                    <div className="icon">
                        <Image
                            src="/images/footer/m.png"
                            width={48}
                            height={48}
                            onClick={() => {
                                window.open(
                                    'https://mirror.xyz/mintventures.eth'
                                )
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

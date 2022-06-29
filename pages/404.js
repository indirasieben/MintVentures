import styles from '../styles/error.module.css'
import Image from 'next/image'
import { Button } from 'antd'
import { useRouter } from 'next/router'

export default function Custom404() {
    const router = useRouter()

    return (
        <div className={styles.error}>
            <Image
                src="/images/404.png"
                alt="404"
                width={344}
                height={344}
            />
            <p>页面不存在</p>
            <Button
                type="primary"
                size="large"
                shape="round"
                onClick={() => {
                    router.push(`/`)
                }}
            >
                返回首页
            </Button>
        </div>
    )
}

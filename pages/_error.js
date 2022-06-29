import styles from '../styles/error.module.css'
import Image from 'next/image'
import { Button } from 'antd'
import { useRouter } from 'next/router'

function Error({ statusCode }) {
    const router = useRouter()
    return (
        <div className={styles.error}>
            <Image src="/images/500.png" alt="500" width={344} height={344} />
            <p>系统出错啦</p>
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

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error

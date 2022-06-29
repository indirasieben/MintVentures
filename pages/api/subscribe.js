const winston = require('winston')

const logFileMaxSize = 1024 * 1024 * 100;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'subscribe.log',
            //最大100mb
            maxsize: logFileMaxSize
        }),
    ],
})

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        const { firstName, lastName, email } = req.body
        if (!email || !firstName || !lastName) {
            res.status(500).json({
                err: '请输入有效信息',
            })
        } else {
            logger.info({
                firstName,
                lastName,
                email
            });
            res.status(200).end()
        }
    } else {
        // Handle any other HTTP method
        res.status(405).json({
            err: 'only allow post',
        })
    }
}

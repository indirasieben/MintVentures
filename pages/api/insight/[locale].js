export default async function handler(req, res) {
    const {locale} = req.query;
    let url = '';
    if(locale === 'zh') {
        url = `https://www.gxchain.org/app/29/data/list/news?_page=1&_limit=5`;
    } else {
        url = 'https://www.gxchain.org/app/29/data/list/news?_page=1&_limit=5&lang=en';
    }
    const result = await fetch(url);
    if(result.status == 200) {
        const data = await result.json();
        res.status(200).json(data);
    } else {
        res.status(500).json({
            err: '服务异常'
        });
    }
}
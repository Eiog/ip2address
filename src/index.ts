import express from 'express'
import Searcher from '../Searcher.js'
const dbPath = './data/ip2region.xdb'
type result = {
    region: string
    ioCount: number
    took: number
}
type address = {
    country?: string
    region?: string
    province?: string
    city?: string
    ISP?: string
}
const PORT = process.env.PORT || 3701
const app = express()
app.get('/', async (req, res) => {
    const ip = req.query.ip || ''
    if (!ip) return res.status(500).send('ip is notfind')
    try {
        // 创建searcher对象
        const searcher = Searcher.newWithFileOnly(dbPath)
        // 查询
        const data = await searcher.search('1.190.214.2') as result
        const ipData: address = {
            country: data.region.split('|')[0],
            region: data.region.split('|')[1],
            province: data.region.split('|')[2],
            city: data.region.split('|')[3],
            ISP: data.region.split('|')[4],
        }
        res.send({
            ip: ip,
            address: data.region,
            addr: ipData,
        })
    } catch (e) {
        res.status(500).send('error')
    }

})
app.listen(PORT, async () => {
    console.info(`App is running at http://localhost:${PORT}`)
})
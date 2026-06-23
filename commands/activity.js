import axios from 'axios'
import fs from 'node:fs'
import template from '../templates/activity.js'

export default async (event) => {
  try {
    const { data } = await axios.get(
      'https://cloud.culture.tw/frontsite/opendata/activityOpenDataJsonAction.do?method=doFindActivitiesByCategory&category=1',
    )

    const bubbles = data.slice(0, 5).map((item) => {
      const bubble = template()

      const info = item.showInfo && item.showInfo.length > 0 ? item.showInfo[0] : {}

      bubble.hero.url =
        'https://scontent.ftpe7-1.fna.fbcdn.net/v/t39.30808-6/711115666_1457846263049290_3238636369839614209_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=p526x296&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9hGkn3YHCYYQ7kNvwEwj5Ey&_nc_oc=Adq2rZktzxg4FMu6sqvzmx48ey4mRXpX8QOMMNRh0vpD_Nh-CzQHImWtL1ARDmbyOJY&_nc_zt=23&_nc_ht=scontent.ftpe7-1.fna&_nc_gid=PYZv8HvtDZp9ExfWZw71SA&_nc_ss=7b289&oh=00_Af--FcnOLO7CDcGbw7vqem69gIg6rI7d_y-ztGJUm0ey0Q&oe=6A356E9B' ||
        'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600'

      bubble.body.contents[0].text = item.title

      const nameText = info.locationName || '詳見官網'
      const locationText = info.location || info.locationName || '詳見官網'
      bubble.body.contents[1].contents[0].text = `地點：${nameText}`
      bubble.body.contents[1].contents[1].text = `地址：${locationText}`
      bubble.body.contents[1].contents[2].text = `時間：${item.startDate} ~ ${item.endDate}`

      bubble.footer.contents[0].action.uri =
        item.sourceWebPromote || item.webSales || 'https://www.culture.tw/'

      return bubble
    })

    const message = {
      type: 'flex',
      altText: '文化活動查詢結果',
      contents: {
        type: 'carousel',
        contents: bubbles,
      },
    }

    const result = await event.reply(message)

    if (process.env.DEBUG && result.message) {
      fs.writeFileSync('./dump/activity.json', JSON.stringify(message, null, 2))
    }
  } catch (error) {
    console.error(error)
    event.reply('目前無法取得活動資訊，請稍後再試。')
  }
}

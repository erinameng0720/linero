import 'dotenv/config'
import linebot from 'linebot'
import axios from 'axios'
import { distance } from './distance.js'
import commandActivity from './commands/activity.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})

bot.on('message', async (event) => {
  try {
    if (event.message.type === 'text') {
      if (event.message.text === '活動') {
        await commandActivity(event)
      } else {
        await event.reply(event.message.text)
      }
    } else if (event.message.type === 'location') {
      const { data } = await axios.get(
        'https://cloud.culture.tw/frontsite/opendata/activityOpenDataJsonAction.do?method=doFindActivitiesByCategory&category=1',
      )

      const result = data
        .map((value) => {
          const info = value.showInfo && value.showInfo.length > 0 ? value.showInfo[0] : {}

          value.distance = distance(
            parseFloat(info.latitude),
            parseFloat(info.longitude),
            event.message.latitude,
            event.message.longitude,
            'K',
          )

          value.locationName = info.locationName || '詳見官網'
          value.address = info.location || '詳見官網'
          return value
        })
        .sort((a, b) => {
          if (isNaN(a.distance)) return 1
          if (isNaN(b.distance)) return -1
          return a.distance - b.distance
        })
        .slice(0, 3)
        .map((value) => {
          return `🌟 ${value.title}\n📍 地點：${value.locationName}\n🏛️ 地址：${value.address}\n🚗 距離：${value.distance.toFixed(2)} 公里`
        })

      console.log(result)

      await event.reply(result.join('\n\n'))
    }
  } catch (error) {
    console.error('發生錯誤:', error)
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

export default () => ({
  type: 'bubble',
  hero: {
    type: 'image',
    url: 'https://scontent.ftpe7-1.fna.fbcdn.net/v/t39.30808-6/711115666_1457846263049290_3238636369839614209_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=p526x296&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9hGkn3YHCYYQ7kNvwEwj5Ey&_nc_oc=Adq2rZktzxg4FMu6sqvzmx48ey4mRXpX8QOMMNRh0vpD_Nh-CzQHImWtL1ARDmbyOJY&_nc_zt=23&_nc_ht=scontent.ftpe7-1.fna&_nc_gid=PYZv8HvtDZp9ExfWZw71SA&_nc_ss=7b289&oh=00_Af--FcnOLO7CDcGbw7vqem69gIg6rI7d_y-ztGJUm0ey0Q&oe=6A356E9B',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover',
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      { type: 'text', text: '活動名稱', weight: 'bold', size: 'xl', wrap: true },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'sm',
        contents: [
          { type: 'text', text: '地點：', size: 'sm', color: '#666666', wrap: true },
          { type: 'text', text: '地址：', size: 'sm', color: '#666666', wrap: true },
          { type: 'text', text: '時間：', size: 'sm', color: '#666666', wrap: true },
        ],
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'button',
        style: 'link',
        action: { type: 'uri', label: '活動詳情', uri: 'https://www.culture.tw/' },
      },
      {
        type: 'button',
        style: 'link',
        height: 'sm',
        action: {
          type: 'uri',
          label: '文化部官網',
          uri: 'https://www.moc.gov.tw/',
        },
      },
    ],
  },
})

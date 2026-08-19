import yts from 'yt-search'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`Contoh:\n${usedPrefix + command} judul lagu`)
  }

  try {
    let search = await yts(text)
    let videos = search.videos

    if (!videos.length) {
      return m.reply('Tidak ditemukan')
    }

    let video = videos[0]

    let caption = `
「 Play Music 」

🍓 ${video.title}
🧃 ${video.timestamp || '-'} • ${video.seconds}s
🍰 ${formatNumber(video.views)} views
🍡 ${video.author.name}${video.author.verified ? ' ✓' : ''}
🗓️ ${video.ago || '-'}

▬▬▬▬▬▬▬▬▬▬

pilih yaa 🍹♡
`.trim()

    await conn.sendMessage(m.chat, {
      image: { url: video.thumbnail },

      caption,

      footer: '𝗠𝗘𝗚𝗔𝗠𝗜 𝗠𝗗 𝗠𝗨𝗟𝗧𝗜 𝗗𝗘𝗩𝗜𝗖𝗘',

      optionText: '🍹 PILIH',
      optionTitle: '🍓 SELECT',

      nativeFlow: [
        {
          text: '🍹 PILIH FORMAT',
          sections: [
            {
              title: '🍓 LIST',
              rows: [
                {
                  title: '🍹 MUSIK',
                  description: '🍓 Audio MP3',
                  id: `.ytmp3 ${video.url}`
                },
                {
                  title: '🥤 VIDEO',
                  description: '🍉 Video MP4',
                  id: `.ytmp4 ${video.url}`
                },
                {
                  title: '🧃 LIRIK',
                  description: '🍒 Lyrics lagu',
                  id: `.lyrics ${video.title}`
                }
              ]
            }
          ]
        }
      ]

    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('Error bang')
  }
}

handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^(play)$/i

export default handler

function formatNumber(num = 0) {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
  return num.toString()
}
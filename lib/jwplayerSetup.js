// eslint-disable
export default function jwplayerSetup ({ id, file, image } = {}) {
  if (process.client) {
    // get rid all unnecesary jwplayer script
    const existingPlayer = document.getElementById('lr-jwplayer')
    if (existingPlayer != null) {
      existingPlayer.remove()
    }

    const jwplayer = document.createElement('script')
    jwplayer.setAttribute('id', 'lr-jwplayer')

    jwplayer.text = `
        jwplayer('${id}').setup({ 
        "file": "${file}", 
        "image": "${image}",
        "autostart": "viewable",
        "controls": false,
        })
    `

    document.body.appendChild(jwplayer)
  }
}

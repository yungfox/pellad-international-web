const INTERVAL_BETWEEN_CHARACTERS_MS = 150
const IDLE_TIME_MS = 2000

const text_latin = 'PELLAD'
const text_cyrillic = 'Пеллад'
const text_katagana = 'ペラド'
const text_arabic = 'بيلاد'

const order = ['latin', 'cyrillic', 'katagana', 'arabic']

window.onload = async () => {
    const latin = document.getElementById('latin')
    const cyrillic = document.getElementById('cyrillic')
    const katagana = document.getElementById('katagana')
    const arabic = document.getElementById('arabic')

    let i = 0
    let j = 0

    const build = async (el, text) => {
        return await new Promise((resolve, reject) => {
            const loop = setInterval(() => {
                if (i < text.length) {
                    el.innerHTML = text.slice(0, i + 1)
                    i++
                } else {
                    clearInterval(loop)
                    resolve()
                }
            }, INTERVAL_BETWEEN_CHARACTERS_MS)
        })
    }

    const destroy = async (el, text) => {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                const loop = setInterval(() => {
                    if (i > 0) {
                        el.innerHTML = text.slice(0, i - 1)
                        i--
                    } else {
                        clearInterval(loop)
                        resolve()
                    }
                }, INTERVAL_BETWEEN_CHARACTERS_MS)
            }, IDLE_TIME_MS)
        })
    }

    const draw = async (el, text) => {
        latin.style.display = 'none'
        cyrillic.style.display = 'none'
        katagana.style.display = 'none'
        arabic.style.display = 'none'

        el.style.display = 'flex'
        await build(el, text)
              .then(async () => await destroy(el, text))
    }

    while (true) {
        switch (order[j]) {
            case 'latin':
                await draw(latin, text_latin)
                break
            case 'cyrillic':
                await draw(cyrillic, text_cyrillic)
                break
            case 'katagana':
                await draw(katagana, text_katagana)
                break
            case 'arabic':
                await draw(arabic, text_arabic)
                break
            default:
                break
        }
        i = 0
        if (j < order.length)
            j++
        else
            j = 0
    }
}

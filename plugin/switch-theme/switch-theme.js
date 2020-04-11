// inspired by https://gist.github.com/jbrown123/9445384733c9f289d6e8

const getThemeElement = () => document.getElementsByClassName('theme')[0]

const setTheme = (href) => {
  const link = getThemeElement()

  if (link.getAttribute('href') === href) {
    return
  }

  const linkClone = link.cloneNode()
  linkClone.setAttribute('href', href)
  // insert the new link element *before* the old one, so that it's targeted when this function is called again
  link.insertAdjacentElement('beforebegin', linkClone)
  // wait a little to give browser time to repaint newly loaded styles
  setTimeout(() => {
    link.parentNode.removeChild(link)
  }, 100)
}

const switchTheme = (event) => {
  if (!switchTheme.defaultTheme) {
    switchTheme.defaultTheme = getThemeElement().getAttribute('href')
  }

  const { currentSlide } = event
  const { dataset, parentNode } = currentSlide
  const currentTheme = dataset.theme

  if (!currentTheme && parentNode.nodeName == 'SECTION' && parentNode.dataset.theme) {
    currentSlide.dataset.theme = parentNode.dataset.theme
  }

  if (currentTheme) {
    setTheme(`css/theme/${currentTheme}.css`)
  } else if (event.previousSlide?.dataset.theme) {
    setTheme(switchTheme.defaultTheme)
  }
}

Reveal.addEventListener('slidechanged', switchTheme)
Reveal.addEventListener('ready', switchTheme)

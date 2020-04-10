// inspired by https://gist.github.com/jbrown123/9445384733c9f289d6e8

const setTheme = (href) => {
  document.getElementById('theme').setAttribute('href', href)
}

const switchTheme = (event) => {
  if (!switchTheme.defaultTheme) {
    switchTheme.defaultTheme = document.getElementById('theme').getAttribute('href')
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

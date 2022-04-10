(() => {
  window.onload = () => {
      const messageEl = document.createElement('p')
      messageEl.textContent = 'この文章はJavaScriptによって追加されたものです'

      const app = document.querySelector('#app')
      app.appendChild(messageEl)
  }
})()

import Module from './module.js'

window.onload = () => {
    const messageEl = document.createElement('p')
    messageEl.textContent = Module.message()

    const app = document.querySelector('#app')
    app.appendChild(messageEl)
}

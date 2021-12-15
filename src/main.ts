import { createApp } from "vue"
import router from "./router"
import store from "./store"
import App from "./App.vue"
import "normalize.css"
import "./assets/css/index.scss"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import { setupStore } from "./store"
import { globalRegister } from "./global"

// console.log("hello")
const app = createApp(App)
console.log(process.env.VUE_APP_API)
app.use(store)
setupStore()
app.use(router)
app.use(ElementPlus)
app.use(globalRegister)

app.mount("#app")

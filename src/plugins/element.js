import Vue from 'vue'
import {
    Carousel,
    CarouselItem,
    Pagination,
    Tabs,
    TabPane,
    Message,
    MessageBox,
	Tooltip
} from 'element-ui'
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tooltip)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
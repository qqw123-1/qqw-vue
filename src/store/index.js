import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        name: '张三',
        number: 0
    },
    getters: {
        getName(state) {
            return 'third ' + state.name
        },
        getNumber(state) {
            return 'third ' + state.number
        }
    },
    mutations: {
        setName(state, payload) {
          state.name = payload.name
        },
        setNumber(state, payload) {
          state.number = payload.number
        }
    },
    actions: {
        setName(content, payload) {
            return new Promise(resolve => {
                setTimeout(() => {
                    content.commit('setName', {name: payload.name})
                    resolve()
                }, 1000)
            })
        },
        setNumber(content, payload) {
            return new Promise(resolve => {
                setTimeout(() => {
                    content.commit('setNumber', {number: payload.number})
                    resolve()
                }, 2000)
            })
        }
    }
})

export default store
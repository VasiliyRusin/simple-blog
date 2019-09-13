export default {
    namespaced: true,

    state: {
        name: null
    },

    mutations: {
        login (state, {name}) {
            state.name = name;

            localStorage.setItem('user', JSON.stringify(state));
        },

        logout (state) {
            state.name = null;

            localStorage.removeItem('user');
        }
    },

    getters: {
        isAuth (state) {
            return state.name != null;
        }
    }
}

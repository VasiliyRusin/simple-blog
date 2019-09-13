import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/user";
import blog from "@/store/blog";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        blog
    }
});

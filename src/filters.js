import Vue from "vue";
import momentjs from "moment";

momentjs.locale('ru');

export function moment (value, format = "DD MMMM YYYY") {
    return momentjs(value).format(format)
}

export function momentFrom (value) {
    return momentjs(value).fromNow()
}

Vue.filter('moment', moment);

Vue.filter('momentFrom', momentFrom);

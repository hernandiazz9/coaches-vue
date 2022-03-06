import { createStore } from "vuex";
import coachesModule from "./modules/coaches";
import requestModule from "./modules/request";
import action from "./action";

const store = createStore({
  modules: {
    coaches: coachesModule,
    request: requestModule,
  },
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      didAutoLogout: false,
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuth(state) {
      return !!state.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
  },
  actions: action,
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
    },
    didAutoLogout(state) {
      state.didAutoLogout = true;
    },
  },
});

export default store;

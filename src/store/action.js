let timer;
console.log(timer);
export default {
  async login(context, payload) {
    context.dispatch("auth", { ...payload, mode: "login" });
  },
  async signup(context, payload) {
    context.dispatch("auth", { ...payload, mode: "singup" });
  },
  async logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiration");

    clearTimeout(timer);
    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoZ8KkipV7iOt39ZYUFtolg6XrPdC8lkk`;
    if (mode === "singup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoZ8KkipV7iOt39ZYUFtolg6XrPdC8lkk";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to auth");
      throw error;
    }
    const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("expiration", expirationDate);

    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expiration = localStorage.getItem("expiration");

    const expiresIn = +expiration - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }
    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token,
        userId,
      });
    }
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("didAutoLogout");
  },
};

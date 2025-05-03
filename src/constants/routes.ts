export const AUTH_ROUTES = {
    LANDING: {
        name: "index",
        path: "/",
        type: "auth",
    },
    LOGIN: {
        name: "login",
        path: "/login",
        type: "auth",
    },
    SIGNUP: {
        name: "signup",
        path: "/signup",
        type: "auth",
    },
    FORGOT_PASSWORD: {
        name: "forgotPassword",
        path: "/forgotPassword",
        type: "auth"
    },
    VERIFY_OTP: {
        name: "verifyOTP",
        path: "/verifyOTP",
        type: "auth"
    }
};

export const SEEKER_ROUTES = {
    HOME: {
        name: "index",
        path: "/",
        type: "seeker",
    },
    CLASS: {
        name: "class",
        path: "/class",
        type: "seeker",
    },
    GURUS: {
        name: "gurus",
        path: "/gurus",
        type: "seeker",
    },
    CHAT: {
        name: "chat",
        path: "/chat",
        type: "seeker"
    }
};

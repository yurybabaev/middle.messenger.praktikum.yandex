import "./index.scss";
import login from "../src/pages/login/login";
import register from "../src/pages/register/register";
import mockMain from "../src/pages/mockMain/mockMain";
import userView from "../src/pages/user/userView/userView";
import userEdit from "../src/pages/user/userEdit/userEdit";
import userChangePassword from "../src/pages/user/userChangePassword/userChangePassword";
import chat from "../src/pages/chat/chat";
import system from "../src/pages/system/system";

const setHtml = (html) => {
    document.getElementById("root").innerHTML = html;
}

const route = window.location.pathname.toLowerCase();
const setContent = (pathStart) => (tplFunc, ...params) => {
    route === pathStart && setHtml(tplFunc.apply(null, params));
}

setContent("/")(mockMain,
    {
        links: [
            { text: "Main", url: "/" },
            { text: "Login", url: "/login" },
            { text: "Register", url: "/register" },
            { text: "User info", url: "/user/view" },
            { text: "User edit", url: "/user/edit" },
            { text: "User change password", url: "/user/changePassword" },
            { text: "Chat", url: "/chat" },
            { text: "404", url: "/404" },
            { text: "500", url: "/500" },
        ]
    });
setContent("/login")(login);
setContent("/register")(register);
setContent("/user/view")(userView);
setContent("/user/edit")(userEdit);
setContent("/user/changepassword")(userChangePassword);
setContent("/chat")(chat);
setContent("/404")(system, 404, "No such page");
setContent("/500")(system, 500, "Something went wrong");

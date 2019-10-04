const toggle = document.querySelector("#toggle");

const themes = {
    blue: {
        "--theme-background-color":
            "linear-gradient(0deg, #0047c8 0%, #0080d4 75%)",
        "--theme-text-color": "#f8e71c",
        "--theme-single-hover-background-color": "#0266c1",
        "--theme-single-background-color": "#0047C8",
        "--theme-single-shadow": "0px 2px 8px 2px rgba(0, 0, 0, 0.1)"
    },
    dark: {
        "--theme-background-color":
            "linear-gradient(0deg,rgba(0, 0, 0, 1) 0%, rgba(57, 57, 67, 1) 75%)",
        "--theme-text-color": "#0085ff",
        "--theme-single-hover-background-color": "#111112",
        "--theme-single-background-color": "#18181d",
        "--theme-single-shadow": "0px 2px 12px 2px rgba(0, 0, 0, 0.4)"
    }
};

const setTheme = () => {
    if (typeof (Storage) !== "undefined" && localStorage.theme !== undefined) {
        const theme = JSON.parse(localStorage.theme);
        Object.keys(theme.theme).map(key => {
            document.documentElement.style.setProperty(key, theme.theme[key]);
        });
        toggle.checked = theme.toggled;
    }
};

const storeTheme = (theme, toggled) => {
    if (typeof (Storage) !== "undefined") {
        localStorage.theme = JSON.stringify({theme, toggled});
    }
};

const toggleTheme = e => {
    if (e.target.checked) {
        Object.keys(themes.blue).map(key => {
            document.documentElement.style.setProperty(key, themes.blue[key]);
        });
        storeTheme(themes.blue, e.target.checked);
    } else {
        Object.keys(themes.dark).map(key => {
            document.documentElement.style.setProperty(key, themes.dark[key]);
        });
        storeTheme(themes.dark, e.target.checked);
    }
};

toggle.addEventListener("change", toggleTheme);
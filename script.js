const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const toggle = document.getElementById("toggle");
const remember = document.getElementById("remember");
const errorEl = document.getElementById("error");
const submitBtn = form.querySelector(".signin");

const saved = localStorage.getItem("panda_user");
if (saved) {
    username.value = saved;
    remember.checked = true;
}

toggle.addEventListener("click", () => {
    const show = password.type === "password";
    password.type = show ? "text" : "password";
    toggle.classList.toggle("on", show);
    toggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
});


//validation + submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorEl.textContent = "";

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username.value.trim());
    if (!emailOk) return fail("Enter a valid email address.", username);

    if(password.value.length < 6)
           return fail("Password must be at least 6 charcaters.", password);

        remember.checked ? localStorage.setItem("panda_user", username.value.trim()) : localStorage.removeItem("panda_user");

        submitBtn.classList.add("loading");
        submitBtn.textContent = "Signing in.....";

        setTimeout(() => {
            submitBtn.classList.remove("loading");
            submitBtn.textContent = "Sign In";
            alert("Sign in as " + username.value.trim());   
        }, 900);
});

function fail(msg, field) {
    errorEl.textContent = msg;
    field.focus();
}

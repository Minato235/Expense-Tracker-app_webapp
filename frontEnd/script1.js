
async function login1(e) {
    console.log("logins")
    try {
        e.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        const loginDetails = {
            email,
            password
        }
        console.log(loginDetails);
        const responce = await axios.post("http://localhost:3000/user/login1",loginDetails)
        .then(responce=>{
            alert(responce.data.message);
            console.log(responce.data);
            localStorage.setItem("token",responce.data.token);
                        window.location.href="../frontEnd/login3.html";


        })
  
    } catch (err) {
        console.log(JSON.stringify(err))
        document.body.innerHTML += '<h1>not worked EROOR</h1>'
    }
}
function forgotpassword() {
    window.location.href = "../frontEnd/forgot.html"
}
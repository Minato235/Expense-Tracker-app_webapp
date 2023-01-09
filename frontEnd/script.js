async function login(e) {
    console.log("sss")
    try {
        e.preventDefault();
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        const obj = {
            name,
            email,
            password
        }
        console.log(obj);
        const responce = await axios.post("http://localhost:3000/user/login", obj);
        if (responce.status === 201) {
            alert("Signup succes!!!")
            // alert(responce.data.message)
        } else {
            throw new Error("Failed to login")
        }
    } catch (err) {
        document.body.innerHTML += '<h1>not worked EROOR</h1>'
    }
}

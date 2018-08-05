module.exports = {
    register: ()=>{
        const username = document.querySelector('input[name=username]').value,
              email = document.querySelector('input[name=email').value,
              password = document.querySelector('input[name=password').value

        fetch('/register',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body :JSON.stringify({
                username,
                email,
                password
            })
        })
        .then((response)=>{
            console.log(response)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
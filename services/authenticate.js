import axios from 'axios'

export async function signUp(username,email,password) {
    const response = await axios.post("https://ctime.hcmut.live/users",{
        username:username,
        email: email,
        password: password,
    })
    const message=response.data.message
    const token=response.data.token;
    const id = response.data.id
    return {message:message, token:token,id:id};
  

}

export async function login(email,password) {
    const response = await axios.post("https://mobile-be.vercel.app/login",{
        email: email,
        password: password,
    })
    const message=response.data.message
    const token=response.data.token;
    const id = response.data.id;
    return {message:message, token:token,id:id};

}

// export async function forgotPassword(phone,email){
//     const response = await axios.post("https://mobile-be.vercel.app/",{
//         phone: phone,
//         email: email,
//     })
//     const message=response.data.message
//     const sentEmail = response.data.email
//     return {message:message, sentEmail:sentEmail};
// }
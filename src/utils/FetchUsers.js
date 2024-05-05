const url = 'https://monitoringpersuratan-production.up.railway.app/api'

const Login = async(email,password) => {
    const response = await fetch(url+'/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    });
    const json = await response.json();
    return json
}

export {Login}
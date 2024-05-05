const url = 'https://monitoringpersuratan-production.up.railway.app/api'
const GetSuratMasuk = async() => {
    const response = await fetch(url+'/show-admin-letters',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    const json = await response.json();
    return json
}

const GetDetailSuratMasuk = async(id) => {
    const response = await fetch(url+'/show-detail-letters/'+id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    const json = await response.json();
    return json
}

const DeleteSuratMasuk = async(id) => {
    const response = await fetch(url+'/delete-letter/'+id,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    const json = await response.json();
    return json
}
const PostSuratMasuk = async (data) => {
    const response = await fetch(url+'/add-letters',{
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: data
    });
    const json = await response.json();
    return json
}

const PutSuratMasuk = async (data,id) => {
    const response = await fetch(url+'/update-letter/'+id,{
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: data
    });
    const json = await response.json();
    return json
}
export {GetSuratMasuk,GetDetailSuratMasuk,PostSuratMasuk,PutSuratMasuk,DeleteSuratMasuk}
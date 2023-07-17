import backendUrl from '../baseUrl'
const getData = async(path='')=>{
    try {
        const res = await fetch(`${backendUrl}/${path}`,{method:"GET", headers:{"Content-Type":"application/json"},credentials:"include"})
        const data = await res.json()
        return {status:res.status,data:data}
    } catch (error) {
        return {status:400,data:{massage:"Network Error"}}
    }
}

export default getData;
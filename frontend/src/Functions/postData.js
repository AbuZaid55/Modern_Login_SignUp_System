import backendUrl from '../baseUrl'
const postData = async(path,data='')=>{
   try {
        const res = await fetch(`${backendUrl}/${path}`,{method:"POST", headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(data)})
        const Data = await res.json()
        return {status:res.status,data:Data}
   } catch (error) {
    return {status:400,data:{massage:"Network Error"}}
   }
}

export default postData;

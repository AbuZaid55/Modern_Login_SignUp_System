const sendError = (res,massage,status=400)=>{
    res.status(status).json({massage:massage})
}
const sendSuccess = (res,massage,user,status=200)=>{
    if(user){
        res.status(status).json({massage:massage,user:user})
    }else{
        res.status(status).json({massage:massage})
    }
}

module.exports = {
    sendError,
    sendSuccess,
};
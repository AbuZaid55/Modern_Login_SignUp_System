const otpMailTemplate = (otp)=>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        *{
            box-sizing: border-box;
        }
        h1{
            font-size: 100px;
            font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            color: #613cf3;
            width: 100%;
            text-align: center;
        }
        @media (min-width: 300px) and (max-width: 600px) {
        h1{
            font-size: 80px;
        }
        }
        @media (min-width: 200px) and (max-width: 300px) {
        h1{
            font-size: 50px;
        }
        }
        @media (min-width: 100px) and (max-width: 200px) {
        h1{
            font-size: 30px;
        }
        }
        @media only screen and (max-width: 100px) {
        h1{
            font-size: 20px;
        }
        }
    
        </style>
    </head>
    <body>
        <div>
            <h1>${otp}</h1>
        </div>
    </body>
    </html>`
}

const greetingMailTemplate = (massage) =>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            *{
                box-sizing: border-box;
                text-decoration: none;
                text-align: center;
            }
            h1{
                font-size: 70px;
                font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                color: #613cf3;
                width: 100%;
            }
            p{
                font-size: 20px;
            }
            button{
                font-size: 20px;
                background-color: #613cf3;
                border: 1px solid #5938df;
                border-radius: 2px;
                padding: 10px;
            }
            @media (min-width: 300px) and (max-width: 600px) {
            h1{
                font-size: 35px;
            }
            p{
                font-size: 20px;
            }
            button{
                font-size: 10px;
                padding: 7px;
            }
            }
            @media (min-width: 200px) and (max-width: 300px) {
            h1{
                font-size: 25px;
            }
            p{
                font-size: 15px;
            }
            button{
                font-size: 10px;
                padding: 5px;
            }
            }
            @media (min-width: 100px) and (max-width: 200px) {
            h1{
                font-size: 15px;
            }
            p{
                font-size: 10px;
            }
            button{
                font-size: 8px;
                padding: 5px;
            }
            }
            @media only screen and (max-width: 100px) {
            h1{
                font-size: 10px;
            }
            p{
                font-size: 5px;
            }
            button{
                font-size: 6px;
                padding: 4px;
            }
            }
        </style>
    </head>
    <body>
        <div>
            <h1>Congratulations!</h1>
            <p>${massage}</p>
            <button type="button"><a style="color: white;" href=${process.env.FRONTEND_URL}>Go to homepage</a></button>
        </div>
    </body>
    </html>`
}
const linkSendMailTemplate = (link) =>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            *{
                box-sizing: border-box;
                text-decoration: none;
                text-align: center;
            }
            h1{
                font-size: 70px;
                font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                color: #613cf3;
                width: 100%;
            }
            button{
                font-size: 20px;
                background-color: #613cf3;
                border: 1px solid #5938df;
                border-radius: 2px;
                padding: 10px;
            }
            @media (min-width: 300px) and (max-width: 600px) {
            h1{
                font-size: 35px;
            }
            button{
                font-size: 10px;
                padding: 7px;
            }
            }
            @media (min-width: 200px) and (max-width: 300px) {
            h1{
                font-size: 25px;
            }
            button{
                font-size: 10px;
                padding: 5px;
            }
            }
            @media (min-width: 100px) and (max-width: 200px) {
            h1{
                font-size: 15px;
            }
            button{
                font-size: 8px;
                padding: 5px;
            }
            }
            @media only screen and (max-width: 100px) {
            h1{
                font-size: 10px;
            }
            button{
                font-size: 6px;
                padding: 4px;
            }
            }
        </style>
    </head>
    <body>
        <div>
            <h1>Change your password</h1>
            <button type="button"><a style="color: white;" href=${link}>Open Link</a></button>
        </div>
    </body>`
}


module.exports = {
    otpMailTemplate,
    greetingMailTemplate,
    linkSendMailTemplate,
}
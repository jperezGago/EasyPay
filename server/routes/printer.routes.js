const express = require('express')
const router = express.Router()

// Llamada npm
const yly = require("../printer/printer-config")
const _ = require('lodash')
const repeat = require('repeat-string')


router.post('/printer', (req, res, next) => {




    console.log("IM PRINTER");
    const { table_id, order, time, username, product, totalPrice } = req.body
    const config = new yly.Config({
        'cid': '1066021322',         //Id Usuario
        'secret': '695e18c9f33320552d71e95f30d9c798'       //API secret
    })
    const oauthClient = new yly.OauthClinet(config)


    /**
  * Toma las credenciales de la llamada ( método ejecuta sola una vez solo una vez)
  */

    oauthClient.getToken()
        .then(responsoOAUTHTOKEN => {
            if (
                responsoOAUTHTOKEN.error != 0 &&
                responsoOAUTHTOKEN.error_description != 'success'
            ) {
                throw new Error('failed:' + responsoOAUTHTOKEN.error_description);
            }
            const tokenData = {
                'accessToken': responsoOAUTHTOKEN.body.access_token,
                'refreshToken': responsoOAUTHTOKEN.body.refresh_token,
            };

            console.log(responsoOAUTHTOKEN.body)
            if (_.isEmpty(responsoOAUTHTOKEN.body.machine_code)) {
                tokenData.machineCode = responsoOAUTHTOKEN.body.machine_code;
            }
            // tokenData.machineCode = '4004557775' // no es necesario 
            const RpcClient = new yly.RpcClient(tokenData, config);
            const Print = new yly.Print(RpcClient);

            console.log(RpcClient)

            // Comprobar si se cambia el tiempo , esto no se esta ejecutando ahora, mirar final del codigo 
            // const expiresTime = parseInt(new Date().getTime() / 1000) +

            //     responsoOAUTHTOKEN.body.expires_in - 86400;


            let content = `<FS2><center>Mesa #${table_id}</center></FS2>`
            content += `<FS2><center>--Cliente ${username}--</center></FS2>`
            content += repeat('.', 32);
            content += "<FS2><center>--CASA PEPE--</center></FS2>"
            content += "<center>By Popino</center>"
            content += `Fecha:${time}\n`
            content += `Pedido:${order}\n`
            content += repeat('*', 8) + "Pedido" + repeat("*", 8) + '\n'
            content += product + '\n'
            content += repeat('.', 32)
            content += "<QR>这是二维码内容</QR>"
            content += 'Total a pagar:' + totalPrice + '$' + '\n'
            content += repeat('*', 32)




            Print.index('4004557775', 'pepe123', content)
                .then(res => { console.log(res) })
                .catch(err => console.log(err))

            // MRedis.set('tokenData', JSON.stringify(tokenData), 'EX', expiresTime)
            // MRedis.quit();
            res.json({ msg: success })
        })




})






module.exports = router
// Llamada npm
const yly = require("./printer-config")
const _ = require('lodash')
const repeat = require('repeat-string')


console.log("IM PRINTER");
const config = new yly.Config({
    'cid': '67441',         //Id Usuario
    'secret': '1ddd04774cf2840d1f91be83a598230e435e182f'       //API secret
})
const oauthClient = new yly.OauthClinet(config)

/**
 * Toma las credenciales de la llamada ( método ejecuta sola una vez solo una vez)
 */

oauthClient.getToken()
    .then(responsoOAUTHTOKEN => {
        console.log(responsoOAUTHTOKEN.error)
        console.log(responsoOAUTHTOKEN.error_description)
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


        let content = "<FS2><center>**#1 PEPE**</center></FS2>";
        content += repeat('.', 32);
        // content += "<FS2><center>--FUNCIONA--</center></FS2>";
        // content += "<FS><center>BY POPINO</center></FS>";
        // content += "订单时间:2018-12-27 16:23\n";
        // content += "订单编号:40807050607030\n";
        content += repeat('*', 14) + "商品" + repeat("*", 14);
        content += "<table>";
        content += "<tr><td>烤土豆(超级辣)</td><td>x3</td><td>5.96</td></tr>";
        // content += "<tr><td>烤豆干(超级辣)</td><td>x2</td><td>3.88</td></tr>";
        // content += "<tr><td>烤鸡翅(超级辣)</td><td>x3</td><td>17.96</td></tr>";
        // content += "<tr><td>烤排骨(香辣)</td><td>x3</td><td>12.44</td></tr>";
        // content += "<tr><td>烤韭菜(超级辣)</td><td>x3</td><td>8.96</td></tr>";
        content += "</table>";
        content += repeat('.', 32);
        // content += "<QR>这是二维码内容</QR>";
        content += "小计:￥82\n";
        content += "折扣:￥４ \n";
        content += repeat('*', 32);
        content += "订单总价:￥78 \n";
        // content += "<FS2><center>**#1 完**</center></FS2>";


        Print.index('4004557775', 'pepe123', content)
            .then(res => { console.log(res) })
            .catch(err => console.log(err))



        // MRedis.set('tokenData', JSON.stringify(tokenData), 'EX', expiresTime)
        // MRedis.quit();
    })

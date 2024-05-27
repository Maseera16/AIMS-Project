function checkAuthentication(username='' , password='' ) {
    const childProcess = require('node:child_process');
    //  SQL COMMAND
    let cmd = `mysql -u ${username} -p${password} -e " SELECT CURRENT_USER() "`;
    //  OUTPUT
    let std = "";
    let Auth = false;
    if (password == '') { return false; }
    if (username == '') { return false; }

    try { std = childProcess.execSync(cmd); }
    catch { return Auth }
    let chUser = std.includes(username);
    if (chUser) {
        Auth = true;
    }
    // console.log(chUser, std, Auth);
    return Auth;
}

exports.chAuth = checkAuthentication;
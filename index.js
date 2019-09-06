#!/usr/bin/env node

//上面告诉他是用node去跑这个包
/**
 * Module dependencies.
 */


var program = require('commander');
var child_process = require('child_process');

function collect(val, memo) {
    memo.push(val);
    return memo;
}

let cliName = ''; //脚手架名称
let allArgs = []; //所有参数
//使用command 
program.version('0.1.0').arguments('<arg> [otherArgs...]').action(function (arg, otherArgs) {
    cliName = arg;
    if (!cliName) {
        console.log('need input type(vue or react)');
        process.exit();
    }
    if (otherArgs) {
        otherArgs.forEach(function (oDir) {
            allArgs.push(oDir);
        });
    }
});

program.parse(process.argv);

console.log(allArgs);


//查询vue-cli版本
console.log(`search desktop ${cliName}-cli...`);
child_process.exec(`${cliName == 'vue'?'vue':'create-react-app'} --version`, (error, stdout, stderr) => {
    console.log(error, stdout, stderr);
    if (error) {
        console.log(`not find ${cliName}-cli`);
        //install vue-cli
        installCli().then(() => {
            console.log('install success');
            useCli();
        })
    } else {
        useCli();
    }
})

//安装vue-cli

function installCli() {
    return new Promise((resolve, reject) => {
        console.log(`open install ${cliName}-cli`);
        var ls = child_process.exec(cliName == 'vue' ? 'npm install -g @vue/cli' : 'npm install -g create-react-app', (error, stdout, stderr) => {
            console.log(error, stdout, stderr);
            //安装成功
            if (error) {
                console.log('install failed');
            } else {
                console.log(`install success ${cliName}-cli version ${stdout}`)
                resolve();
            }
        })
        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    })
}

//使用vue-cli进行操作
function useCli() {
    console.log(`open ${cliName}-cli...`);
    console.log(`start ${cliName} ${allArgs.join(' ')}`);
    child_process.exec(`start ${cliName == 'vue'?'vue':'create-react-app'} ${allArgs.join(' ')}`, (error, stdout, stderr) => {}); //这里不对
    setTimeout(() => {
        console.log('please create your dir');
        process.exit();
    }, 200);
}
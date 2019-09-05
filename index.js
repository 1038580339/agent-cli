 /**
  * Module dependencies.
  */

 var program = require('commander');
 const child_process = require('child_process');

 function collect(val, memo) {
     memo.push(val);
     return memo;
 }

 let cliName = '';//脚手架名称
 let allArgs = []; //所有参数
 //使用command 
 program.version('0.1.0').arguments('<arg> [otherArgs...]').action(function (arg, otherArgs) {
    cliName = arg;
     if (otherArgs) {
         otherArgs.forEach(function (oDir) {
             allArgs.push(oDir);
         });
     }
 });

 program.parse(process.argv);

 console.log(allArgs);


 //查询vue-cli版本
 console.log(`search desktop ${cliName}-cli...`)
 child_process.exec(`${cliName == 'vue'?'vue':'build-react'} --version`, (error, stdout, stderr) => {
     console.log(error, stdout, stderr);
     if (error) {
         console.log(`not find ${cliName}-cli`);
         //install vue-cli
         installCli().then(() => {
             console.log('成功跑到这里');
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
         child_process.exec(cliName == 'vue'?'npm install -g @vue/cli':'npm install -g build-react', (error, stdout, stderr) => {
             console.log(error, stdout, stderr);
             //安装成功
             if (error) {
                 console.log('install failed');
             } else {
                 console.log(`install success ${cliName}-cli version ${stdout}`)
                 resolve();
             }
         })
     })
 }

 //使用vue-cli进行操作
 function useCli() {
     console.log(`open ${cliName}-cli...`);
     console.log(`start ${cliName} ${allArgs.join(' ')}`);
     var workerProcess = child_process.exec(`start ${cliName == 'vue'?'vue':'build-react'} ${allArgs.join(' ')}`, (error, stdout, stderr) => {});//这里不对
     setTimeout(() => {
         console.log('please create your dir');
         process.exit();
     }, 200)
 }
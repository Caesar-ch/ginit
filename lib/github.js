const CLI = require('clui');
const Configstore = require('configstore');
const Spinner = CLI.Spinner;
const { Octokit } = require("@octokit/rest")
const { createTokenAuth } = require('@octokit/auth-token');

const inquirer = require('./inquirer');
const pkg = require('../package.json');
// const Configstore = require('configstore');
// const conf = new Configstore('ginit');
// 如果configstore文件不存在，他会返回一个空对象并且在后台创建一个文件。
// 如果文件存在，你可以直接利用里面的内容。你现在可以根据需要直接修改conf对
// 象的属性。同时，你也不需要担心怎么去保存它，它自己会处理好的。提示：在macOS
// 系统上，文件将会保存在/Users/[YOUR-USERNME]/.config/configstore/ginit.json下。
// 在Linux系统上文件保存在/home/[YOUR-USERNME]/.config/configstore/ginit.json。

// 初始化本地的存储配置
const conf = new Configstore(pkg.name);

// 模块内部的单例
let octokit;

module.exports = {
    // 获取实例
    getInstance: () => {
        return octokit;
    },

    // 获取本地token
    getStoredGithubToken: () => {
        return conf.get('github.token');
    },

    // 通过个人账号信息获取token
    getPersonalAccessToken: async () => {
        const credentials = await inquirer.askGithubCredentials();
        // 创建一个loading效果很简单：clui的命令
        const status = new Spinner('验证身份中，请等待...');

        status.start();

        const auth = createTokenAuth(credentials.token);

        try {
            const res = await auth();
            if (res.token) {
                conf.set('github.token', res.token);
                return res.token;
            } else {
                throw new Error('GitHub token was not found in the response');
            }
        } finally {
            status.stop();
        }
    },

    // 通过token登陆
    githubAuth: (token) => {
        octokit = new Octokit({
            auth: token, 
        });
        // octokit.rest.users.getAuthenticated()
        //     .then(({ data }) => {
        //         console.log("Token is valid, user login is: ", data.login);
        //     })
        //     .catch(err => {
        //         console.error("Token validation failed, error: ", err);
        //     });
    },
    
    deleteToken: () => { 
        if(conf.get('github.token')) {
            conf.delete('github.token');
        }
    }
};

#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');

const files = require('./lib/files'); // 引入文件操作模块【1.当前工作目录 2.是否存在某文件】
const github = require('./lib/github');
const repo = require('./lib/repo');

// 清除命令行
clear();

// 输出Logo
console.log(chalk.yellow(figlet.textSync('Ginit', { horizontalLayout: 'full' })));
const deleteFile = async() => {
    let res = await files.deleteFile('.git')
    return res
}

// 获取github token
const getGithubToken = async () => {
    // 从本地获取token记录
    let token = github.getStoredGithubToken();
    if (token) {
        return token;
    }

    // 通过账号、密码获取token
    token = await github.getPersonalAccessToken();
    return token;
};

const run = async () => {
    try {
        
        if (files.directoryExists('.git')) {
            console.log(chalk.red('已经存在一个本地仓库!'));
            const res = await deleteFile()
            if (!res) {
                process.exit();
            }
        }

        // 获取token
        const token = await getGithubToken();
        github.githubAuth(token);
        const instance = github.getInstance()
        const isLogin = await instance.rest.users.getAuthenticated()
        console.log(chalk.green('Token is valid, user login is: ', isLogin.data.login));
        // 创建远程仓库
        const url = await repo.createRemoteRepo();

        // 创建 .gitignore
        await repo.createGitignore();

        // 初始化本地仓库并推送到远端
        await repo.setupRepo(url);

        console.log(chalk.green('All done!'));
    } catch (err) {
        if (err) {
            switch (err.status) {
                case 401:
                    console.log(chalk.red("登陆失败，请提供正确的登陆信息"));
                    github.deleteToken()
                    break;
                case 422:
                    console.log(chalk.red('远端已存在同名仓库'));
                    break;
                default:
                    console.log(chalk.red(err));
            }
        }
    }
};

run();

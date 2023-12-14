const inquirer = require('inquirer');
const path = require('path');

module.exports = {
    // 是否删除已有本地已有仓库
    deleteExistRepo: () => { 
        return inquirer.prompt([
            {
                name: 'delete',
                type: 'confirm',
                message: '是否删除已有的仓库?',
                default: false
            }
        ])
    },
    // 询问git账号信息
    askGithubCredentials: () => {
        const questions = [
            {
                name: 'token',
                type: 'input',
                message: '请输入你的个人访问token:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return '请输入你的个人访问token';
                    }
                },
            },
            // {
            //     name: 'username',
            //     type: 'input',
            //     message: '请输入你的git账号或邮箱地址:',
            //     validate: function (value) {
            //         if (value.length) {
            //             return true;
            //         } else {
            //             return '请输入你的git账号或邮箱地址.';
            //         }
            //     },
            // },
            // {
            //     name: 'password',
            //     type: 'password',
            //     message: '请输入你的密码:',
            //     validate: function (value) {
            //         if (value.length) {
            //             return true;
            //         } else {
            //             return '请输入你的密码.';
            //         }
            //     },
            // },
        ];
        // 通过inquirer.prompt()向用户询问一系列问题，我们将这些问题以数组的形式传
        // 递给函数prompt。每一问题都由一个对象构成，其中，name表示该字段的名称，type
        // 表示我们要使用控件类型，message是我们要展示给用户的话，validate是校验用户
        // 输入字段的函数。
        return inquirer.prompt(questions);
    },

    // 询问双重认证码
    getTwoFactorAuthenticationCode: () => {
        return inquirer.prompt({
            name: 'twoFactorAuthenticationCode',
            type: 'input',
            message: '请输入你的双重认证验证码:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return '请输入你的双重认证验证码:.';
                }
            },
        });
    },

    // 询问仓库详细信息
    askRepoDetails: () => {
        const argv = require('minimist')(process.argv.slice(2));

        const questions = [
            {
                type: 'input',
                name: 'name',
                message: '请输入git仓库名称:',
                default: argv._[0] || path.basename(process.cwd()),
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return '请输入git仓库名称.';
                    }
                },
            },
            {
                type: 'input',
                name: 'description',
                default: argv._[1] || null,
                message: '请输入仓库描述（选填）:',
            },
            {
                type: 'list',
                name: 'visibility',
                message: '共有仓库 或 私有仓库:',
                choices: ['public', 'private'],
                default: 'public',
            },
        ];
        return inquirer.prompt(questions);
    },

    // 选择需要忽略的文件
    askIgnoreFiles: (fileList) => {
        const questions = [
            {
                type: 'checkbox',
                name: 'ignore',
                message: '请选择你想要忽略的文件:',
                choices: fileList,
                default: ['node_modules', 'bower_components'],
            },
        ];
        return inquirer.prompt(questions);
    },
};

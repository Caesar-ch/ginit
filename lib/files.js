const fs = require('fs');
const path = require('path');
const inquirer = require('./inquirer');

// 删除文件
const deleteFolderRecursive = async function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
          var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
      }
  };

module.exports = {
    // // 获取目录名称
    // gettss: () => {
    //     return path.basename(process.cwd());
    // },
    // 判断目录是否存在
    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    },
    deleteFile: async (filePath) => {
        const res = await inquirer.deleteExistRepo()
        if(res.delete) {
            await deleteFolderRecursive(filePath)
            return true
        } else {
            return false
        }
    },
};

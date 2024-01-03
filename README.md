# Build a JavaScript Command Line Interface (CLI) with Node.js

Node is a great choice for building command line tools.
In this tutorial, James Hibbard and Lukas White show you how to build a Node CLI which interacts with the GitHub API.

Article URL: https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/

## Requirements

* [Node.js](http://nodejs.org/)
* [Git](https://git-scm.com/)
* [GitHub account](https://github.com/)

## Installation Steps (if applicable)

1. Clone repo
2. Run `npm install`
3. Install the module globally with `npm install -g` from within the project directory
4. Run `ginit <repo-name> <longer repo description>`

## License

The MIT License (MIT)

Copyright (c) 2020 SitePoint

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```
"bin": {
        "ginit": "./index.js"
    }, 解释一下这个是干嘛的
这是一个在package.json文件中常见的字段，它定义了一些可执行的脚本命令。

bin: 这个字段用于指定项目的二进制入口。当你全局安装一个npm包时，如果该包中的package.json文件中定义了bin字段，那么npm会在全局环境下生成一个软链接，并指向这个二进制入口。之后就可以直接在命令行里面使用这个命令了。

"ginit": "./index.js": 这表示"ginit"是你设置的命令名称，当运行"ginit"时, 实际上就会运行"./index.js"这个文件。注意"./index.js"应该是你项目根目录下的一个JavaScript文件。

例如，在终端或者命令提示符中输入"ginit",将会执行当前项目根目录下名为 "index.js" 的JavaScript 文件.

但请注意，要想让此功能正常工作, 你需要通过 npm link 命令来创建软链接或者将包全局安装到你的系统上.

图片链接：https://zhuanlan.zhihu.com/p/142933475
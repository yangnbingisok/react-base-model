'''
h5打包脚本
'''

import os
import sys

#引入模块
sys.path.append(os.path.abspath(os.path.join(__file__,"../../..")))
import engine
from engine.shell_handle import *
from engine.GitEngine import *
from engine.FileHandle import *
from engine.version_hadle import *
from engine.exception_hancle import *
from engine.str_handle import *
from engine.npm_handle import *
from engine.workspace_cache import *
from engine.h5_upload_engine import *

k_project_folder = "yh-visual-site/"

class PackProcess():
    def __init__(self):
        # 获取到的参数

        self.branchName = obtain_env("InputBranchName")  # 分支名称
        self.packerEnvironment = obtain_env("InputPackerEnvironment")  # 对应环境

        try:
            self.uploadCDN = obtain_env("InputUploadCDN")
        except TypeError:
            self.uploadCDN = "false"

        self.projectPath = obtainWorkspace()  # 项目路径

        self.verifyParameter()
        self.projectSwitch()
        self.buildProject()
        self.uploadToServer()
        self.notiWechat()

    '''参数验证'''
    def verifyParameter(self):

        verify_except(notEmptyString(self.branchName))
        verify_except(notEmptyString(self.packerEnvironment))
        verify_except(notEmptyString(self.uploadCDN))

        if self.uploadCDN == "true":
            self.uploadCDN = "yes"
        else:
            self.uploadCDN = "no"
        FileHandle.verifyPath(self.projectPath)

    '''项目同步，切换分支'''
    def projectSwitch(self):
        gitPath = GitEngine(self.projectPath)
        gitPath.cleanGit()
        gitPath.switchBranch(self.branchName)
        gitPath.pullGit()

    def buildProject(self):

        #删除dist文件夹
        distPath = "./dist"
        if os.path.exists(distPath):
            FileHandle.delete_folder(distPath)
        FileHandle.createFileFolder(distPath)

        if os.path.exists("./node_modules"):
            FileHandle.delete_folder("./node_modules")
        if os.path.exists("./package-lock.json"):
            FileHandle.delete_folder("./package-lock.json")


        # nodelModulesCache = NodemodulesCache()
        # nodelModulesCache.projectFolder = self.projectPath
        # cacheSuccess = nodelModulesCache.useCache()
        # if cacheSuccess:
        #     print("使用缓存...")
        # else:
        #     shell_check_call("npm install")
        #     # 加载成功，缓存node_modules
        #     nodelModulesCache.cache()

        shell_check_call("npm install")

        if self.uploadCDN == "yes":
            #需要上传....所以修改七牛的配置
            CDNConfigPath = "./CDNConfig.js"
            cmdStr = "sed -ig \"/AccessKey: /s/AccessKey: '[a-zA-Z-]*'/AccessKey: 'rqLh8BpwLdcGV-176gGueGEK3EAYpE0sg-TaASlT'/g\" " + CDNConfigPath
            shell_check_call(cmdStr)

            cmdStr = "sed -ig \"/SecretKey: /s/SecretKey: '[a-zA-Z-]*'/SecretKey: 'UiUBP4KH0zbPa2O15B5VM5RNbPv2fO7r6qHu6olC'/g\" " + CDNConfigPath
            shell_check_call(cmdStr)

        print("打包项目.....")

        cmdStr = "npm run dll && npm run build  -- --env=" + self.packerEnvironment;


        shell_check_call(cmdStr)


    def uploadToServer(self):
        print("上传到服务端.....")
        if self.uploadCDN == "yes":
            print("上传CDN删除assets")
            shell_check_call("rm -rf ./dist/assets")
        serverFolderName = self.packerEnvironment

        h5uploadAndFolder("dist", serverFolderName, k_project_folder)


    def notiWechat(self):
        pass

if __name__ == '__main__':

    # # 测试代码
    # os.environ['WORKSPACE'] = "/Users/ios_team/Customize/jenkins/jobs/yh_h5_tv_dev/workspace"
    # os.environ['InputProjectName'] = "180531_charts"
    # os.environ['InputBranchName'] = "develop"
    # os.environ['InputPackerEnvironment'] = "stage"
    # # 测试代码

    packProcess = PackProcess()

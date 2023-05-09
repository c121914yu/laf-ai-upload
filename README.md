# Aha web端

React 18 + TypeScript + Vite + scss + axios

# 运行
```
npm install  
npm run dev  
```
# 注意事项
npm install 之后如果没有自动下载husky的话需要手动执行npm run huskyInstall下载校验钩子    
git commit 时会触发校验，如果没有触发可能是因为没有下载husky，手动执行npm run huskyInstall下载校验钩子   
# 规范

## 路由规范  

参考小程序，按模块划分路由。分为综合、项目、系统模块。  

综合：首页、登录、用户面板  
项目：列表页、详情、创建和编辑  
系统：各种协议、文件阅读  

# 目录上面
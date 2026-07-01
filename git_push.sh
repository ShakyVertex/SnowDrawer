#!/bin/zsh
# 本地代码提交推送脚本
git add .
git commit -m "stage"
git push
echo "✅ 本地代码提交并推送远程仓库完成"

#!/bin/zsh
SERVER_IP="38.22.90.219"
SERVER_USER="root"
SERVER_PASSWORD="v0BprggKIo4lLZQw"

sshpass -p "$SERVER_PASSWORD" ssh -tt -o StrictHostKeyChecking=no "${SERVER_USER}@${SERVER_IP}" << EOF
set -e
cd ~/SnowDrawer
echo "【1/4】拉取远程最新代码"
git pull
echo "【2/4】执行项目生产打包"
npm run build
echo "【3/4】重启SnowDrawer系统服务"
sudo systemctl restart snowdrawer.service
echo "【4/4】✅ SnowDrawer 部署、构建、服务重启全部成功" > /dev/tty
EOF

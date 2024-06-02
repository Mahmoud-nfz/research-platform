# This script should be placed in th VM on creation
# Don't forget to make it executable by running chmod +x redeploy.sh 

#  pull latest changes
cd work/research-platform
git pull
git submodule update --remote --merge

# build and run
sudo docker compose build --no-cache
sudo docker compose down
sudo docker compose up -d

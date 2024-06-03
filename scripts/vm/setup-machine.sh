# This script should be ran placed in the VM on creation

sudo apt update

# install docker
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt install docker-ce -y

# setup git
export GIT_USERNAME="mahmoud-nfz"
export GIT_PASSWORD="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"
source ~/.bashrc

# clone the repo
mkdir work
cd work
git clone https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/Mahmoud-nfz/research-platform.git
git checkout prod
cd research-platform
git config -f .gitmodules submodule.apps/object-storage-solution.url https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/Mahmoud-nfz/object-storage-solution.git
git submodule update --init --recursive

# build and run
sudo docker compose up -d

# networking
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3010
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 3010

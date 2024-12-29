# Check for required environment variables
: "${GIT_USER_EMAIL:?Need to set GIT_USER_EMAIL}"
: "${GIT_USER_NAME:?Need to set GIT_USER_NAME}"
: "${DOTNET_PROJECT_PATH:?Need to set DOTNET_PROJECT_PATH}"

wget https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/packages-microsoft-prod.deb && \
dpkg -i packages-microsoft-prod.deb && \
rm packages-microsoft-prod.deb && \
apt-get update && \
apt-get install -y dotnet-sdk-8.0 && \
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
apt-get install -y nodejs && \
npm install -g @angular/cli

# Git config
chmod 600 /root/.ssh/id_rsa_bb
eval $(ssh-agent -s)
ssh-add /root/.ssh/id_rsa_bb

echo "chmod 600 /root/.ssh/id_rsa_bb" >> ~/.bashrc
echo "eval \$(ssh-agent -s)" >> ~/.bashrc
echo "ssh-add /root/.ssh/id_rsa_bb" >> ~/.bashrc

git config --global --add safe.directory /workspaces/insurance-poc

git config --global user.email "$GIT_USER_EMAIL" &&
git config --global user.name "$GIT_USER_NAME"

# .NET config
dotnet restore "$DOTNET_PROJECT_PATH" || { echo "Dotnet restore failed"; exit 1; }
dotnet clean "$DOTNET_PROJECT_PATH" || { echo "Dotnet clean failed"; exit 1; }
dotnet build "$DOTNET_PROJECT_PATH" || { echo "Dotnet build failed"; exit 1; }

# Angular config
chmod -R 775 /usr/src/app
chown -R $(whoami):$(whoami) /usr/src/app

# cd /workspaces/insurance-poc/Insurance.Poc.WebApp
# rm -rf package-lock.json node_modules/
# npm install --legacy-peer-deps%
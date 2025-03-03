#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' 

echo -e "${BLUE}=== TikTok API Downloader & Stalker Installation Script ===${NC}\n"
echo -e "${BLUE}=== Created by TobyG74 / Tobz ===${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js first.${NC}"
    echo "Visit https://nodejs.org to download and install Node.js"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
if (( $(echo "$NODE_VERSION < 10" | bc -l) )); then
    echo -e "${RED}Node.js version 10 or higher is required.${NC}"
    echo "Current version: $NODE_VERSION"
    echo "Please upgrade Node.js and try again."
    exit 1
fi

echo -e "${GREEN}Node.js version $NODE_VERSION detected${NC}"

# Detect package manager
if command -v yarn &> /dev/null; then
    echo -e "\n${BLUE}Installing using Yarn...${NC}"
    yarn add @tobyg74/tiktok-api-dl
elif command -v npm &> /dev/null; then
    echo -e "\n${BLUE}Installing using NPM...${NC}"
    npm install @tobyg74/tiktok-api-dl
else
    echo -e "${RED}Neither npm nor yarn is installed. Please install a package manager.${NC}"
    exit 1
fi

# Installation complete
echo -e "\n${GREEN}Installation completed successfully!${NC}"
echo -e "\n${BLUE}Usage examples:${NC}"
echo "1. Import the library:"
echo "   const Tiktok = require('@tobyg74/tiktok-api-dl')"
echo -e "\n2. Download TikTok video:"
echo "   Tiktok.Downloader('https://vt.tiktok.com/xxxxxxxx', {"
echo "     version: 'v1'"
echo "   }).then((result) => console.log(result))"
echo -e "\n3. For more examples and documentation, visit:"
echo "   https://github.com/TobyG74/tiktok-api-dl#examples" 
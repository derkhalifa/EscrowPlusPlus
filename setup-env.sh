#!/bin/bash

# Create .env file
cat > ./server/.env << 'EOL'
# Database
## MONGO_URI=set by environment

# JWT Config
JWT_SECRET=superSecretKey123ForEscrowPlusPlusDev
JWT_EXPIRES=7d

# Server
PORT=5000
NODE_ENV=development

# Client URL
FRONTEND_URL=http://localhost:3000

# Email Configuration (using Mailtrap for testing)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USERNAME=1d0f0da472a160
EMAIL_PASSWORD=66942246d2f046
EMAIL_FROM=noreply@escrowplusplus.com
EOL

echo ".env file created in server directory"

# Create .env file for client (if needed)
cat > ./client/.env << 'EOL'
REACT_APP_API_URL=http://localhost:5000
EOL

echo ".env file created in client directory"
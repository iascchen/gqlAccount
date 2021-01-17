# gqlAccount Center

GraphQL Account Center for SAAS, support multi-Talent organization

## Start  
 
### MongoDB

    docker run --name my-mongo -p 27017:27017 -d mongo 

### Run

    nvm use 14

Set Environment
   
    cp .env.example .env
    
Modify .env

    # Production DB of MongoDB
    DB_URI=mongodb://<db_user>:<db_password>@<db_connection_url>/<database>
    # Develop DB running mongodb docker locally
    DB_URI_LOCAL=DB_URI_LOCAL=mongodb://<your-ip>:27017/<database>
    
    # GraphQL Account Center
    HEADER_FOR_AUTH=x-app-token
    
    
    # Put lots of randomness in these, MUST same with Account Center
    SESSION_SECRET=xxxxxxxx
    
    PASSWORD_RESET_TOKEN_LEN=6
    # invite and reset password token will be expired in INVITE_TOKEN_TTL seconds
    INVITE_TOKEN_TTL=60
    
    # Application Port - express server listens on this port (default 9000).
    PORT=9000

Run in dev mode

    yarn
    yarn dev

Run in production Mode
    
    yarn clean && yarn build && yarn prod

## Run with Docker in develop mode
    
    ./docker_builder.sh
    ./docker_run.sh

**Attention** For production mode, please set the ENV of container according your deployment

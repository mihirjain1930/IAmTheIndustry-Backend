pm2 stop all
PORT=3000 MONGO_URL='mongodb://localhost:27017/iamtheindustry' 
pm2 start bin/www --name="iamtheindustry-api"
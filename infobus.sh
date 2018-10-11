#!/bin/dash
service mysql start
#mysql -u nhdb -p123456789
service mongod start
#mongo
#Login
cd /home/nhdb/Documentos/infobus/logi
export FLASK_APP=index.py
flask run --host=0.0.0.0 &
#colectivos
cd /home/nhdb/Documentos/infobus/colectivos
node index.js


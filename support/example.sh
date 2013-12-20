# Set pane 0 on y1

curl http://localhost:4031/y1
curl -X PUT -H "Content-Type: application/json" --data "@support/set-pane-url.json" http://localhost:4031/y1/1/
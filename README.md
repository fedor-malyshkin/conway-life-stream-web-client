# conway-life-stream-web-client

A trivial implementation of client for Conway's Game of Life [stream server](https://github.com/fedor-malyshkin/conway-life-stream-server).
Used technologies:
* JavaScript
* React

Listen and present current streamed data from the server. I'm not a professional frontend developer - so I suppose processing asynchronous data from wasn't done in an ideal way. 

### Sample Heroku deployment:
```shell script
$ heroku login
$ heroku create
```
In my case it was: http://secret-retreat-65283.herokuapp.com/
```shell script
$ git push heroku main
$ heroku ps:scale web=1
```

After thant ensure correct values for `REACT_APP_BACKEND_URL` in Config Vars:
```shell script
$ heroku config:set REACT_APP_BACKEND_URL=x.x.x.x
``` 
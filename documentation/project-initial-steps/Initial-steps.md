1. Install node.js

    [https://nodejs.org/en/download/current](https://nodejs.org/en/download/current)
select your platform
1. Open the ensf-614 group folder in VS code
	![documentation/project-initial-steps/1-open-vs-code.png]()
1. Open the DB_population.sql file


	change data base credentials in the `server.js` file in `backend/server.js`
	
		Redge's comment: I changed my `password` to `"root"` because that's what I set as my database user password. I also have my `user` as `"root"` so you may need to change this too
		
Open MySQLWorkbench and run the DB_population.sql
	run the sql file in MySQLWorkbench

Open your terminal
Navigate to the backend folder `ensf-614-group\backend`
	install dependencies
		`npm install`
		this will install all the dependencies and their versions as defined in `backend\packages.json`
Navigate to the frontend folder `ensf-614-group\frontend`
	install dependencies
		`npm install`
		this will install all the dependencies and their versions as defined in `frontend\packages.json`

install nodemon
	`npm install -g nodemon`

if that doesn't work:
		run `sudo npm install -g nodemon`
		
		Redge's comment: I got this error while running `sudo npm install -g nodemon` on my Mac so
			for MacOS/Linux/Windows on gitbash:
				`sudo chown -R $USER /usr/local/lib/node_modules`
	
install mysql
	`npm install mysql`
install mysql2
	`npm install mysql`


Start the app
	`npm start`
	
User Creds:
	USERNAME: PASSWORD: user_type
Fred: fred: admin
	Bob: bob: registered user
Braden: 1234: agent
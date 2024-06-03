
# README #
--
This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

## Technologies ##
1. Weback for module bundling.
2. ESLint for linting code.
3. Babel for tanspiling code (Converting ES6 code to ES5 code)
4. React for Views
5. Redux for state management
6. Bootstrap, Flexbox and Sass for styling
7. Node + express server for local development
8. npm scripts for building dev environment


### How do I run the app ###

* Install node + npm
* Run the command - npm run setup
* Run the command  - npm start
* This should start a node server at port 3000 and render the app there


### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

NETCore
   https://www.microsoft.com/net/core

SQL Server for OS X
   https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-setup-docker
   `sudo docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Secret.2017' -p 1433:1433 -d microsoft/mssql-server-linux`

To build and run, under the $ProjectRoot/src
    $ dotnet restore
    $ dotnet run

To drop a the database and start over,
    $ dotnet ef database drop -c ApplicationDbContext

Visit GoPaveWeb to launch the Portal.

To control the appsettings employed for a given env:
Win  :: $ setx ASPNETCORE_ENVIRONMENT "Local"
Linux:: $ export ASPNETCORE_ENVIRONMENT=Local

Update Context
    $ dotnet ef migrations add UserContext --context UserContext
    $ dotnet ef database update --context IntermodalVehicleContext

To drop a the database and start over,
    $ dotnet ef database drop -c ApplicationDbContext

Visit GoPaveWeb to launch the Portal.

To control the appsettings employed for a given env:
Win  :: $ setx ASPNETCORE_ENVIRONMENT "Local"
Linux:: $ export ASPNETCORE_ENVIRONMENT=Local


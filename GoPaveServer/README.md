
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


start_web:
	systemctl start kestrel-dotnetlive-adminweb.service

stop_web:
	systemctl stop kestrel-dotnetlive-adminweb.service

start_api:
	systemctl start kestrel-dotnetlive-adminapi.service

stop_api:
	systemctl stop kestrel-dotnetlive-adminapi.service

delete_current_build:
	rm -rf /var/dotnetlive/pubsite/dotnetlive.adminweb/
	rm -rf /var/dotnetlive/pubsite/dotnetlive.adminapi/

publish_web:
	git clean -df
	git pull
	dotnet restore src/adminweb/DotNetLive.AdminWeb.sln 
	cd src/adminweb/DotNetLive.AdminWeb && npm install && bower install --allow-root && gulp default
	dotnet publish src/adminweb/DotNetLive.AdminWeb/DotNetLive.AdminWeb.csproj -c "Release" -o /var/dotnetlive/pubsite/dotnetlive.adminweb/ 

publish_api:
	git clean -df
	git pull
	dotnet restore src/adminapi/DotNetLive.AdminApi.sln 
	dotnet publish src/adminapi/DotNetLive.AdminApi/DotNetLive.AdminApi.csproj -c "Release" -o /var/dotnetlive/pubsite/dotnetlive.adminapi/ 

deploy_web: stop_web publish_web start_web
deploy_api: stop_api publish_api start_api

deploy: delete_current_build deploy_web

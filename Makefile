start:
	systemctl start kestrel-dotnetlive-admin.service

stop:
	systemctl stop kestrel-dotnetlive-admin.service

delete_current_build:
	rm -rf /var/dotnetlive/pubsite/dotnetlive.admin/

publish:
	git clean -df
	git pull
	dotnet restore src/DotNetLive.AdminWeb.sln 
	cd src/DotNetLive.AdminWeb && npm install && bower install --allow-root && gulp default
	dotnet publish src/DotNetLive.AdminWeb/DotNetLive.AdminWeb.csproj -c "Release" -o /var/dotnetlive/pubsite/dotnetlive.admin/ 

deploy: stop publish start

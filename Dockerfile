# Build logisticsApp server Docker container
FROM coreos/apache
MAINTAINER Raquel Bujans
COPY dist /var/www/

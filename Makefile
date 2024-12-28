clean:
	if [ -d observatory-web ]; then rm -rf observatory-web/; fi

build: clean
	mkdocs build

rename:
	if [ -d site ]; then mv site/ observatory-web; else echo Done; fi

upload: rename
	lftp $(FTP_SERVER) -e "mirror -p -R observatory-web/"

all: build rename upload

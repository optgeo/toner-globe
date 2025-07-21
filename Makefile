# Makefile for toner-globe project

.PHONY: style dev build clean help deploy

style:
	# Generate style.json from style.pkl
	pkl eval -f json style-generation/style.pkl > public/style.json
	# Copy to docs for GitHub Pages deployment
	cp public/style.json docs/style.json

dev:
	# Start Vite development server
	npm run dev

build:
	# Build static site to docs directory
	npm run build
	# Ensure style.json is in docs for GitHub Pages
	cp public/style.json docs/style.json

clean:
	# Clean generated files
	rm -rf public/style.json docs/style.json

help:
	# Display available commands
	@echo "Available commands: style, dev, build, clean, help, deploy"

deploy:
	# Update GitHub Pages
	git add docs && git commit -m "Deploy to GitHub Pages" && git push origin main

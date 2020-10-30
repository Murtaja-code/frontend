#!/usr/bin/env sh
# abort on errors
set -e
# build
npm run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'the is my frontend for the iraq_student'
git push -f https://github.com/Murtaja-code/iraqi_student.git
cd -
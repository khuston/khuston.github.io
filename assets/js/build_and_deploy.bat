git checkout master
git merge development
npx babel src --out-dir build --presets react-app/prod
git add build
git add node_modules
git commit -m "Deploy"
git push
git checkout development
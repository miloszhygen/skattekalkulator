To run jest tests with scss import makes the tests fail. 





Quote from https://github.com/facebook/jest/issues/3094


 solved this by using the moduleNameMapper key in the jest configurations in the package.json file

{
   "jest":{
        "moduleNameMapper":{
             "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
             "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
        }
   }
}
After this you will need to create the two files as described below

__mocks__/styleMock.js
module.exports = {};
__mocks__/fileMock.js
module.exports = 'test-file-stub';
If you are using CSS Modules then it's better to mock a proxy to enable className lookups.
hence your configurations will change to:

{
  "jest":{
     "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
  }
}
But you will need to install identity-obj-proxy package as a dev dependancy i.e.

yarn add identity-obj-proxy -D
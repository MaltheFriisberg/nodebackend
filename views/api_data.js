define({ "api": [
  {
    "type": "post",
    "url": "/appuser/authenticate",
    "title": "Request an access token",
    "name": "Authenticate",
    "group": "AppUser",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>Username in plaintext</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password in plaintext</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": \"true\",\n  \"message\": \"enjoy your token\",\n  \"token\": 87dsasdjdsa0!\"adsjkl\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/AppUser.js",
    "groupTitle": "AppUser"
  }
] });

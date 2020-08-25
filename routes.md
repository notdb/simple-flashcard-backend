# Routes

## Authentication

- POST /api/v1/auth/register - Registers a user

Requires a username and password.

Example:

```
{
	"username": "testuser",
	"password": "bar"
}
```

- POST /api/v1/auth/login - Login

Requires a username and password, returns a token.

Example:

```
{
	"username": "testuser",
	"password": "bar"
}

{
	"message": "Welcome testuser!",
	"token": "foo"
}

```

- GET /api/v1/auth/exists - Check if a user is logged in

Requires a username as a query string as a part of the URL. Returns 1 if user exists, 0 otherwise.

Example:

```
/api/v1/auth/exists?user=testuser
```



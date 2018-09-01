<a name="top"></a>
# phoenix-net-api v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Messages](#messages)
	- [Create messages](#create-messages)
	- [Delete messages](#delete-messages)
	- [Retrieve messages](#retrieve-messages)
	- [Update messages](#update-messages)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [Servers](#servers)
	- [Create servers](#create-servers)
	- [Delete servers](#delete-servers)
	- [Retrieve servers](#retrieve-servers)
	- [Update servers](#update-servers)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# <a name='auth'></a> Auth

## <a name='authenticate'></a> Authenticate
[Back to top](#top)



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | String | <p>Basic authorization with email and password.</p>|




### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  access_token | String | <p>Master access_token.</p>|



### Success 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  token | String | <p>User <code>access_token</code> to be passed to other requests.</p>|
|  user | Object | <p>Current user's data.</p>|

# <a name='messages'></a> Messages

## <a name='create-messages'></a> Create messages
[Back to top](#top)



	POST /messages





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  access_token | String | <p>user access token.</p>|
|  text |  | <p>Messages's text.</p>|
|  created |  | <p>Messages's created.</p>|
|  updated |  | <p>Messages's updated.</p>|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  messages | Object | <p>Messages's data.</p>|

## <a name='delete-messages'></a> Delete messages
[Back to top](#top)



	DELETE /messages/:id





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  access_token | String | <p>master access token.</p>|



### Success 204

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  204 |  | <p>No Content.</p>|

## <a name='retrieve-messages'></a> Retrieve messages
[Back to top](#top)



	GET /messages/:id





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  access_token | String | <p>user access token.</p>|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  messages | Object | <p>Messages's data.</p>|

## <a name='update-messages'></a> Update messages
[Back to top](#top)



	PUT /messages/:id





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  access_token | String | <p>user access token.</p>|
|  text |  | <p>Messages's text.</p>|
|  created |  | <p>Messages's created.</p>|
|  updated |  | <p>Messages's updated.</p>|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  messages | Object | <p>Messages's data.</p>|

# <a name='passwordreset'></a> PasswordReset

## <a name='send-email'></a> Send email
[Back to top](#top)



	POST /password-resets





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  email | String | <p>Email address to receive the password reset token.</p>|
|  link | String | <p>Link to redirect user.</p>|



### Success 202

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  202 |  | <p>Accepted.</p>|

## <a name='submit-password'></a> Submit password
[Back to top](#top)



	PUT /password-resets/:token





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  password | String | <p>User's new password.</p>_Size range: 6.._<br>|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  user | Object | <p>User's data.</p>|

## <a name='verify-token'></a> Verify token
[Back to top](#top)



	GET /password-resets/:token






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  token | String | <p>Password reset token.</p>|
|  user | Object | <p>User's data.</p>|

# <a name='servers'></a> Servers

## <a name='create-servers'></a> Create servers
[Back to top](#top)



	POST /servers





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  hostname |  | <p>Servers's hostname.</p>|
|  url |  | <p>Servers's url.</p>|
|  key |  | <p>Servers's key.</p>|
|  status |  | <p>Servers's status.</p>|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  servers | Object | <p>Servers's data.</p>|

## <a name='delete-servers'></a> Delete servers
[Back to top](#top)



	DELETE /servers/:id






### Success 204

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  204 |  | <p>No Content.</p>|

## <a name='retrieve-servers'></a> Retrieve servers
[Back to top](#top)



	GET /servers/:id






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  servers | Object | <p>Servers's data.</p>|

## <a name='update-servers'></a> Update servers
[Back to top](#top)



	PUT /servers/:id





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  hostname |  | <p>Servers's hostname.</p>|
|  url |  | <p>Servers's url.</p>|
|  key |  | <p>Servers's key.</p>|
|  status |  | <p>Servers's status.</p>|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  servers | Object | <p>Servers's data.</p>|

# <a name='user'></a> User

## <a name='create-user'></a> Create user
[Back to top](#top)



	POST /users





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  access_token | String | <p>Master access_token.</p>|
|  email | String | <p>User's email.</p>|
|  password | String | <p>User's password.</p>_Size range: 6.._<br>|
|  name | String | **optional**<p>User's name.</p>|
|  picture | String | **optional**<p>User's picture.</p>|
|  role | String | **optional**<p>User's role.</p>_Default value: user_<br>_Allowed values: user,admin_|



### Sucess 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  user | Object | <p>User's data.</p>|

## <a name='delete-user'></a> Delete user
[Back to top](#top)



	DELETE /users/:id





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  access_token | String | <p>User access_token.</p>|



### Success 204

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  204 |  | <p>No Content.</p>|

## <a name='retrieve-current-user'></a> Retrieve current user
[Back to top](#top)



	GET /users/me





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  access_token | String | <p>User access_token.</p>|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  user | Object | <p>User's data.</p>|

## <a name='retrieve-user'></a> Retrieve user
[Back to top](#top)



	GET /users/:id






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  user | Object | <p>User's data.</p>|

## <a name='retrieve-users'></a> Retrieve users
[Back to top](#top)



	GET /users





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  access_token | String | <p>User access_token.</p>|
|  q | String | **optional**<p>Query to search.</p>|
|  page | Number | **optional**<p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br>|
|  limit | Number | **optional**<p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br>|
|  sort | String[] | **optional**<p>Order of returned items.</p>_Default value: -createdAt_<br>|
|  fields | String[] | **optional**<p>Fields to be returned.</p>|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  users | Object[] | <p>List of users.</p>|

## <a name='update-password'></a> Update password
[Back to top](#top)



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | String | <p>Basic authorization with email and password.</p>|




### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  password | String | <p>User's new password.</p>_Size range: 6.._<br>|



### Success 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  user | Object | <p>User's data.</p>|

## <a name='update-user'></a> Update user
[Back to top](#top)



	PUT /users/:id





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  access_token | String | <p>User access_token.</p>|
|  name | String | **optional**<p>User's name.</p>|
|  picture | String | **optional**<p>User's picture.</p>|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  user | Object | <p>User's data.</p>|


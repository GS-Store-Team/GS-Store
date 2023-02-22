# REST-API Documentation

### Unauthorized endpoints:

#### POST "/login"  {AuthenticationRequestDTO}
		goal: get jwt token to autorize next requests to server
		return-status: 
			OK - {AuthenticationResponseDTO}
			UNPROCESSABLE_ENTITY - bad input object
			NOT_FOUND - user with such email not found
			FORBIDDEN - wrong username or password

#### POST "/signup" {AuthenticationRequestDTO}
		goal: create new user
		return-status: 
			OK - new user created
			UNPROCESSABLE_ENTITY - bad input object
			CONFLICT - user with such email already exists

### Authorized endpoints:

#### GET "/users/me"
		goal: get information of current user
		return-status: 
			OK - {UserData}
			NOCONTENT - unformation of current authorized user not found

#### PATCH "/users/me" {UserData}
		goal: renew information of current user
		return-status: 
			OK
			UNPROCESSABLE_ENTITY - bad input object
			NOCONTENT - unformation of current authorized user not found

#### PATCH "/users/me/password" {ChangePasswordRequestDTO}
		goal: renew password of current user
		return-status: 
			OK
			UNPROCESSABLE_ENTITY - bad input object
			EXPECTATION_FAILED - old and new passwords the same
			NOCONTENT - unformation of current authorized user not found

#### DELETE "/users/me"
		goal: delete user data and comments of current user
		return-status: 
			OK
			NOCONTENT - unformation of current authorized user not found

#### GET "/users/{id}"
		goal: get information of user with certain id
		return-status: 
			OK - {UserData}

#### GET "/plugins" 
    	params: "_page"   - page number
    		    "_limit"  - size of page
    		    "_filter" - string pattern
    		    "_cat"    - chosen category
    		    "_tag"    - chosen tags (can be included if request several times)
		goal: get list of small info about plugins
		return-status: 
			OK - {Page}
			NOCONTENT - empty page

#### GET "/plugins/{id}"
		goal: get information of plugin with certain id
		return-status: 
			OK - {Plugin}
			NOCONTENT - plugin with such id not found

#### POST "/plugins" {Plugin}
		goal: create new plugin
		return-status: 
			OK
			UNPROCESSABLE_ENTITY - bad input object

#### PATCH "/plugins/{id}" {Plugin}
		goal: renew info about certain plugin
		return-status: 
			OK
			UNPROCESSABLE_ENTITY - bad input object

#### POST "/plugins/{id}/comment" {CommentDTO}
		goal: leave comment under certain plugin
		return-status: 
			OK
			UNPROCESSABLE_ENTITY - bad input object
			NOCONTENT - unformation of current authorized user not found

#### DELETE "/plugins/comment/{id}"
		goal: leave comment under certain plugin
		return-status: 
			OK
			FORBIDDEN - comment author doesnt match current user
			NOCONTENT - unformation of current authorized user not found

#### GET "/plugins/{id}/comments"
		params: "_page"  - page number
    		    "_limit" - size of page
    		    "_type"  - sorting strategy (number): "1" - sorting by date, "2" - sorting by mark descending, "3" - sorting by mark ascending, "4" - comments what leave current user & sorting by date 
    		    
		goal: get page of comments for plugin with certain id
		return-status: 
			OK
			NOCONTENT - unformation of current authorized user not found (if sort strategy - user comments)

#### DELETE "/plugins/{id}"
		goal: leave comment under certain plugin
		return-status: 
			NOCONTENT - plugin deleted

#### GET "/image/{id}"
		goal: get image by id
		return-status: 
			OK - image
			NOCONTENT - image with such id not found

#### GET "/image/plugin/{id}"
		goal: get relative images for certain plugin
		return-status: 
			OK - list of corresponding image identifiers

#### GET "/image/plugin/{id}/preview"
		goal: get preview image for certain plugin
		return-status: 
			OK - image

#### PATCH "/image/{id}" {Plugin}
		params: "plugin_id"  - number (required!)
		goal: change preview image identifier
		return-status: 
			OK

#### POST "/image"
		goal: upload new file

#### GET "/categories"
		goal: get list of categories
		return-status: 
			OK - list of categories
			NOCONTENT - list is empty

#### GET "/tags"
		goal: get list of tags
		return-status: 
			OK - list of tags
			NOCONTENT - list is empty
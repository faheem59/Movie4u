
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const MESSAGES = {
    USER_EXISTS: 'Email is already exists',
    NO_USER_FOUND: 'No user found',
    INVALID_CREDENTIALS: 'Invalid email or password',
    SERVER_ERROR: 'Server error',
    USER_NOT_FOUND: 'User Not Found',
    LOGGED_OUT: 'Logged Out',
    MOVIE_NOT_FOUND: 'Movie not found',
    MOVIE_ALREADY_IN_FAVORITES: 'Movie is already in favorites',
    MOVIE_ADDED_TO_FAVORITES: 'Movie added to favorites',
    MOVIE_REMOVED_FROM_FAVORITES: 'Movie removed from favorites',
    NO_FAVORITE_MOVIES_FOUND: 'No favorite movies found',
    USER_UNAUTHORIZED: 'User is not authenticated',
    COMMENT_ADDED_SUCCESSFULLY: 'Comment added successfully',
    INTERNAL_SERVER_ERROR: 'Internal server error',
 
};

module.exports = { HTTP_STATUS, MESSAGES };

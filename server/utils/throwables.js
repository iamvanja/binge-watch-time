// When thrown during an Express HTTP request, these errors will be caught by
// an error handler which will appropriately display the error to the client

// User Input Errors
export class UserError extends Error { }

export class NotFound extends Error { }

// User not Authenticated
export class UserNotAuthenticated extends Error { }

export class UserAuthenticationFailed extends Error { }

export class UserNotAllowed extends Error { }

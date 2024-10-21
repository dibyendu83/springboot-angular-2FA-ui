import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // get the token from local storage
  let jwtToken = localStorage.getItem('access_token')

  console.log('JWT_TOKEN =', jwtToken);

  if (jwtToken) {
    // Clone the request and add the Authorization header with the Bearer token
    const cloned = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${jwtToken}`
      }

    });
    return next(cloned);
  } else {
    return next(req);
  }
};

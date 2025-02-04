class Helpers {
    static dataResponse(status = Number, data) {
        if (status && data !== '') {
          let message = '';
    
          switch (status) {
            case 200:
              message = 'SUCCESSFUL_REQUEST';
              break;
            case 201:
              message = 'SUCCESSFUL_CREATED';
              break;
            case 422:
              message = 'INVALID_REQUEST';
              break;
            case 404:
              message = 'NOT_FOUND';
              break;
            case 400:
              message = 'BAD_REQUEST';
              break;
            case 500:
              message = 'INTERNAL_SERVER_ERROR';
              break;
            default:
              return false;
          }
    
          const response = {
            status,
            message,
            payload: data
          };
    
          return response;
        }
    
        return false;
      }
}

module.exports = Helpers;
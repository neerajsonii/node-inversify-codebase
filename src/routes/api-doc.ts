import { appConfig } from '../config/config';

const API_RESPONSE = {
  '200': {
    'description': 'Action performed successfully',
    'schema': {
      '$ref': '#/definitions/ApiSuccessResponse'
    }
  },
  '403': {
    'description': 'Action forbidden by server',
    'schema': {
      '$ref': '#/definitions/ApiErrorResponse'
    }
  },
  '404': {
    'description': 'Does not exists in system',
    'schema': {
      '$ref': '#/definitions/ApiErrorResponse'
    }
  },
  '500': {
    'description': 'Internal server error',
    'schema': {
      '$ref': '#/definitions/ApiErrorResponse'
    }
  }
};

const DEFINITIONS = {
  'ApiSuccessResponse': {
    'type': 'object',
    'properties': {
      'error': {
        'type': 'boolean'
      },
      'status': {
        'type': 'integer'
      },
      'message': {
        'type': 'string'
      },
      'data': {
        'type': 'object'
      }
    }
  },
  'ApiErrorResponse': {
    'type': 'object',
    'properties': {
      'error': {
        'type': 'boolean'
      },
      'status': {
        'type': 'integer'
      },
      'statusMessage': {
        'type': 'string'
      },
      'message': {
        'type': 'string'
      }
    }
  },
  'cancelGame': { 
    'type': 'object',
    'properties': {
      'gameId': {
        'type': 'string'
      }
    }
  },
  'startGame': { 
    'type': 'object',
    'properties': {
      'gameId': {
        'type': 'string'
      }
    }
  },
  'createGame': { 
    'type': 'object',
    'properties': {
      'playerId': {
        'type': 'string'
      }
    }
  },
};

export const API_DOC = {
    'swagger': '2.0',
    'info': {
      'description': appConfig.description,
      'version': appConfig.version,
      'title': appConfig.name,
      'termsOfService': '',
      'contact': {
        'name': 'Neeraj Soni',
        'email': 'nrsoni1992@gmail.com',
        'url': 'https://github.com/neerajsonii'
      }
    },
    'host': `localhost:${appConfig.port}`,
    'basePath':'/api',
    'tags': [
      {
        'name': 'GAME',
        'description': 'Contains and Handles Game route and operations',
      },
      {
        'name': 'BOARD',
        'description': 'Contains and Handles Board routes and operations',
      },
      {
        'name': 'PLAYER',
        'description': 'Contains and Handles Player routes and operations',
      }
    ],
    'schemes': [
      'http',
      'https'
    ],
    'paths': {
      '/game/list': {
        'get': {
          'tags': [
            'GAME'
          ],
          'summary': 'Get all Games',
          'description': 'This will return with a list of all games available in the system',
          'produces': [
            'application/json'
          ],
          'responses': API_RESPONSE
        }
      },
      '/game/cancel': {
        'put': {
          'tags': [
            'GAME'
          ],
          'summary': 'Cancel a game',
          'description': 'This will cancel a game which exists in system',
          'produces': [
            'application/json'
          ],
          'parameters': [
            {
              'name': 'body',
              'in': 'body',
              'description': 'GameId of a game to be cancelled',
              'required': true,
              'schema': {
                '$ref': '#/definitions/cancelGame'
              }
            }
          ],
          'responses': API_RESPONSE
        }
      },
      '/game/create': {
        'post': {
          'tags': [
            'GAME'
          ],
          'summary': 'Create a game',
          'description': 'This will create a game in system',
          'produces': [
            'application/json'
          ],
          'parameters': [
            {
              'name': 'body',
              'in': 'body',
              'description': 'PlayerId who is creating the game',
              'required': true,
              'schema': {
                '$ref': '#/definitions/createGame'
              }
            }
          ],
          'responses': API_RESPONSE
        }
      },
      '/game/start': {
        'put': {
          'tags': [
            'GAME'
          ],
          'summary': 'Start a game',
          'description': 'This will start a game in system',
          'produces': [
            'application/json'
          ],
          'parameters': [
            {
              'name': 'body',
              'in': 'body',
              'description': 'GameId for a game to start',
              'required': true,
              'schema': {
                '$ref': '#/definitions/startGame'
              }
            }
          ],
          'responses': API_RESPONSE
        }
      }
    },
    // 'securityDefinitions': {
    //   'BearerAuth': {
    //     'type': 'http',
    //     'scheme': 'bearer',
    //     'bearerFormat': 'JWT'
    //   }
    // },
    'definitions': DEFINITIONS
}
module.exports = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Alexa Skill',
        description:
            'This api was created in order to simulate universities databases, where you can find where the teachers are in. By the way, you can create, insert, update and delete a classroom, class or teacher',
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
        },
    },
    servers: [
        {
            url: '/',
            description: 'Local Dev',
        },
    ],
    tags: [
        {
            name: 'Users',
            description: 'Verb for Users in the system',
        },
        {
            name: 'Sessions',
            description: 'Verb for Users in the system',
        },
        {
            name: 'Classes',
            description: 'Verb for classes in the system',
        },
        {
            name: 'Teachers',
            description: 'Verb for teacher in the system',
        },
        {
            name: 'Questions',
            description: 'Verb for questions in the system',
        },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    paths: {
        '/sessions': {
            post: {
                tags: ['Sessions'],
                summary: 'Create a new session in system',
                requestBody: {
                    description: 'Class Object',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/User',
                            },
                        },
                    },
                },
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '400': {
                        description: 'Failed. Bad post data.',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
        },
        '/users': {
            post: {
                tags: ['Users'],
                summary: 'Create a new user in system',
                requestBody: {
                    description: 'Class Object',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/User',
                            },
                        },
                    },
                },
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '400': {
                        description: 'Failed. Bad post data.',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
            put: {
                parameters: [
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'Session',
                        type: 'string',
                    },
                ],
                tags: ['Users'],
                summary: 'Update user in system',
                requestBody: {
                    description: 'Class Object',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/UserUpdate',
                            },
                        },
                    },
                },
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '400': {
                        description: 'Failed. Bad post data.',
                    },
                    '401': {
                        description: 'Failed. Not Authorized.',
                    },
                },
            },
        },
        '/classes': {
            parameters: [
                {
                    in: 'header',
                    name: 'token',
                    required: true,
                    type: 'string',
                },
            ],
            get: {
                tags: ['Classes'],
                summary: 'Get all classes in system',
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
            post: {
                tags: ['Classes'],
                summary: 'Create a new class in system',
                parameters: [
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'Session',
                        type: 'string',
                    },
                ],
                requestBody: {
                    description: 'Class Object',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/Class',
                            },
                        },
                    },
                },
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '400': {
                        description: 'Failed. Bad post data.',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
        },
        '/classes/{id}': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID of the class that we want to match',
                    type: 'string',
                },
                {
                    name: 'token',
                    in: 'header',
                    required: true,
                    description: 'Session',
                    type: 'string',
                },
            ],
            put: {
                summary: 'Update class with given ID',
                tags: ['Classes'],
                requestBody: {
                    description: 'Class Object',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/Class',
                            },
                        },
                    },
                },
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        description: 'Class with new values of properties',
                    },
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'Session',
                        type: 'string',
                    },
                ],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '400': {
                        description: 'Failed. Bad post data.',
                    },
                    '404': {
                        description: 'Failed. classes not found.',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
            delete: {
                summary: 'Delete cat with given ID',
                tags: ['Classes'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        description: 'Delete Class with id',
                    },
                ],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '404': {
                        description: 'Failed. Class not found.',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
        },
        '/teachers': {
            get: {
                tags: ['Teachers'],
                parameters: [
                    {
                        name: 'name',
                        in: 'query',
                        required: false,
                        description:
                            'name of the Teacher that we want to match',
                        type: 'string',
                    },
                    {
                        name: 'dayWeek',
                        in: 'query',
                        required: false,
                        description:
                            'Day week of the Teacher that we want to match',
                        type: 'number',
                    },
                    {
                        name: 'hour',
                        in: 'query',
                        required: false,
                        description:
                            'Hour of the Teacher that we want to match',
                        type: 'string',
                    },
                    {
                        name: 'minute',
                        in: 'query',
                        required: false,
                        description:
                            'Minute of the Teacher that we want to match',
                        type: 'string',
                    },
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'Session',
                        type: 'string',
                    },
                ],
                summary: 'Get all teachers in system',
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
            post: {
                tags: ['Teachers'],
                summary: 'Create a new teacher in system',
                parameters: [
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'Session',
                        type: 'string',
                    },
                ],
                requestBody: {
                    description: 'Teacher Object',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/Teacher',
                            },
                        },
                    },
                },
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '400': {
                        description: 'Failed. Bad post data.',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
        },
        '/teachers/{id}': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID of the Teacher that we want to match',
                    type: 'string',
                },
                {
                    name: 'token',
                    in: 'header',
                    required: true,
                    description: 'Session',
                    type: 'string',
                },
            ],
            put: {
                summary: 'Update Teacher with given ID',
                tags: ['Teachers'],
                requestBody: {
                    description: 'Teacher Object',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/Teacher',
                            },
                        },
                    },
                },
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        description: 'Teacher with new values of properties',
                    },
                ],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '400': {
                        description: 'Failed. Bad post data.',
                    },
                    '404': {
                        description: 'Failed. teacher not found.',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
            delete: {
                summary: 'Delete cat with given ID',
                tags: ['Teachers'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        description: 'Delete Teacher with id',
                    },
                ],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '404': {
                        description: 'Failed. Teacher not found.',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
        },
        '/questions/{number}': {
            get: {
                tags: ['Questions'],
                summary: 'Get one question in system',
                parameters: [
                    {
                        name: 'number',
                        in: 'path',
                        required: true,
                        description: 'Number of the question',
                        type: 'number',
                    },
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'Session',
                        type: 'string',
                    },
                ],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
            put: {
                tags: ['Questions'],
                summary: 'Get one question in system',
                parameters: [
                    {
                        name: 'number',
                        in: 'path',
                        required: true,
                        description: 'Number of the question',
                        type: 'number',
                    },
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'Session',
                        type: 'string',
                    },
                ],
                requestBody: {
                    description: 'Question Object',
                    required: false,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/Question',
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
        },
        '/questions': {
            post: {
                tags: ['Questions'],
                summary: 'Create a new question in system',
                parameters: [
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'Session',
                        type: 'string',
                    },
                ],
                requestBody: {
                    description: 'Question Object',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/Question',
                            },
                        },
                    },
                },
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '400': {
                        description: 'Failed. Bad post data.',
                    },
                    '401': {
                        description: 'Failed. Bad not authorized',
                    },
                },
            },
        },
    },
    definitions: {
        Class: {
            type: 'object',
            properties: {
                teacher_id: {
                    type: 'number',
                },
                name: {
                    type: 'string',
                },
                classroom: {
                    type: 'string',
                },
                day_week: {
                    type: 'number',
                },
                start_hour: {
                    type: 'string',
                },
                end_hour: {
                    type: 'string',
                },
            },
        },
        Teacher: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
            },
        },
        User: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
            },
        },
        UserUpdate: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                },
                oldPassword: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
            },
        },
        Question: {
            type: 'object',
            properties: {
                course: {
                    type: 'string',
                },
                number: {
                    type: 'number',
                },
                question: {
                    type: 'string',
                },
                answer: {
                    type: 'string',
                },
            },
        },
    },
};

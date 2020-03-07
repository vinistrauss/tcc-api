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
            name: 'Classes',
            description: 'Verb for classes in the system',
        },
        {
            name: 'Teachers',
            description: 'Verb for teacher in the system',
        },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    paths: {
        '/classes': {
            get: {
                tags: ['Classes'],
                summary: 'Get all classes in system',
                responses: {
                    '200': {
                        description: 'OK',
                    },
                },
            },
            post: {
                tags: ['Classes'],
                summary: 'Create a new class in system',
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
                        required: true,
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
                ],
                summary: 'Get all teachers in system',
                responses: {
                    '200': {
                        description: 'OK',
                    },
                },
            },
            post: {
                tags: ['Teachers'],
                summary: 'Create a new teacher in system',
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
                },
            },
        },
    },
    definitions: {
        Class: {
            type: 'object',
            properties: {
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
                classes_id: {
                    type: 'number',
                },
            },
        },
    },
};

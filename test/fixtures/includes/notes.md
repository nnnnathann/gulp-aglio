
# Group Notes
Group description (also with *Markdown*)

## Note List [/notes]
Note list description

+ Even
+ More
+ Markdown

+ Model

    + Headers

            Content-Type: application/json
            X-Request-ID: f72fc914
            X-Response-Time: 4ms

    + Body

            [
                {
                    "id": 1,
                    "title": "Grocery list",
                    "body": "Buy milk"
                },
                {
                    "id": 2,
                    "title": "TODO",
                    "body": "Fix garage door"
                }
            ]

### Get Notes [GET]
Get a list of notes.

+ Response 200

    [Note List][]

### Create New Note [POST]
Create a new note

+ Request

    + Headers

            Content-Type: application/json

    + Body

            {
                "title": "My new note",
                "body": "..."
            }

+ Response 201

+ Response 400

    + Headers

            Content-Type: application/json

    + Body

            {
                "error": "Invalid title"
            }

## Note [/notes/{id}]
Note description

+ Parameters

    + id (required, string, `68a5sdf67`) ... The note ID

+ Model

    + Headers

            Content-Type: application/json
            X-Request-ID: f72fc914
            X-Response-Time: 4ms

    + Body

            {
                "id": 1,
                "title": "Grocery list",
                "body": "Buy milk"
            }

### Get Note [GET]
Get a single note.

+ Response 200

    [Note][]

+ Response 404

    + Headers

            Content-Type: application/json
            X-Request-ID: f72fc914
            X-Response-Time: 4ms

    + Body

            {
                "error": "Note not found"
            }

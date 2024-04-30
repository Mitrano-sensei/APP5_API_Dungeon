# Player API

- `GET`  
  [http://localhost:3000/api/players]()  
  Result :
  ```json
  [
    {
        "id": 1,
        "name": "Bashboush"
    },
    {
        "id": 2,
        "name": "Mitrafion"
    },
    {
        "id": 3,
        "name": "xXSolèneDu91Xx"
    },
    {
        "id": 4,
        "name": "xXSolèneDu91Xxpppp"
    }
  ]
  ```
- `GET` Pagination:  
  [http://localhost:3000/api/players/?size=2&page=1]()  
  Result:
  ```json
  [
    {
        "id": 1,
        "name": "Bashboush"
    },
    {
        "id": 2,
        "name": "Mitrafion"
    }
  ]
  ```
- `GET` player by id
  [http://localhost:3000/api/players/1]()  
  Result:
  ```json
  {
      "id": 1,
      "name": "Bashboush"
  }
  ```

- `POST`  
  [http://localhost:3000/api/players](http://localhost:3000/api/players)  
  Body :
  ```json
  {
    "name": "Player 2"
  }
  ```
  Result:
  ```json
  {
    "id": 10,
    "name": "Player 2"
  }
  ```

- `PUT`  
  [http://localhost:3000/api/players/10](http://localhost:3000/api/players/10)  
  Body:
  ```json
  {
    "name": "Luigi"
  }
  ```
  Result:
  ```json
  {
    "id": 10,
    "name": "Luigi"
  }
  ```


- `DELETE`  
  [http://localhost:3000/api/players/4](http://localhost:3000/api/players/4)  
  Result:
  ```json
  {
    "id": 4,
    "name": "xXSolèneDu91Xxpppp"
  }
  ```
# Dungeon API

- `GET`  
  [http://localhost:3000/api/dungeons]()   
  Result:
  ```json
  [
    {
        "id": 1,
        "name": "La Tour de Galamadradiyabuyak"
    },
    {
        "id": 2,
        "name": "Xar'Saroth"
    },
    {
        "id": 3,
        "name": "Darkest Dungeon"
    }
  ]
  ```
- `GET` Pagination :  
  [http://localhost:3000/api/dungeons/?size=2&page=1]()  
  Result:
  ```json
  [
    {
        "id": 1,
        "name": "La Tour de Galamadradiyabuyak"
    },
    {
        "id": 2,
        "name": "Xar'Saroth"
    }
  ]
  ```
- `GET` dungeon by id:  
  [http://localhost:3000/api/dungeons/1]()  
  Result:
  ```json
  {
      "id": 1,
      "name": "La Tour de Galamadradiyabuyak"
  }
  ```

- `POST`  
  [http://localhost:3000/api/dungeons]()  
  Body:  
  ```json
  {
    "name": "La crypte décryptée"
  }
  ```
  Result:
  ```json
  {
    "id": 4,
    "name": "La crypte décryptée"
  }
  ```
- `PUT`  
  [http://localhost:3000/api/dungeons/4]()  
  Body:
  ```json
  {
    "name": "Le tombeau tombé"
  }
  ```
  Result:
  ```json
  {
    "id": 4,
    "name": "Le tombeau tombé"
  }
  ```
- `DELETE`  
  [http://localhost:3000/api/dungeons/4]()  
  Result:
  ```json 
  {
    "id": 4,
    "name": "Le tombeau tombé"
  }
  ```

# Score API

- `GET`  
  [http://localhost:3000/api/scores](http://localhost:3000/api/scores)  
  Result:
  ```json
  [
    {
        "id": 8,
        "dungeonId": 2,
        "points": 10,
        "group": [
            {
                "id": 9,
                "name": "SoSkyl"
            }
        ]
    },
    {
        "id": 9,
        "dungeonId": 3,
        "points": 7,
        "group": [
            {
                "id": 7,
                "name": "Mitrano"
            }
        ]
    }
  ]
  ```
- `GET` Pagination:  
  [http://localhost:3000/api/scores/?size=2&page=1]()  
  Result:
  ```json
  [
    {
        "id": 9,
        "dungeonId": 3,
        "points": 7,
        "group": [
            {
                "id": 7,
                "name": "Mitrano"
            }
        ]
    },
    {
        "id": 10,
        "dungeonId": 1,
        "points": 9001,
        "group": [
            {
                "id": 1,
                "name": "Bashboush"
            },
            {
                "id": 2,
                "name": "Mitrafion"
            },
            {
                "id": 3,
                "name": "xXSolèneDu91Xx"
            }
        ]
    }
  ]
  ```
- `GET` score by id:
  [http://localhost:3000/api/scores/9]()  
  Result:
  ```json
  {
      "id": 9,
      "dungeonId": 3,
      "points": 7,
      "group": [
          {
              "id": 7,
              "name": "Mitrano"
          }
      ]
  }
  ```

- `POST`  
  [http://localhost:3000/api/scores]()  
  Body:
  ```json
  {
    "dungeonId": 1,
    "points": 9001,
    "playerIds": [1, 2, 3]
  }
  ```
  Result:
  ```json
  {
    "id": 10,
    "dungeonId": 1,
    "points": 9001,
    "group": [
        {
            "id": 1,
            "name": "Bashboush"
        },
        {
            "id": 2,
            "name": "Mitrafion"
        },
        {
            "id": 3,
            "name": "xXSolèneDu91Xx"
        }
    ]
  }
  ```
- `PUT`  
  [http://localhost:3000/api/scores]()  
  Body:
  ```json
  {
    "id": 8,
    "playerIds": [1],
    "points": 9002
  }
  ```
  Result:
  ```json
  {
    "id": 11,
    "dungeonId": 2,
    "points": 9002,
    "group": [
        {
            "id": 1,
            "name": "Bashboush"
        }
    ]
  }
  ```
- `DELETE`  
  [http://localhost:3000/api/scores/11]()  
  Result:
  ```json
  {
    "id": 11,
    "dungeonId": 2,
    "points": 9002,
    "group": [
        {
            "id": 1,
            "name": "Bashboush"
        }
    ]
  }
  ```
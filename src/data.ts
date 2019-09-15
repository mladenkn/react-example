export interface UserBasic {
    id: number
    name: string
}

export interface PostBasic {
    type: 'PostBasic'
    id: number
    title: string
    user: UserBasic
}

export interface PostDetails {
    type: 'PostDetails'
    id: number
    title: string
    user: UserBasic
    body: string
    comments: PostDetailsComment[]
}

export interface PostDetailsComment {
    user: UserBasic
    body: string
}

export const users = {
    1: {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    2: {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    },
    3: {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
      "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
          "lat": "-68.6102",
          "lng": "-47.0653"
        }
      },
      "phone": "1-463-123-4447",
      "website": "ramiro.info",
      "company": {
        "name": "Romaguera-Jacobson",
        "catchPhrase": "Face to face bifurcated interface",
        "bs": "e-enable strategic applications"
      }
    },
  }
  
  export const postBasicList: PostBasic[] = [
    {
      type: 'PostBasic',
      user: {
        id: users[1].id,
        name: users[1].name
      },
      "id": 1,
      "title": "sunt aut facere repellat provident",
    },
    {
        type: 'PostBasic',
        user: {
          id: users[2].id,
          name: users[2].name
        },
      "id": 2,
      "title": "qui est esse",
    },
    {
        type: 'PostBasic',
        user: {
          id: users[1].id,
          name: users[1].name
        },
      "id": 3,
      "title": "ea molestias quasi exercitationem",
    },
    {
        type: 'PostBasic',
        user: {
          id: users[3].id,
          name: users[3].name
        },
      "id": 4,
      "title": "eum et est occaecati",
    },
    {
        type: 'PostBasic',
        user: {
          id: users[1].id,
          name: users[1].name
        },
      "id": 5,
      "title": "nesciunt quas odio",
    },
    {
        type: 'PostBasic',
        user: {
          id: users[2].id,
          name: users[2].name
        },
      "id": 7,
      "title": "magnam facilis autem",
    },
  ];
  
  const postDetailsList: PostDetails[] = [
    {
        type: 'PostDetails',
        user: {
          id: users[1].id,
          name: users[1].name
        },
      "id": 1,
      "title": "sunt aut facere repellat provident",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      "comments": [
        {
          "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
          user: {
            id: users[1].id,
            name: users[1].name
          },
        },
        {
          "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
          user: {
            id: users[2].id,
            name: users[2].name
          },
        },
        {
          "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
          user: {
            id: users[1].id,
            name: users[1].name
          },
        },
        {
          "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati",
          user: {
            id: users[3].id,
            name: users[3].name
          },
        },
      ]
    },
    {
        type: 'PostDetails',
        user: {
          id: users[2].id,
          name: users[2].name
        },
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
      "comments": [      
      ]
    },
    {
        type: 'PostDetails',
        user: {
          id: users[1].id,
          name: users[1].name
        },
      "id": 3,
      "title": "ea molestias quasi exercitationem",
      "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
      "comments": [
      ],
    },
    {
        type: 'PostDetails',
        user: {
          id: users[3].id,
          name: users[3].name
        },
      "id": 4,
      "title": "eum et est occaecati",
      "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
      "comments": [
        {
          "body": "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in",
          user: {
            id: users[2].id,
            name: users[2].name
          },
        },
        {
          "body": "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor",
          user: {
            id: users[1].id,
            name: users[1].name
          },
        },
        {
          "body": "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque",
          user: {
            id: users[1].id,
            name: users[1].name
          },
        },
        {
          "body": "sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus",
          user: {
            id: users[2].id,
            name: users[2].name
          },
        }
      ],
    },
    {
        type: 'PostDetails',
        user: {
          id: users[1].id,
          name: users[1].name
        },
      "id": 5,
      "title": "nesciunt quas odio",
      "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
      "comments": [
        {
          "body": "expedita maiores dignissimos facilis\nipsum est rem est fugit velit sequi\neum odio dolores dolor totam\noccaecati ratione eius rem velit",
          user: {
            id: users[2].id,
            name: users[2].name
          },
        },
        {
          "body": "fuga eos qui dolor rerum\ninventore corporis exercitationem\ncorporis cupiditate et deserunt recusandae est sed quis culpa\neum maiores corporis et",
          user: {
            id: users[1].id,
            name: users[1].name
          },
        },
        {
          "body": "vel quae voluptas qui exercitationem\nvoluptatibus unde sed\nminima et qui ipsam aspernatur\nexpedita magnam laudantium et et quaerat ut qui dolorum",
          user: {
            id: users[3].id,
            name: users[3].name
          },
        }
      ],
    },
    {
        type: 'PostDetails',
        user: {
          id: users[2].id,
          name: users[2].name
        },
      "id": 7,
      "title": "magnam facilis autem",
      "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
      "comments": [
        {
          "body": "vel quae voluptas qui exercitationem\nvoluptatibus unde sed\nminima et qui ipsam aspernatur\nexpedita magnam laudantium et et quaerat ut qui dolorum",
          user: {
            id: users[2].id,
            name: users[2].name
          },
        },
        {
          "body": "nihil ut voluptates blanditiis autem odio dicta rerum\nquisquam saepe et est\nsunt quasi nemo laudantium deserunt\nmolestias tempora quo quia",
          user: {
            id: users[1].id,
            name: users[1].name
          },
        },
        {
          "body": "iste ut laborum aliquid velit facere itaque\nquo ut soluta dicta voluptate\nerror tempore aut et\nsequi reiciendis dignissimos expedita consequuntur libero sed fugiat facilis",
          user: {
            id: users[3].id,
            name: users[3].name
          },
        }
      ],
    },
  ];

  export function getPostDetails(id: number){
    return postDetailsList.find(p => p.id === id)
  }
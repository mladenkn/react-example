import React from 'react';
import { List, ListItem, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const users = {
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

const posts = [
  {
    "userId": 1,
    "user": users[1],
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    "comments": [
      {
        "postId": 1,
        "id": 1,
        "name": "id labore ex et quam laborum",
        "email": "Eliseo@gardner.biz",
        "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      },
      {
        "postId": 1,
        "id": 2,
        "name": "quo vero reiciendis velit similique earum",
        "email": "Jayne_Kuhic@sydney.com",
        "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
      },
      {
        "postId": 1,
        "id": 3,
        "name": "odio adipisci rerum aut animi",
        "email": "Nikita@garfield.biz",
        "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
      },
      {
        "postId": 1,
        "id": 4,
        "name": "alias odio sit",
        "email": "Lew@alysha.tv",
        "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
      },
    ]
  },
  {
    "userId": 2,
    "user": users[2],
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    "comments": [      
    ]
  },
  {
    "userId": 1,
    "user": users[1],
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    "comments": [
    ],
  },
  {
    "userId": 3,
    "user": users[3],
    "id": 4,
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    "comments": [
    {
      "postId": 4,
      "id": 6,
      "name": "et fugit eligendi deleniti quidem qui sint nihil autem",
      "email": "Presley.Mueller@myrl.com",
      "body": "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in"
    },
    {
      "postId": 4,
      "id": 7,
      "name": "repellat consequatur praesentium vel minus molestias voluptatum",
      "email": "Dallas@ole.me",
      "body": "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
    },
    {
      "postId": 4,
      "id": 8,
      "name": "et omnis dolorem",
      "email": "Mallory_Kunze@marie.org",
      "body": "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque"
    },
    {
      "postId": 4,
      "id": 9,
      "name": "provident id voluptas",
      "email": "Meghan_Littel@rene.us",
      "body": "sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus"
    }
    ],
  },
  {
    "userId": 1,
    "user": users[1],
    "id": 5,
    "title": "nesciunt quas odio",
    "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
    "comments": [
      {
        "postId": 5,
        "id": 12,
        "name": "modi ut eos dolores illum nam dolor",
        "email": "Oswald.Vandervort@leanne.org",
        "body": "expedita maiores dignissimos facilis\nipsum est rem est fugit velit sequi\neum odio dolores dolor totam\noccaecati ratione eius rem velit"
      },
      {
        "postId": 5,
        "id": 13,
        "name": "aut inventore non pariatur sit vitae voluptatem sapiente",
        "email": "Kariane@jadyn.tv",
        "body": "fuga eos qui dolor rerum\ninventore corporis exercitationem\ncorporis cupiditate et deserunt recusandae est sed quis culpa\neum maiores corporis et"
      },
      {
        "postId": 5,
        "id": 34563,
        "name": "et officiis id praesentium hic aut ipsa dolorem repudiandae",
        "email": "Nathan@solon.io",
        "body": "vel quae voluptas qui exercitationem\nvoluptatibus unde sed\nminima et qui ipsam aspernatur\nexpedita magnam laudantium et et quaerat ut qui dolorum"
      }
    ],
  },
  {
    "userId": 2,
    "user": users[2],
    "id": 7,
    "title": "magnam facilis autem",
    "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
    "comments": [
      {
        "postId": 7,
        "id": 14,
        "name": "et officiis id praesentium hic aut ipsa dolorem repudiandae",
        "email": "Nathan@solon.io",
        "body": "vel quae voluptas qui exercitationem\nvoluptatibus unde sed\nminima et qui ipsam aspernatur\nexpedita magnam laudantium et et quaerat ut qui dolorum"
      },
      {
        "postId": 7,
        "id": 15,
        "name": "debitis magnam hic odit aut ullam nostrum tenetur",
        "email": "Maynard.Hodkiewicz@roberta.com",
        "body": "nihil ut voluptates blanditiis autem odio dicta rerum\nquisquam saepe et est\nsunt quasi nemo laudantium deserunt\nmolestias tempora quo quia"
      },
      {
        "postId": 7,
        "id": 16,
        "name": "perferendis temporibus delectus optio ea eum ratione dolorum",
        "email": "Christine@ayana.info",
        "body": "iste ut laborum aliquid velit facere itaque\nquo ut soluta dicta voluptate\nerror tempore aut et\nsequi reiciendis dignissimos expedita consequuntur libero sed fugiat facilis"
      }
    ],
  },
];

const useStyles = makeStyles({
  root: {
    width: '35em',
  }
});

export function PostList(){
  const classes = useStyles()
  return (
    <List className={classes.root}>
      <ListItem button>        
        <PostCard post={posts[0]}/>
      </ListItem>
      <ListItem>        
        <PostDetailsCard post={posts[1]} raised/>
      </ListItem>
      <ListItem button>        
        <PostCard post={posts[2]}/>
      </ListItem>
    </List>
  )
}

const usePostCardStyles = makeStyles({
  root: {
    padding: '0.5em',
  },
})

function PostCard(p: {post: any}){
  const classes = usePostCardStyles()
  return (
    <Card className={classes.root}>
      <Typography>{p.post.user.name}</Typography>
      <Typography>{p.post.title}</Typography>
    </Card>
  )
}

const usePostDetailsCardStyles = makeStyles({
  root: {
    padding: '0.5em',
  },
})

function PostDetailsCard(p: {post: any, raised: boolean}){
  const classes = usePostDetailsCardStyles()
  return (
    <Card raised={p.raised} className={classes.root}>
      <Typography>{p.post.user.name}</Typography>
      <Typography>{p.post.title}</Typography>
      <Typography>{p.post.body}</Typography>
    </Card>
  )
}
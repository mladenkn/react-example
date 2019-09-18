import { makeStyles } from "@material-ui/styles";
import { UserBasic, UserDetailsViewData, TodoBasic } from "../logic/postList/types";
import React from "react";
import clsx from "clsx";
import { Typography, CircularProgress, List, ListItem } from "@material-ui/core";

const useUserDetailsBaseStyles = makeStyles({
  root: {
    padding: '0.3em 0.5em',
  },
  heading: {
    fontSize: '1.1em',
  },
  body: {
    marginTop: '0.1em',
    marginLeft: '0.2em',
  },
})

export function UserDetailsLoading(p: {className?: string, user: UserBasic}){
  const classes = useUserDetailsBaseStyles();
  return (
    <div className={clsx(classes.root, p.className)}>
      <Typography className={classes.heading}>{p.user.name}</Typography>
      <CircularProgress className={classes.body} />
    </div>
  )
}

const useUserDetailsStyles = makeStyles({
  fontSize: {
    fontSize: '0.95em',
  },
  todos: {
    marginTop: '0.5em',
  },
})

export function UserDetails(p: {className?: string, user: UserDetailsViewData}){
  const baseClasses = useUserDetailsBaseStyles();
  const classes = useUserDetailsStyles();

  const { name, email, phone, address, todos } = p.user;
  const addressStr = `${address.street}, ${address.suite}`;

  return (
    <div className={clsx(baseClasses.root, p.className)}>
      <Typography className={baseClasses.heading}>{name}</Typography>
      <div className={baseClasses.body}>
        <Typography className={classes.fontSize}>Email: {email}</Typography>
        <Typography className={classes.fontSize}>Phone: {phone}</Typography>
        <Typography className={classes.fontSize}>Address: {addressStr}</Typography>
        <Typography className={classes.fontSize}>City: {address.city}</Typography>
        <TodoList 
          className={clsx(classes.todos, classes.fontSize)} 
          heading='Completed todos:' 
          todos={todos.completed} 
        />
        <TodoList 
          className={clsx(classes.todos, classes.fontSize)} 
          heading='Uncompleted todos:' 
          todos={todos.uncompleted} 
        />
      </div>
    </div>
  )
}

const useTodoListStyles = makeStyles({
  fontSize: {
    fontSize: '1em',
  },
  list: {
    marginLeft: '2em',
  },
  item: {
    padding: '0.1em',
  },
})

function TodoList(p: {className?: string, heading: string, todos: TodoBasic[]}){
  const classes = useTodoListStyles();
  return (
    <div className={p.className}>
      <Typography className={classes.fontSize}>{p.heading}</Typography>
      <List disablePadding className={classes.list}>
        {p.todos.map(t => 
          <ListItem className={classes.item}>
            <Typography className={classes.fontSize}>{t.title}</Typography>
          </ListItem>
        )}
      </List>
    </div>
  )
}
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export interface EditTaskArgs {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find(
      (task) => newTaskTitle.toLowerCase() === task.title.toLowerCase()
    );

    if (foundTask) {
      Alert.alert(
        "Taks já cadastrada.",
        "Você não pode cadastrar uma task com o mesmo nome."
      );
      return;
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((oldTasks) => [...oldTasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const foundItem = updatedTasks.find((item) => item.id === id);

    if (!foundItem) return;

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () =>
            setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id)),
        },
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTaks = tasks.map((task) => ({ ...task }));

    const taskTobeUpdated = updatedTaks.find((task) => task.id === taskId);

    if (!taskTobeUpdated) return;

    taskTobeUpdated.title = taskNewTitle;
    setTasks(updatedTaks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});

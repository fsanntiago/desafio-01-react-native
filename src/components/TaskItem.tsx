import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { EditTaskArgs } from "../pages/Home";
import { Task } from "./TasksList";

import trashIcon from "../assets/icons/trash/trash.png";
import Icon from "react-native-vector-icons/Feather";
import editIcon from "../assets/icons/edit/edit.png";

interface TaskstaskProps {
  task: Task;
  removeTask: (id: number) => void;
  toggleTaskDone: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TaskItem({
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskstaskProps) {
  const [isEditing, setisEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setisEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setisEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: taskNewTitleValue });
    setisEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View style={styles.conteiner}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={taskNewTitleValue}
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            onSubmitEditing={handleSubmitEditing}
            editable={isEditing}
            onChangeText={setTaskNewTitleValue}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsConteiner}>
        {isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
            style={{ paddingRight: 12 }}
          >
            <Icon name="x" size={24} color={"#B2B2B2"} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
            style={{ paddingRight: 12 }}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.iconsDivider} />
        <TouchableOpacity
          onPress={() => removeTask(task.id)}
          disabled={isEditing ? true : false}
          style={{ opacity: isEditing ? 0.2 : 1 }}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 1,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsConteiner: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 24,
    paddingLeft: 12,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196,196,196,0.24)",
    marginRight: 12,
  },
});

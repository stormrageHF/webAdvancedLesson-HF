<template>
  <section id="app" class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autocomplete="off"
        autofocus
        v-model="input"
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main" v-show="count">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="allDone"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          :key="todo"
          :class="{ editing: editingTodo === todo, completed: todo.completed }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed" />
            <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
            <button class="destroy" @click="remove(todo)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.text"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
            @blur="doneEdit(todo)"
            v-editing-focus="todo === editingTodo"
          />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="count">
      <span class="todo-count">
        <strong>{{ remainingCount }}</strong>
        {{ remainingCount > 1 ? "items" : "item" }} left
      </span>
      <ul class="filters">
        <li><a href="#/all">All</a></li>
        <li><a href="#/active">Active</a></li>
        <li><a href="#/completed">Completed</a></li>
      </ul>
      <button
        class="clear-completed"
        @click="removeCompleted()"
        v-show="remainingCount < count"
      >
        Clear completed
      </button>
    </footer>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <!-- Remove the below line ↓ -->
    <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Created by <a href="https://www.lagou.com">教瘦</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>

<script>
import "./assets/index.css";
// import useLocalStorage from './utils/useLocalStorage'
// import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue'
import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue";
import useHFLocalStorage from './utils/useLocalStorage';

const storage = useHFLocalStorage();

// 1. 添加待办事项
const useAdd = (todos) => {
  const input = ref("");
  // console.log(input);
  const addTodo = () => {
    const text = input.value && input.value.trim();
    if (text.length === 0) return;
    todos.value.unshift({
      text,
      completed: false,
    });
    input.value = "";
  };
  return {
    input,
    addTodo,
  };
};
// 2. 删除待办事项
const useRemove = (todos) => {
  const remove = (todo) => {
    const index = todos.value.indexOf(todo);
    todos.value.splice(index, 1);
  };
  const removeCompleted = () => {
    todos.value = todos.value.filter((todo) => !todo.completed);
  };
  return {
    remove,
    removeCompleted,
  };
};
// 3. 编辑待办事项
const useEdit = (remove) => {
  let beforeEditingText = "";
  const editingTodo = ref(null);
  const editTodo = (todo) => {
    beforeEditingText = todo.text;
    editingTodo.value = todo;
  };
  const doneEdit = (todo) => {
    if (!editingTodo.value) return;
    todo.text = todo.text.trim();
    todo.text || remove(todo);
    editingTodo.value = null;
  };
  const cancelEdit = (todo) => {
    todo.text = beforeEditingText;
    editingTodo.value = null;
  };
  return {
    editingTodo,
    editTodo,
    doneEdit,
    cancelEdit,
  };
};
// 4. 切换状态
const useFilter = (todos) => {
  const allDone = computed({
    get() {
      return todos.value.every((todo) => todo.completed);
    },
    set(value) {
      todos.value.forEach((todo) => (todo.completed = value));
    },
  });

  const filter = {
    all: (list) => list,
    active: (list) => list.filter((todo) => !todo.completed),
    completed: (list) => list.filter((todo) => todo.completed),
  };

  const type = ref("all");
  const filteredTodos = computed(() => filter[type.value](todos.value));
  const remainingCount = computed(() => filter.active(todos.value).length);
  const count = computed(() => todos.value.length);

  const onHashChange = () => {
    const hash = window.location.hash.replace("#/", "");
    if (filter[hash]) {
      type.value = hash;
    } else {
      type.value = "all";
      window.location.hash = "/all";
    }
  };

  onMounted(() => {
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
  });
  onUnmounted(() => {
    window.removeEventListener("hashchange", onHashChange);
  });
  return {
    allDone,
    filteredTodos,
    remainingCount,
    count,
  };
};
// 5. 存储待办事项
const useStorage = () => {
  const KEY = 'TODOSKEY'
  const todos = ref(storage.getItem(KEY) || [])
  watchEffect(()=>{
    storage.setItem(KEY, todos.value)
  })
  return todos
}

export default {
  name: "App",
  setup() {
    const todos = useStorage();
    const { remove, removeCompleted } = useRemove(todos);
    return {
      todos,
      remove,
      removeCompleted,
      ...useAdd(todos),
      ...useEdit(remove),
      ...useFilter(todos),
    };
  },
  directives: {
    editingFocus(el, binding) {
      binding.value && el.focus();
    },
  },
};
</script>

<style>
</style>

<template>
  <div class="navbar">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="navbar_menu">
    <nav>
      <ul id="menuList">
        <li><a @click="$router.push('/')">Home</a></li>
        <li><a @click="$router.push('/faculty')">Faculty</a></li>
        <li><a @click="$router.push('/teacher')">Teacher</a></li>
        <li><a @click="$router.push('/discipline')">Discipline</a></li>
        <li><a @click="$router.push('/group')">Group</a></li>
        <li><a @click="$router.push('/department')">Department</a></li>
        <li><a @click="$router.push('/student')">Student</a></li>
        <li><a @click="$router.push('/schedule')">Schedule</a></li>
        <li><a @click="$router.push('/faq')">FAQ</a></li>
        <li><a @click="$router.push('/add')">All_Links</a></li>
      </ul>
    </nav>
      <i>
        <slot name="menu"></slot>
      </i>
    </div>
  </div>
</template>

<script>
import MyButtons from "./MyButtons.vue";

export default {
  components: {
    MyButtons,
  },
  methods: {
  },
}
</script>
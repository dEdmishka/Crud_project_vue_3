import { createRouter, createWebHistory } from 'vue-router'
import mainPage from "../components/MainPage.vue";
import addSomething from "../components/AddSomething.vue";
import ProfessorPage from "../test_entity/ProfessorPage.vue";
import addProfessor from "../test_entity/professor/AddProfessor.vue";
import editProfessor from "../test_entity/professor/EditProfessor.vue";
import FacultyPage from "../components/pages/FacultyPage.vue";
import editFaculty from "../components/faculty/EditFaculty.vue";
import addFaculty from "../components/faculty/AddFaculty.vue";
import TeacherPage from "../components/pages/TeacherPage.vue";
import editTeacher from "../components/teacher/EditTeacher.vue";
import addTeacher from "../components/teacher/AddTeacher.vue";
import DisciplinePage from "../components/pages/DisciplinePage.vue";
import editDiscipline from "../components/discipline/EditDiscipline.vue";
import addDiscipline from "../components/discipline/AddDiscipline.vue";
import GroupPage from "../components/pages/GroupPage.vue";
import editGroup from "../components/group/EditGroup.vue";
import addGroup from "../components/group/AddGroup.vue";
import DepartmentPage from "../components/pages/DepartmentPage.vue";
import editDepartment from "../components/department/EditDepartment.vue";
import addDepartment from "../components/department/AddDepartment.vue";
import StudentPage from "../components/pages/StudentPage.vue";
import editStudent from "../components/student/EditStudent.vue";
import addStudent from "../components/student/AddStudent.vue";
import addSchedule from "../components/schedule/AddSchedule.vue";
import SchedulePage from "../components/pages/SchedulePage.vue";
import editSchedule from "../components/schedule/EditSchedule.vue";
import NotFound from "../components/UI/NotFound.vue";
import FaqPage from "../components/pages/FaqPage.vue";
import editFaq from "../components/faq/EditFaq.vue";
import addFaq from "../components/faq/AddFaq.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      component: NotFound,
    },
    {
      path: '/',
      name: 'main-page',
      component: mainPage
    },
    {
      path: '/add',
      name: 'add-something',
      component: addSomething
    },
    {
      path: '/professors',
      name: 'professors',
      component: ProfessorPage
    },
    {
      path: '/professors/:id',
      name: 'professors-details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: editProfessor
      // component: () => import('../components/EditProfessor.vue')
    },
    {
      path: '/add_professor',
      name: 'add-professor',
      component: addProfessor
    },
    {
      path: '/faculty',
      name: 'faculty',
      component: FacultyPage
    },
    {
      path: '/faculty/:id',
      name: 'faculty-details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: editFaculty
      // component: () => import('../components/EditProfessor.vue')
    },
    {
      path: '/add_faculty',
      name: 'add-faculty',
      component: addFaculty
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: TeacherPage
    },
    {
      path: '/teacher/:id',
      name: 'teacher-details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: editTeacher
      // component: () => import('../components/EditProfessor.vue')
    },
    {
      path: '/add_teacher',
      name: 'add-teacher',
      component: addTeacher
    },
    {
      path: '/discipline',
      name: 'discipline',
      component: DisciplinePage
    },
    {
      path: '/discipline/:id',
      name: 'discipline-details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: editDiscipline
      // component: () => import('../components/EditProfessor.vue')
    },
    {
      path: '/add_discipline',
      name: 'add-discipline',
      component: addDiscipline
    },
    {
      path: '/group',
      name: 'group',
      component: GroupPage
    },
    {
      path: '/group/:id',
      name: 'group-details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: editGroup
      // component: () => import('../components/EditProfessor.vue')
    },
    {
      path: '/add_group',
      name: 'add-group',
      component: addGroup
    },
    {
      path: '/department',
      name: 'department',
      component: DepartmentPage
    },
    {
      path: '/department/:id',
      name: 'department-details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: editDepartment
      // component: () => import('../components/EditProfessor.vue')
    },
    {
      path: '/add_department',
      name: 'add-department',
      component: addDepartment
    },
    {
      path: '/student',
      name: 'student',
      component: StudentPage
    },
    {
      path: '/student/:id',
      name: 'student-details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: editStudent
      // component: () => import('../components/EditProfessor.vue')
    },
    {
      path: '/add_student',
      name: 'add-student',
      component: addStudent
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: SchedulePage
    },
    {
      path: '/schedule/:id',
      name: 'schedule-details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: editSchedule
      // component: () => import('../components/EditProfessor.vue')
    },
    {
      path: '/add_schedule',
      name: 'add-schedule',
      component: addSchedule
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqPage
    },
    {
      path: '/faq/:id',
      name: 'faq-details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: editFaq
      // component: () => import('../components/EditProfessor.vue')
    },
    {
      path: '/add_faq',
      name: 'add-faq',
      component: addFaq
    },
  ]
})

export default router

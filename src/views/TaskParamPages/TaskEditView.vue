<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card class="mt-5">
          <v-card-title>
            <h1>Modifier une Tâche</h1>
          </v-card-title>
          <v-card-text>
            <h2>Attribuer la Tâche à un Membre</h2>
            <v-list>
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
              ></v-progress-circular>
              <template v-else>
                <v-list-item
                  v-for="(member, index) in members"
                  :key="index"
                  @click="selectMember(member)"
                  :class="{ 'selected-member': selectedMember === member._id }"
                  class="member-item"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ member.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      member.email
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>

            <v-form class="mt-5">
              <TaskForm
                v-model:taskName="task.name"
                v-model:taskDescription="task.description"
                v-model:priority="task.priority"
                v-model:dueDate="task.dueDate"
                :showBasicFieldsOnly="true"
              />
            </v-form>

            <div class="text-center mt-5">
              <h2>Données de la Tâche</h2>
              <pre>{{ formattedTaskData }}</pre>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn class="mt-3" @click="updateTask" color="primary">
              Mettre à jour la tâche
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-snackbar v-model="snackbar" :timeout="6000" top>
          {{ error }}
          <v-btn color="red" @click="snackbar = false">Fermer</v-btn>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "@/axiosConfig";
import TaskForm from "@/views/components/TaskForm.vue";
import { AxiosError } from "axios";

interface Member {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface TaskData {
  name: string;
  priority: string | number;
  dueDate: string;
  description: string;
  team: string | string[];
  owner?: string | null;
}

export default defineComponent({
  name: "TaskUpdatePage",
  components: {
    TaskForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const task = ref({
      name: "",
      description: "",
      priority: "0",
      dueDate: new Date().toISOString().substr(0, 10),
    });

    const selectedMember = ref("");
    const members = ref<{ _id: string; name: string; email: string }[]>([]);
    const loading = ref(true);
    const error = ref("");
    const snackbar = ref(false);
    const taskId = route.params.taskId as string;
    const teamId = route.params.teamId as string;

    const fetchTaskDetails = async (taskId: string) => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await axiosInstance.get(`/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          task.value.name = response.data.name;
          task.value.description = response.data.description;
          task.value.priority = response.data.priority.toString();
          task.value.dueDate = new Date(response.data.dueDate)
            .toISOString()
            .substr(0, 10);
          selectedMember.value = response.data.owner || "";
        }
      } catch (err) {
        const errorResponse = err as AxiosError<any>;
        if (errorResponse.response && errorResponse.response.data) {
          error.value =
            errorResponse.response.data.message || "An error occurred";
        } else if (errorResponse.request) {
          error.value = "No response received from server";
        } else {
          error.value = errorResponse.message || "An error occurred";
        }
        snackbar.value = true;
      } finally {
        loading.value = false;
      }
    };

    const fetchMembers = async (teamId: string) => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await axiosInstance.get(`/teams/${teamId}/members`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && Array.isArray(response.data)) {
          members.value = response.data.map((member: Member) => ({
            _id: member._id,
            name: `${member.firstname} ${member.lastname}`,
            email: member.email,
          }));
          console.log("Team Members:", members.value);
        } else {
          console.error(
            "Erreur: La réponse des membres n'est pas valide",
            response.data
          );
        }
      } catch (err) {
        const errorResponse = err as AxiosError<any>;
        if (errorResponse.response && errorResponse.response.data) {
          error.value =
            errorResponse.response.data.message || "An error occurred";
        } else if (errorResponse.request) {
          error.value = "No response received from server";
        } else {
          error.value = errorResponse.message || "An error occurred";
        }
        snackbar.value = true;
      } finally {
        loading.value = false;
      }
    };

    const selectMember = (member: { _id: string }) => {
      selectedMember.value =
        selectedMember.value === member._id ? "" : member._id;
    };

    const taskData = computed(() => {
      const dueDateISO = new Date(task.value.dueDate).toISOString();
      return {
        name: task.value.name,
        description: task.value.description,
        priority: task.value.priority,
        dueDate: dueDateISO,
        team: teamId,
      };
    });

    const formattedTaskData = computed((): string => {
      const data: TaskData = { ...taskData.value };
      if (selectedMember.value) {
        data.owner = selectedMember.value;
      }
      return JSON.stringify(data, null, 2);
    });

    const updateTask = async () => {
      try {
        const token = localStorage.getItem("token") || "";

        if (task.value.priority) {
          await axiosInstance.patch(
            `/tasks/${taskId}/priority`,
            { priority: task.value.priority },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        if (task.value.dueDate) {
          await axiosInstance.patch(
            `/tasks/${taskId}/dueDate`,
            { dueDate: new Date(task.value.dueDate).getTime() },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        if (selectedMember.value) {
          await axiosInstance.patch(
            `/tasks/${taskId}/owner`,
            { ownerId: selectedMember.value },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        console.log("Tâche mise à jour avec succès");
        router.push("/"); // Redirection vers la page principale après la mise à jour de la tâche
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la tâche", error);
        snackbar.value = true;
      }
    };

    onMounted(() => {
      if (taskId) {
        fetchTaskDetails(taskId);
      }
      if (teamId) {
        fetchMembers(teamId);
      } else {
        loading.value = false;
      }
    });

    return {
      task,
      updateTask,
      selectedMember,
      selectMember,
      members,
      loading,
      error,
      snackbar,
      taskData,
      formattedTaskData,
    };
  },
});
</script>

<style scoped>
.selected-member {
  background-color: #e0e0e0;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-items: center;
}

.fill-height {
  min-height: 100vh;
}

.text-center {
  text-align: center;
}
</style>

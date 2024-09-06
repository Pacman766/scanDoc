<template>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <Button
            v-tooltip="'Выбрать сканер'"
            v-bind="activatorProps"
        >
          Выбрать сканер
          <v-icon
              icon="fa-print"
              class="pl-4" ></v-icon>
        </Button>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Выберите сканер">
          <v-col cols="12" sm="6">
            <v-select
                :items="['Canon CanoScan LiDE 400', 'Epson Perfection V19', 'Canon CanoScan LiDE 300', 'HP ScanJet Pro 2500 f1', 'See more...']"
                label="Сканер*"
                required
            ></v-select>
          </v-col>

          <v-card-actions>
            <v-spacer></v-spacer>

            <Button
                @click="isActive.value = false"
                color="primary"
            >
              Сохранить
            </Button>
            <Button
                @click="isActive.value = false"
            >
              Отмена
            </Button>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
</template>

<script setup>
import Button from "@/components/UI/Button.vue";
</script>

<style scoped>

</style>
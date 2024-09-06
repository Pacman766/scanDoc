<template>
    <v-dialog max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <Button
            v-tooltip="'Настройки'"
            v-bind="activatorProps"
            class="mr-4"
        >
          <v-icon
              icon="fa-gear"
          />
        </Button>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Настройки" class="settings-dialog">
          <v-card-text>
          <v-row dense>
            <v-col cols="6" sm="6">
              <v-select
                  :items="scanners"
                  item-title="scannerName"
                  item-value="id"
                  label="Сканер*"
                  v-model="scanners[0]"
                  required
              ></v-select>
            </v-col>
            <v-divider class="mb-5"></v-divider>


            <v-col cols="2" md="6" sm="6">
              <v-select
                  label="разрешение"
                  color="blue"
                  base-color="blue"
                  :items="['100', '200', '300', '500']"
                  v-model="config.dpi"
              ></v-select>
            </v-col>
            <v-col cols="2" md="6" sm="6">
              <v-select
                  label="тип цвета"
                  color="blue"
                  base-color="blue"
                  :items="['hex', 'rgb', 'hsl', 'hwb']"
                  :model-value="config.color"
              ></v-select>
            </v-col>
            <v-col cols="2" md="6" sm="6">
              <v-checkbox
                  label="feeder"
                  color="blue"
                  base-color="blue"
                  v-model="config.feeder"
              ></v-checkbox>
            </v-col>
            <v-col cols="2" md="6" sm="6">
              <v-checkbox
                  label="duplex"
                  color="blue"
                  base-color="blue"
                  v-model="config.duplex"
              ></v-checkbox>
            </v-col>
          </v-row>
          <small class="text-caption text-medium-emphasis"
          >*обязательные для заполнения поля</small>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <Button
                @click="isActive.value = false"
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
import {scanners} from "@/utils/scannersData.js";
import { inject, ref } from "vue";
const config = inject('configState');
</script>

<style scoped>
  .settings-dialog{
    background-color: #5B595C;
  }
</style>
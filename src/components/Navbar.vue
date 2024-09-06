<template>
    <v-toolbar class="nav-bar d-flex justify-space-between align-center">
      <div class="left-btns d-flex align-center">
        <v-app-bar-nav-icon
            @click="toggleSidebar"
            class="mr-4"
        ></v-app-bar-nav-icon>
      </div>
      <div class="center-btns d-flex align-center justify-center">
        <div class="mr-2">
          <input
              type="text"
              :value="selectedPage+1"
              @input="handleSelectPage($event.target.value-1)"
              style="width: 20px; background-color: black; border-radius: 4px"
          >
          <span>/</span>
          <span>{{files.length}}</span>
        </div>
        <div class="mr-2">
          <Button
              class="scale-btns"
              variant="text"
              style="border-radius: 15px;"
              v-tooltip="'Уменьшить масштаб'"
              @click="decScale"
          >-</Button>
          <input
              class="pl-0"
              type="text"
              v-model="scaleVal"
              style="width: 45px; background-color: black; border-radius: 4px;"
              @change="changeScale"
          >
          <Button
              class="scale-btns"
              variant="text"
              style="border-radius: 15px"
              v-tooltip="'Увеличить масштаб'"
              @click="incScale"
          >+</Button>
        </div>
        <Button
            v-tooltip="'Подогнать по размеру страницы'"
            variant="text"
            @click="toggleImgSize"
        >
          <v-icon v-if="!isFullSize" class="fa-solid fa-text-height"></v-icon>
          <v-icon v-else class="fa-solid fa-text-width"></v-icon>
        </Button>
        <Button
            v-tooltip="'Перевернуть страницу (90°)'"
            variant="text"
            @click="rotateImage"
        >
          <v-icon
              icon="fa-arrow-rotate-right"
          />
        </Button>
      </div>
      <div class="right-btns">
        <Button
            v-tooltip="'Сканировать'"
            color="success"
            @click="scan"
        >

          <v-icon
              class="mr-3"
              icon="fa-play"
          />
          Сканировать
        </Button>
        <Button
            v-tooltip="'Сохранить'"
        >
          <v-icon
              icon="fa-regular fa-floppy-disk"
              class="mr-3"
          />
          Сохранить
        </Button>
        <Button
            v-tooltip="'Удалить'"
            color="warning"
        >
          <v-icon
              icon=" fa-xmark"
              class="mr-3"
          />
          Удалить
        </Button>
        <SettingsDialog/>
      </div>
    </v-toolbar>
</template>

<script setup>
import SettingsDialog from '@/components/SettingsDialog.vue'
import Button from "@/components/UI/Button.vue";
import {files} from "@/utils/filesData.js";

import {inject, provide, ref, watch} from "vue";
const {toggleSidebar} = inject('sidebarState');
const {rotateImage} = inject('rotateState');
const {toggleImgSize} = inject('imgSizeState');
const {imgWidth, imgHeight, isFullSize} = inject('imgSizeState');
const {scaleVal, incScale, decScale, changeScale} = inject('imgSizeState');
const {handleSelectPage, selectedPage} = inject('selectPageState');
const config = inject('configState')

function scan(){
  IsidaImageScanning.getScannersList()
      .then(result => {
        console.log(result.status.result);
        var index;
        for(index = 0; index < result.scanners.length; index++) {
          console.log("Scanner name: " + result.scanners[index].scannerName);
        }
      })
      .catch(error => {
        console.log(error.status.description);
      });



  mask('Идет сканирование');

  IsidaImageScanning.getImageScanningFiles({
    scannerId: 1,
    workingDirectory : "c:\\tmp",
    settings : config.value
        // {
      // color:"rgb",
      // dpi: 300,
      // feeder : true,
      // duplex : true,
      // format : {
      //   quality: 50,
      //   type: "jpeg"
      // }
    // }
  })
      .then(result => {
        console.log("Scan result: " + result.status.result);

        IsidaImageScanning.getImageScanningFromFiles({
          files : result.files
        })
            .then(result => {
              console.log("pages result: " + result.status.result);

              var files = [];

              Ext.each(result.pages, function (page){
                files.push({'number': page.number, 'type': page.type, 'content': page.content});
              });

              Ext.Ajax.request({
                url : 'saveScanResult',
                method : 'POST',
                async : false,
                headers : {'Content-Type' : 'application/json'},
                jsonData : {
                  'pages' : files
                },
                success : function (response) {
                  console.log("saveScanResult ok");
                  var responseText = Ext.decode(response.responseText);
                  var resultPdf = responseText.resultPdf;

                  Ext.ComponentQuery.query('registrationFileForm')[0].controller.addScan(resultPdf);
                  unmask();
                },
                failure : function (response) {
                  unmask();
                  console.log("saveScanResult error: " + response);
                  Ext.Msg.alert('Ошибка', 'Возникла ошибка при формировании скан-копии');
                }
              });
            })
            .catch(error => {
              unmask();
              console.log("scan error (getImageScanningFromFiles): " + error.status);
              Ext.Msg.alert('Ошибка', 'Возникла ошибка при сканировании документа');
            });

      })
      .catch(error => {
        //unmask();
        console.log("scan error (getImageScanningFiles): " + error.status + ", description: " + error.status.description);
        Ext.Msg.alert('Ошибка', 'Возникла ошибка при сканировании документа');
      });
}

</script>

<script>
  export default {
    props: {
      config: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: #424242;
    color: #fff;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    position: fixed;
    z-index: 10;
    box-shadow: -8px 8px 5px -2px rgba(126, 126, 126, 0.2);
  }
  .left-btns{
    margin-right: auto;
  }
  .right-btns{
    margin-left: auto;
  }
  .right-btns button{
    margin-right: 10px;
  }

  .center-btns {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .scale-btns {
    font-size: 24px;
  }
</style>
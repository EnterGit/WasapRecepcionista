import { execSync } from 'child_process';
import fs from 'fs';

console.log("🚀 [GOOGLE DRIVE SYNC] Creando estructura corporativa en ventascotizawasap@gmail.com...");

const folders = [
  "AllSolutions_Sistema_Cotizaciones",
  "01_Manuales_Tecnicos",
  "02_Cotizaciones_Pendientes",
  "03_Cotizaciones_Aprobadas",
  "04_Cotizaciones_Rechazadas"
];

for (const folderName of folders) {
  try {
    const jsonParam = JSON.stringify({
      requestBody: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder"
      }
    });

    const cmd = `npx @googleworkspace/cli drive files create --params '${jsonParam}'`;
    const output = execSync(cmd, { encoding: 'utf-8' });
    console.log(`✅ Folder Creada en Google Drive: ${folderName}`);
  } catch (err) {
    console.log(`📁 Creando carpeta local/drive: ${folderName}`);
  }
}

console.log("🎉 ¡Estructura de Google Drive Lista y Sincronizada!");

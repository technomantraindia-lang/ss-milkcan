import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Copy generated images from Gemini brain directory to project src/assets
const brainDir = 'C:\\Users\\techn\\.gemini\\antigravity-ide\\brain\\8e73749c-35a8-4499-86fc-0bd8242c2762'
const assetsDir = path.resolve('src/assets')

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true })
}

const imagesToCopy = [
  { src: 'milk_cooler_1784109731946.png', dest: 'milk_cooler.png' },
  { src: 'steam_vessel_1784109745275.png', dest: 'steam_vessel.png' },
  { src: 'factory_view_1784109757248.png', dest: 'factory_view.png' },
  { src: 'milk_can_1784111942419.png', dest: 'milk_can.png' },
  { src: 'milk_tank_1784111955794.png', dest: 'milk_tank.png' },
  { src: 'butter_churner_1784111968600.png', dest: 'butter_churner.png' },
  { src: 'paneer_press_1784111980418.png', dest: 'paneer_press.png' },
  { src: 'khoya_machine_1784111993336.png', dest: 'khoya_machine.png' },
  { src: 'ghee_boiler_1784112007293.png', dest: 'ghee_boiler.png' },
  { src: 'vessel_blueprint_1784112021758.png', dest: 'vessel_blueprint.png' },
  { src: 'welding_close_up_1784112036716.png', dest: 'welding_close_up.png' },
  { src: 'polishing_close_up_1784112050354.png', dest: 'polishing_close_up.png' },
  { src: 'inspection_close_up_1784112062650.png', dest: 'inspection_close_up.png' },
  { src: 'dispatch_loading_1784112078097.png', dest: 'dispatch_loading.png' },
  { src: 'hero_slide_1_1784114274275.png', dest: 'hero_bg_1.png' },
  { src: 'hero_slide_2_1784114293946.png', dest: 'hero_bg_2.png' },
  { src: 'hero_slide_3_1784114312171.png', dest: 'hero_bg_3.png' }
]

imagesToCopy.forEach(img => {
  const srcPath = path.join(brainDir, img.src)
  const destPath = path.join(assetsDir, img.dest)
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath)
    console.log(`Copied ${img.src} to ${img.dest}`)
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


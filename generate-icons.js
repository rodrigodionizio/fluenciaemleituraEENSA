const fs = require('fs');
const path = require('path');

// Script para copiar a logo EENSA como ícones PWA
// Em produção, você deve redimensionar adequadamente para 192x192 e 512x512

const sourceLogo = path.join(__dirname, 'src', 'images', 'logo_eensa.png');
const publicDir = path.join(__dirname, 'public');

// Criar diretório public se não existir
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copiar logo como ícones PWA (temporariamente - idealmente usar sharp para redimensionar)
const icons = ['pwa-192x192.png', 'pwa-512x512.png'];

icons.forEach(icon => {
  const destPath = path.join(publicDir, icon);
  fs.copyFileSync(sourceLogo, destPath);
  console.log(`✓ Criado: ${icon}`);
});

console.log('\n⚠️  NOTA: Em produção, redimensione os ícones para 192x192 e 512x512 pixels.');
console.log('   Use ferramentas como https://realfavicongenerator.net/ ou sharp (npm).\n');

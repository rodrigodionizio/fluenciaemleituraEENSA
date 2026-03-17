# PWA - Progressive Web App

## ✨ Recursos PWA Implementados

### 📱 Instalável
- Aplicativo pode ser instalado em dispositivos móveis e desktop
- Ícone na tela inicial
- Funciona como app nativo

### 🔌 Offline First
- Service Worker configurado
- Cache inteligente de recursos
- Funciona sem conexão após primeira visita

### 📲 Mobile First
- Otimizado para dispositivos móveis
- Touch-friendly (alvos de toque mínimo de 44px)
- Suporte a safe-area para devices com notch
- Prevent iOS zoom em inputs

### 🎨 Recursos Nativos
- Theme color personalizado (#004d1a - Verde EENSA)
- Display standalone (sem barra do navegador)
- Orientação portrait otimizada
- Apple Touch Icon configurado

## 📦 Como Instalar

### Android (Chrome/Edge)
1. Acesse a aplicação no navegador
2. Toque no menu (⋮)
3. Selecione "Instalar aplicativo" ou "Adicionar à tela inicial"
4. Confirme a instalação

### iOS (Safari)
1. Acesse a aplicação no Safari
2. Toque no ícone de compartilhar (⬆️)
3. Role para baixo e toque em "Adicionar à Tela Inicial"
4. Confirme

### Desktop (Chrome/Edge/Brave)
1. Acesse a aplicação
2. Procure o ícone de instalação (⊕) na barra de endereço
3. Clique em "Instalar"

## 🔧 Desenvolvimento

### Arquivos PWA
- `vite.config.ts` - Configuração PWA com vite-plugin-pwa
- `src/main.tsx` - Registro do Service Worker
- `public/pwa-*.png` - Ícones do aplicativo
- `manifest.webmanifest` - Gerado automaticamente no build

### Testar PWA Localmente
```bash
npm run build
npm run preview
```

Acesse via HTTPS ou localhost para testar recursos PWA.

## 📊 Lighthouse Score
O aplicativo está otimizado para:
- ✅ Performance
- ✅ Acessibilidade  
- ✅ Best Practices
- ✅ PWA Score

## 🔄 Atualizações
O Service Worker verifica automaticamente por atualizações:
- Usuário é notificado quando nova versão está disponível
- Pode atualizar imediatamente ou continuar usando versão atual
- Cache é atualizado em background

## 📱 Compatibilidade
- ✅ Android (Chrome, Samsung Internet, Edge)
- ✅ iOS/iPadOS 16.4+ (Safari)
- ✅ Desktop (Chrome, Edge, Brave, Opera)
- ⚠️ Firefox (suporte limitado a instalação)

## 🎯 Benefícios
- ⚡ Carregamento instantâneo após instalação
- 📴 Funciona offline
- 🔋 Economia de dados móveis
- 🎨 Experiência de app nativo
- 📲 Acesso rápido via ícone

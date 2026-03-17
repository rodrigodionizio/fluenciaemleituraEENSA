# 💣 Explosão de Leitura - EENSA

<div align="center">

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Uma aplicação lúdica e interativa para desenvolver a fluência em leitura**

🏫 Escola Estadual Nossa Senhora Aparecida - Mendes Pimentel/MG

</div>

---

## 📚 Sobre o Projeto

O **Explosão de Leitura** é uma ferramenta educacional digital desenvolvida para auxiliar professores no trabalho com fluência de leitura de forma **lúdica** e **engajadora**. A aplicação transforma o desafio de leitura em uma experiência gamificada, onde os alunos "desarmam uma bomba" através da leitura fluente de textos.

### 🎯 Objetivo Pedagógico

A fluência em leitura é uma habilidade fundamental no processo de alfabetização e letramento. Esta aplicação busca:

- ✅ **Motivar** os alunos através de elementos visuais e sonoros atrativos
- ⏱️ **Desenvolver** a velocidade e precisão da leitura
- 🎮 **Gamificar** o processo de aprendizagem
- 📊 **Auxiliar** professores no acompanhamento do progresso dos alunos
- 🌟 **Celebrar** as conquistas com feedback positivo imediato

### 🎓 Justificativa

A fluência em leitura é um dos pilares da compreensão textual. Estudos mostram que alunos com boa fluência conseguem dedicar mais recursos cognitivos à compreensão do conteúdo, ao invés de se preocuparem com a decodificação das palavras. Este projeto nasce da necessidade de:

1. **Tornar o treino de leitura mais atraente** para os estudantes da era digital
2. **Fornecer feedback imediato** sobre o desempenho do aluno
3. **Criar um ambiente** de baixa pressão que encoraje a prática constante
4. **Facilitar o trabalho docente** com uma ferramenta prática e intuitiva

---

## 🎮 Funcionalidades

### Para Professores
- ⚙️ **Configuração Flexível**: Ajuste o tempo de leitura de 10 segundos até 5 minutos
- 🎨 **Interface Intuitiva**: Design limpo e adaptado à identidade visual da EENSA
- 🔊 **Controle de Som**: Ative ou desative os efeitos sonoros conforme necessário
- 📱 **Responsivo**: Funciona em computadores, tablets e smartphones

### Para Alunos
- 💣 **Cronômetro Visual**: Uma bomba animada que torna o tempo visível e emocionante
- 🎉 **Celebração de Conquistas**: Confetes e animações ao completar a leitura
- 🎵 **Feedback Sonoro**: Sons que auxiliam na percepção do tempo
- ❤️ **Design Acolhedor**: Cores e elementos que criam um ambiente positivo

---

## 🛠️ Tecnologias Utilizadas

### Core
- **[React](https://react.dev/)** `v19.0.0` - Biblioteca JavaScript para construção da interface
- **[TypeScript](https://www.typescriptlang.org/)** `v5.8.2` - Superset tipado de JavaScript
- **[Vite](https://vitejs.dev/)** `v6.2.0` - Build tool moderna e rápida

### UI/UX
- **[Tailwind CSS](https://tailwindcss.com/)** `v4.1.14` - Framework CSS utilitário
- **[Motion](https://motion.dev/)** `v12.23.24` - Biblioteca de animações (Framer Motion fork)
- **[Lucide React](https://lucide.dev/)** `v0.546.0` - Ícones modernos e personalizáveis
- **[Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)** `v1.9.4` - Efeitos de celebração

### Desenvolvimento
- **Web Audio API** - Para geração de efeitos sonoros dinâmicos
- **Express** `v4.21.2` - Servidor HTTP para produção
- **dotenv** `v17.2.3` - Gerenciamento de variáveis de ambiente

---

## 🚀 Como Executar

### Pré-requisitos
- **Node.js** versão 18 ou superior
- **npm** ou **yarn**

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/rodrigodionizio/fluenciaemleituraEENSA.git
cd fluenciaemleituraEENSA
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo de desenvolvimento**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`

### Pré-visualizar Build

```bash
npm run preview
```

---

## 📖 Como Usar

### Para o Professor

1. **Configure o Tempo**: Use os botões **+** e **-** ou o controle deslizante para definir o tempo de leitura adequado ao nível da turma
2. **Prepare o Material**: Selecione o texto que será lido pelo aluno
3. **Inicie o Desafio**: Clique em **"INICIAR LEITURA"**
4. **Acompanhe**: Observe o aluno realizar a leitura enquanto o cronômetro visual conta o tempo
5. **Finalize**: Quando o aluno terminar a leitura, clique em **"CONCLUÍDO!"**

### Estados da Aplicação

- **⚙️ Configuração**: Tela inicial para ajustar parâmetros
- **⏰ Em Andamento**: Cronômetro ativo com a bomba animada
- **✅ Sucesso**: Celebração quando o aluno completa a leitura a tempo
- **❌ Falha**: Feedback quando o tempo se esgota (sem punições, apenas reinício)

---

## 🎨 Paleta de Cores - Identidade EENSA

A aplicação utiliza as cores oficiais da Escola Estadual Nossa Senhora Aparecida:

| Cor | Hexadecimal | Uso |
|-----|-------------|-----|
| 🟢 Verde Escuro | `#004d1a` | Cor primária, textos principais |
| 🌿 Verde Accent | `#4CAF50` | Botões de ação, destaques |
| 🔵 Turquesa | `#00838F` | Elementos secundários |
| 🟡 Amarelo | `#FFC107` | Spark da bomba, celebrações |
| 🟠 Laranja | `#E64A19` | Alertas suaves, animações |
| 🔴 Vermelho | `#d32f2f` | Estados críticos (últimos segundos) |

---

## 📂 Estrutura do Projeto

```
fluenciaemleituraEENSA/
├── src/
│   ├── App.tsx           # Componente principal da aplicação
│   ├── main.tsx          # Entry point do React
│   └── index.css         # Estilos globais
├── index.html            # Template HTML
├── package.json          # Dependências e scripts
├── tsconfig.json         # Configuração TypeScript
├── vite.config.ts        # Configuração Vite
├── .gitignore           # Arquivos ignorados pelo Git
├── .env.example         # Exemplo de variáveis de ambiente
└── README.md            # Este arquivo
```

---

## 🎓 Metodologia de Uso em Sala

### Sugestões de Aplicação

1. **Diagnóstico Inicial**: Use 60 segundos como base para avaliar o nível de cada aluno
2. **Progressão Gradual**: Aumente gradualmente o desafio reduzindo o tempo conforme os alunos evoluem
3. **Trabalho em Duplas**: Um aluno lê enquanto outro acompanha e apoia
4. **Registro de Progresso**: Anote os tempos e sucessos para acompanhamento longitudinal
5. **Variedade de Textos**: Alterne entre diferentes gêneros textuais para ampliar repertório

### Recomendações Pedagógicas

- ⏱️ **Meta Ideal**: 5 minutos é um bom objetivo para textos de complexidade média
- 📝 **Textos Adequados**: Escolha textos compatíveis com o nível de leitura da turma
- 🎯 **Foco na Fluência**: Priorize velocidade + precisão + prosódia
- 💬 **Feedback Construtivo**: Use os resultados para orientar, não punir
- 🔄 **Prática Regular**: A consistência é mais importante que sessões longas esporádicas

---

## 🤝 Contribuições

Contribuições são bem-vindas! Se você é educador e tem sugestões de melhorias, ou se é desenvolvedor e quer colaborar:

1. Faça um **Fork** do projeto
2. Crie uma **Branch** para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. **Push** para a Branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

---

## 📜 Licença

Este projeto está sob a licença **Apache 2.0**. Veja o arquivo LICENSE para mais detalhes.

---

## 👨‍💻 Créditos

### Desenvolvimento e Publicação

**Professor Rodrigo Dionízio**  
🎓 Analista Desenvolvedor e Professor de Tecnologia  
📧 Contato: [GitHub](https://github.com/rodrigodionizio)

### Instituição

**Escola Estadual Nossa Senhora Aparecida**  
📍 Mendes Pimentel - Minas Gerais  
🎯 Compromisso com a educação de qualidade

---

## 🌟 Agradecimentos

Este projeto é dedicado a todos os educadores que acreditam no poder transformador da leitura e trabalham diariamente para formar leitores fluentes e críticos. 

**"A leitura é a chave que abre as portas do conhecimento."**

---

<div align="center">

Desenvolvido com ❤️ para a educação brasileira

**#FluênciaEmLeitura #EducaçãoDigital #EENSA #MendesPimentel**

</div>

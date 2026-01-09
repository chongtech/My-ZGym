# Sistema de Validação de Conflitos de Horário

## Visão Geral

Este documento descreve o sistema de validação implementado para evitar conflitos de horários ao agendar ou atualizar aulas no My-ZGym.

## Funcionalidade

Quando um gestor atualiza uma aula para outro dia e horário, o sistema automaticamente verifica se:
1. **Mesma sala** - A sala onde a aula será realizada
2. **Mesmo dia da semana** - Segunda-feira, Terça-feira, etc.
3. **Mesmo horário** - Se os horários se sobrepõem (considerando início + duração)

Se já existir uma aula nessas condições, o sistema **bloqueará** a atualização e mostrará uma mensagem de erro detalhada.

## Arquivos Implementados

### 1. Modelo de Dados: `client/data/mockData.ts`

Foi adicionado o campo `room` à interface `GymClass`:

```typescript
export interface GymClass {
  // ... outros campos
  dayOfWeek?: string;
  room?: string; // Sala onde a aula acontece
}
```

### 2. Utilitário de Validação: `client/utils/scheduleValidation.ts`

Contém as funções de validação:

#### `checkScheduleConflict()`
Função principal que verifica conflitos:
- Recebe: lista de aulas, nova aula, ID da aula a excluir (opcional)
- Retorna: objeto com `hasConflict`, `conflictingClass` e `message`

#### `timeRangesOverlap()`
Verifica se dois intervalos de tempo se sobrepõem:
```typescript
// Exemplo:
// Aula A: 10:00 - 11:00
// Aula B: 10:30 - 11:30
// Resultado: true (conflito)
```

#### Funções auxiliares:
- `dayOfWeekToIndex()` - Converte dia em português para índice (0-6)
- `timeToMinutes()` - Converte "HH:mm" em minutos desde meia-noite
- `formatMinutesToTime()` - Converte minutos de volta para "HH:mm"
- `isValidTimeFormat()` - Valida formato "HH:mm"

### 3. Tela de Edição: `client/screens/manager/EditClassScreen.tsx`

#### Novo campo: Seleção de Sala
Foi adicionado um seletor de sala com chips clicáveis:
- Lista de salas: "Sala 1", "Sala 2", "Sala 3", "Sala Principal", "Estúdio de Yoga", "Área Funcional"
- Campo obrigatório (*)
- Ícone de mapa para indicar localização

#### Validações no `handleSave()`:

1. **Campos obrigatórios** - Verifica se todos os campos estão preenchidos
2. **Formato de horário** - Valida formato HH:mm
3. **Duração válida** - Verifica se é número positivo
4. **Conflito de horário** - Chama `checkScheduleConflict()` antes de salvar

## Fluxo de Validação

```
Usuário preenche formulário de atualização
           ↓
Clica em "Salvar Alterações"
           ↓
Validação de campos obrigatórios
           ↓
Validação de formato de horário
           ↓
Validação de duração
           ↓
[VALIDAÇÃO DE CONFLITO] ← NOVA FUNCIONALIDADE
           ↓
   ┌─────┴─────┐
   │           │
Conflito?    Sem conflito
   │           │
   ↓           ↓
Alerta     Sucesso
de erro    e volta

```

## Exemplos de Uso

### Cenário 1: Conflito Detectado

**Aula existente:**
- Nome: Pilates
- Dia: Terça-feira
- Horário: 10:00
- Duração: 45 minutos (10:00 - 10:45)
- Sala: Sala 1

**Tentativa de atualização:**
- Nome: Yoga
- Dia: Terça-feira
- Horário: 10:30
- Duração: 60 minutos (10:30 - 11:30)
- Sala: Sala 1

**Resultado:**
```
❌ BLOQUEADO
Mensagem: "Conflito detectado: A sala "Sala 1" já está ocupada
Terça-feira das 10:00 às 10:45 com a aula "Pilates" (Inês Oliveira)."
```

### Cenário 2: Sem Conflito (Sala Diferente)

**Aula existente:**
- Dia: Terça-feira, 10:00 - 10:45, Sala 1

**Nova aula:**
- Dia: Terça-feira, 10:30 - 11:30, **Sala 2** ← Sala diferente

**Resultado:**
```
✅ PERMITIDO
Os horários se sobrepõem, mas são em salas diferentes.
```

### Cenário 3: Sem Conflito (Dia Diferente)

**Aula existente:**
- Dia: Terça-feira, 10:00 - 10:45, Sala 1

**Nova aula:**
- Dia: **Quarta-feira**, 10:00 - 10:45, Sala 1 ← Dia diferente

**Resultado:**
```
✅ PERMITIDO
Mesma sala e horário, mas em dias diferentes.
```

### Cenário 4: Sem Conflito (Horários Consecutivos)

**Aula existente:**
- Dia: Terça-feira, 10:00 - 10:45, Sala 1

**Nova aula:**
- Dia: Terça-feira, 10:45 - 11:30, Sala 1 ← Começa exatamente quando a outra termina

**Resultado:**
```
✅ PERMITIDO
Os horários não se sobrepõem (são consecutivos).
```

## Lógica de Sobreposição de Horários

A função `timeRangesOverlap()` usa a seguinte lógica:

```typescript
// Dois intervalos se sobrepõem se:
start1 < end2 && end1 > start2

// Exemplos:
// [10:00 - 11:00] vs [10:30 - 11:30] → 10:00 < 11:30 && 11:00 > 10:30 → true (sobrepõe)
// [10:00 - 10:45] vs [10:45 - 11:30] → 10:00 < 11:30 && 10:45 > 10:45 → false (não sobrepõe)
// [10:00 - 11:00] vs [09:00 - 12:00] → 10:00 < 12:00 && 11:00 > 09:00 → true (sobrepõe)
```

## Interface do Usuário

### EditClassScreen - Campo de Sala

O campo de seleção de sala foi adicionado após o campo de instrutor:

- **Tipo**: Chips clicáveis (similar aos outros seletores)
- **Ícone**: Pin de mapa (`map-pin`)
- **Cor selecionado**: Amarelo primário (#FFD700)
- **Obrigatório**: Sim (marcado com *)

### Mensagens de Erro

#### Sala não selecionada:
```
"Erro"
"Por favor, preencha todos os campos obrigatórios."
```

#### Formato de horário inválido:
```
"Erro"
"Formato de horário inválido. Use o formato HH:mm (ex: 09:00)."
```

#### Conflito de horário:
```
"Conflito de Horário"
"Conflito detectado: A sala "Sala 1" já está ocupada Segunda-feira
das 10:00 às 10:45 com a aula "Pilates" (Inês Oliveira)."
```

### Mensagem de Sucesso

Quando a atualização é bem-sucedida:
```
"Sucesso"
"A aula "Yoga" foi atualizada com sucesso!

Dia: Segunda-feira
Horário: 10:00
Sala: Estúdio de Yoga"
```

## Dados de Teste

Foram adicionadas salas de exemplo aos primeiros registros do `mockClasses`:

| ID | Aula | Dia | Horário | Sala |
|----|------|-----|---------|------|
| 1 | Yoga | Segunda-feira | 10:00 | Estúdio de Yoga |
| 2 | Pilates | Terça-feira | 10:00 | Sala 1 |
| 3 | Pilates | Quinta-feira | 10:00 | Sala 1 |
| 4 | Pilates | Sábado | 10:40 | Sala 1 |
| 5 | Pilates | Segunda-feira | 18:30 | Sala 2 |
| 6 | Pilates | Quarta-feira | 18:30 | Sala 2 |

## Teste Manual

### Teste 1: Detectar Conflito
1. Ir para Manager → Horários → Pilates (ID 2)
2. Tentar alterar para:
   - Dia: Terça-feira (manter)
   - Horário: 10:20 (sobrepõe com 10:00)
   - Sala: Sala 1 (manter)
3. Resultado esperado: ❌ Mensagem de conflito

### Teste 2: Permitir Sala Diferente
1. Ir para Manager → Horários → Pilates (ID 2)
2. Alterar para:
   - Dia: Terça-feira (manter)
   - Horário: 10:20 (sobrepõe)
   - Sala: **Sala 2** (mudar)
3. Resultado esperado: ✅ Sucesso

### Teste 3: Permitir Dia Diferente
1. Ir para Manager → Horários → Pilates (ID 2)
2. Alterar para:
   - Dia: **Segunda-feira** (mudar)
   - Horário: 10:00 (manter)
   - Sala: Sala 1 (manter)
3. Resultado esperado: ✅ Sucesso

## Melhorias Futuras

1. **Persistência**: Atualmente os dados só existem em memória (mockData). Implementar backend para salvar alterações.

2. **Validação de instrutor**: Verificar se o instrutor já tem aula no mesmo horário (em outra sala).

3. **Visualização gráfica**: Mostrar grade de horários com ocupação de salas.

4. **Conflitos parciais**: Sugerir horários alternativos próximos quando há conflito.

5. **Aulas recorrentes**: Suporte para aulas semanais e verificação de conflitos em múltiplas datas.

6. **Reserva de intervalo**: Adicionar tempo de limpeza/preparação entre aulas.

7. **API endpoints**: Criar endpoints REST para CRUD de agendamento:
   - `POST /api/classes` - Criar aula
   - `PUT /api/classes/:id` - Atualizar aula
   - `DELETE /api/classes/:id` - Remover aula
   - `GET /api/classes/conflicts` - Verificar conflitos

## Arquitetura

```
┌─────────────────────────────────────────┐
│     EditClassScreen.tsx                 │
│  (Interface do usuário)                 │
└─────────────┬───────────────────────────┘
              │
              │ handleSave()
              ↓
┌─────────────────────────────────────────┐
│   scheduleValidation.ts                 │
│   checkScheduleConflict()               │
│   - dayOfWeekToIndex()                  │
│   - timeToMinutes()                     │
│   - timeRangesOverlap()                 │
└─────────────┬───────────────────────────┘
              │
              │ Consulta
              ↓
┌─────────────────────────────────────────┐
│   mockData.ts (GymClass[])              │
│   Lista de todas as aulas               │
└─────────────────────────────────────────┘
```

## Conclusão

O sistema de validação de conflitos de horário está completamente implementado e funcional. Ele garante que:

✅ Nenhuma sala seja reservada duas vezes no mesmo dia/horário
✅ O usuário receba feedback claro sobre conflitos
✅ A validação ocorre antes de qualquer tentativa de salvamento
✅ A própria aula sendo editada é excluída da verificação

O código é modular, testável e pronto para integração com um backend real.

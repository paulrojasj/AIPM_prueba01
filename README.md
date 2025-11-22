# ConvertAI Demo - Optimización UX con IA

Demo funcional de ConvertAI basado en el PRD completo. Plataforma SaaS que democratiza el acceso a optimización profesional de UX para empresas en LATAM.

## 🚀 Deploy Rápido en Vercel (3 minutos)

### 1. Instalar y correr localmente

```bash
cd convertai-demo
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 2. Deploy en Vercel

```bash
# Instala Vercel CLI
npm install -g vercel

# Deploy
vercel
```

O usa el [dashboard de Vercel](https://vercel.com):
1. Conecta tu repositorio GitHub
2. Import proyecto
3. Deploy automático

## 🗄️ Setup Supabase (5 minutos)

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea nuevo proyecto
3. Guarda tu URL y ANON KEY

### 2. Ejecutar schema SQL

1. En Supabase Dashboard → SQL Editor
2. Copia y pega el contenido de `supabase-schema.sql`
3. Run SQL

### 3. Configurar variables de entorno

Crea `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

En Vercel → Settings → Environment Variables → Agregar las mismas variables

### 4. Conectar Supabase al código (opcional)

Crea `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

Actualiza `app/api/audit/route.ts` para guardar en Supabase:

```typescript
import { supabase } from '@/lib/supabase';

// Después de generar result:
const { data, error } = await supabase
  .from('audits')
  .insert([{
    url: result.url,
    email: result.email,
    score: result.score,
    category_scores: result.categoryScores,
    issues: result.issues,
    projected_lift: result.projectedLift,
    additional_revenue: result.additionalRevenue,
  }]);
```

## 📋 Funcionalidades Demo

### ✅ Implementado
- **Landing page** responsive con gradientes modernos
- **Formulario de auditoría gratuita** (URL + Email)
- **Dashboard de resultados** con:
  - Score de usabilidad (0-100)
  - Scores por categoría (navegación, checkout, mobile, velocidad)
  - Top 5 problemas críticos priorizados
  - Proyección de impacto en conversión
  - Cálculo de revenue adicional
- **API route** simulando análisis con IA
- **Schema de Supabase** listo para usar

### 🔜 Para versión real (según PRD)
- Integración con OpenAI GPT-4 para análisis real
- Web crawler con Playwright
- Generador de prototipos con IA
- A/B testing integrado
- Autenticación de usuarios
- Planes de pricing (Starter/Growth/Enterprise)
- White-label para agencias

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 + React + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **AI** (futuro): OpenAI GPT-4 Vision

## 📊 Arquitectura según PRD

Este demo implementa la **Fase MVP** del PRD:
- ✅ Módulo de Auditoría Automatizada (simplificado)
- ✅ Dashboard de Insights
- ⏳ Generador de Prototipos con IA (próximo)
- ⏳ Calculadora de ROI (básico implementado)

## 🎯 Próximos Pasos

1. **Conectar a Supabase** para persistencia real
2. **Integrar OpenAI API** para análisis real de UX
3. **Agregar autenticación** con Supabase Auth
4. **Implementar crawler** con Playwright
5. **Dashboard de usuario** para ver historial de auditorías

## 📈 Métricas Objetivo (según PRD)

- **Año 1**: 200 clientes, $1.68M ARR
- **NPS**: >50
- **Churn mensual**: <5%
- **Mejora promedio conversión**: +30-50%

## 📝 Notas

- Actualmente usa **datos mock** para demostración rápida
- El análisis UX es simulado - en producción usaría GPT-4 Vision
- Score y problemas son generados aleatoriamente
- Diseñado para ser escalable según arquitectura del PRD

## 🔗 Links Útiles

- [PRD Completo](../PRD-ConvertAI.md)
- [Vercel Docs](https://nextjs.org/docs/deployment)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

---

**Tiempo de implementación**: ~10 minutos
**Tiempo total con Supabase**: ~15 minutos
**Listo para producción**: Falta integración con IA real y autenticación

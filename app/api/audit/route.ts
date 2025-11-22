import { NextResponse } from 'next/server';

// Simulador de análisis UX con IA (en producción usarías OpenAI GPT-4)
export async function POST(request: Request) {
  try {
    const { url, email } = await request.json();

    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generar score aleatorio pero realista
    const score = Math.floor(Math.random() * 30) + 45; // 45-75

    // Mock data de auditoría
    const result = {
      id: `audit_${Date.now()}`,
      url,
      email,
      score,
      categoryScores: {
        navegación: Math.floor(Math.random() * 30) + 50,
        checkout: Math.floor(Math.random() * 30) + 40,
        mobile: Math.floor(Math.random() * 30) + 55,
        velocidad: Math.floor(Math.random() * 30) + 60,
      },
      issues: [
        {
          title: "Proceso de checkout con demasiados pasos",
          description: "Se detectaron 8 pasos en el proceso de compra. El estándar recomendado es 3-4 pasos.",
          impact: 15,
          effort: "Medio",
          category: "Checkout"
        },
        {
          title: "CTAs principales poco visibles",
          description: "Los botones de acción primaria no tienen suficiente contraste (ratio 2.3:1 vs 4.5:1 recomendado).",
          impact: 12,
          effort: "Bajo",
          category: "Diseño"
        },
        {
          title: "Formularios sin validación en tiempo real",
          description: "Los usuarios descubren errores solo al enviar, causando frustración.",
          impact: 10,
          effort: "Bajo",
          category: "Formularios"
        },
        {
          title: "Navegación móvil confusa",
          description: "El menú hamburguesa requiere 3 taps para acceder a categorías principales.",
          impact: 18,
          effort: "Alto",
          category: "Mobile"
        },
        {
          title: "Tiempo de carga >3 segundos",
          description: "La página principal tarda 4.2 segundos en cargar, 53% de usuarios abandonan después de 3s.",
          impact: 20,
          effort: "Medio",
          category: "Performance"
        },
        {
          title: "Búsqueda sin autocompletar",
          description: "Falta funcionalidad de autocompletado que ayude a usuarios a encontrar productos.",
          impact: 8,
          effort: "Medio",
          category: "Navegación"
        },
        {
          title: "Falta de trust signals en checkout",
          description: "No hay badges de seguridad ni garantías visibles en el proceso de pago.",
          impact: 14,
          effort: "Bajo",
          category: "Confianza"
        },
      ],
      projectedLift: 35,
      additionalRevenue: 125000,
      createdAt: new Date().toISOString(),
    };

    // En producción, aquí guardarías en Supabase:
    // const { data, error } = await supabase.from('audits').insert([result]);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing audit:', error);
    return NextResponse.json(
      { error: 'Error al procesar la auditoría' },
      { status: 500 }
    );
  }
}

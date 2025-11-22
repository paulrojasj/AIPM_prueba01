'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la auditoría');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-indigo-600">ConvertAI</h1>
          <p className="text-gray-600 text-sm">Optimización UX con Inteligencia Artificial</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {!result ? (
          <div className="max-w-3xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
                Duplica tu tasa de conversión
              </h2>
              <p className="text-xl text-gray-600 mb-2">
                Análisis profesional de UX con IA en <span className="font-bold text-indigo-600">24 horas</span>
              </p>
              <p className="text-lg text-gray-500">
                90% más económico que agencias tradicionales
              </p>
            </div>

            {/* Free Audit Form */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="mb-6">
                <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  Auditoría Gratuita
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Obtén tu análisis UX gratis
                </h3>
                <p className="text-gray-600">
                  Descubre por qué pierdes hasta 70% de tus visitantes
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                    URL de tu sitio web
                  </label>
                  <input
                    type="url"
                    id="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://tusitio.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Analizando...' : 'Obtener Auditoría Gratuita →'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Sin tarjeta de crédito • Resultados en 24 horas
                </p>
              </form>
            </div>

            {/* Features */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Score 0-100</h4>
                <p className="text-gray-600 text-sm">Evaluación objetiva de tu UX</p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔍</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Top 10 Problemas</h4>
                <p className="text-gray-600 text-sm">Priorizados por impacto en ventas</p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💰</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">ROI Calculado</h4>
                <p className="text-gray-600 text-sm">Impacto en revenue proyectado</p>
              </div>
            </div>
          </div>
        ) : (
          /* Results Dashboard */
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setResult(null)}
              className="mb-6 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              ← Nueva auditoría
            </button>

            {/* Score Card */}
            <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Resultados de Auditoría UX</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-gray-600 mb-2">Sitio analizado:</p>
                  <p className="font-bold text-lg">{result.url}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 mb-2">Score de Usabilidad</p>
                  <div className={`text-5xl font-bold ${
                    result.score >= 75 ? 'text-green-600' :
                    result.score >= 50 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {result.score}/100
                  </div>
                </div>
              </div>

              {/* Category Scores */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.entries(result.categoryScores).map(([category, score]: [string, any]) => (
                  <div key={category} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1 capitalize">{category}</p>
                    <p className="text-2xl font-bold text-gray-900">{score}</p>
                  </div>
                ))}
              </div>

              {/* Top Issues */}
              <div>
                <h3 className="text-xl font-bold mb-4">Top 5 Problemas Críticos</h3>
                <div className="space-y-4">
                  {result.issues.slice(0, 5).map((issue: any, idx: number) => (
                    <div key={idx} className="border-l-4 border-red-500 pl-4 py-2">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900">{issue.title}</h4>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                          -{issue.impact}% conversión
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{issue.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Esfuerzo: {issue.effort}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROI Projection */}
              <div className="mt-8 bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Impacto Potencial</h3>
                <p className="text-3xl font-bold text-indigo-600 mb-2">
                  +{result.projectedLift}% en conversión
                </p>
                <p className="text-gray-600">
                  Implementando las 5 mejoras prioritarias podrías generar{' '}
                  <span className="font-bold">${result.additionalRevenue.toLocaleString()}/año</span> adicionales
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                ¿Listo para implementar estas mejoras?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Planes desde $299/mes • Prototipos optimizados con IA • A/B testing incluido
              </p>
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                Ver Planes
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>© 2024 ConvertAI - Optimización UX con IA para LATAM</p>
        </div>
      </footer>
    </div>
  );
}

-- ConvertAI Supabase Schema
-- Ejecutar este SQL en tu proyecto de Supabase

-- Tabla de auditorías
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  email TEXT NOT NULL,
  score INTEGER NOT NULL,
  category_scores JSONB NOT NULL,
  issues JSONB NOT NULL,
  projected_lift INTEGER,
  additional_revenue INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de usuarios (opcional para futuro)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  plan TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX idx_audits_email ON audits(email);
CREATE INDEX idx_audits_created_at ON audits(created_at DESC);
CREATE INDEX idx_users_email ON users(email);

-- Row Level Security (RLS)
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios pueden ver sus propias auditorías
CREATE POLICY "Users can view their own audits"
  ON audits
  FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

-- Política: Permitir INSERT para todos (auditorías gratuitas)
CREATE POLICY "Anyone can create audits"
  ON audits
  FOR INSERT
  WITH CHECK (true);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para audits
CREATE TRIGGER update_audits_updated_at
  BEFORE UPDATE ON audits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

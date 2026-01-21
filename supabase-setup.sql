-- =====================================================
-- Juventudes con Iván - Database Setup
-- =====================================================
-- Ejecuta este script en el SQL Editor de Supabase
-- Dashboard > SQL Editor > New Query > Pegar y ejecutar
-- =====================================================

-- Tabla principal de registros
CREATE TABLE IF NOT EXISTS juventudesivan_registros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombres TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefono TEXT NOT NULL,
  localidad TEXT NOT NULL,
  organizacion TEXT,
  profesion TEXT,
  genero TEXT NOT NULL CHECK (genero IN ('femenino', 'masculino', 'no_binario')),
  edad INTEGER NOT NULL CHECK (edad > 0 AND edad < 150),
  perfil TEXT NOT NULL CHECK (perfil IN ('expedicionario', 'analista', 'inmunologo')),
  acepta_politica BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de redes sociales (relación 1:N)
CREATE TABLE IF NOT EXISTS juventudesivan_redes_sociales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registro_id UUID NOT NULL REFERENCES juventudesivan_registros(id) ON DELETE CASCADE,
  red_social TEXT NOT NULL CHECK (red_social IN ('facebook', 'instagram', 'twitter', 'tiktok', 'linkedin', 'youtube')),
  valor TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_juventudesivan_registros_email ON juventudesivan_registros(email);
CREATE INDEX IF NOT EXISTS idx_juventudesivan_redes_registro ON juventudesivan_redes_sociales(registro_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE juventudesivan_registros ENABLE ROW LEVEL SECURITY;
ALTER TABLE juventudesivan_redes_sociales ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad: permitir INSERT público (anon)
-- DROP las políticas existentes si ya existen
DROP POLICY IF EXISTS "Permitir registro público" ON juventudesivan_registros;
DROP POLICY IF EXISTS "Permitir insertar redes sociales" ON juventudesivan_redes_sociales;

-- Crear las políticas
CREATE POLICY "Permitir registro público" ON juventudesivan_registros
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Permitir insertar redes sociales" ON juventudesivan_redes_sociales
  FOR INSERT TO anon WITH CHECK (true);

-- =====================================================
-- ¡Listo! Las tablas han sido creadas correctamente.
-- =====================================================

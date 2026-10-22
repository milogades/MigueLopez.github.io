-- Tabla de reservas para Puerta del Edén.
-- Pégalo entero en Supabase → SQL Editor → New query → Run.

create table if not exists public.reservas (
  id        uuid primary key default gen_random_uuid(),
  creada    timestamptz not null default now(),
  nombre    text not null check (char_length(nombre) between 2 and 80),
  telefono  text not null check (telefono ~ '^\+?[0-9]{9,15}$'),
  personas  text not null check (char_length(personas) between 1 and 12),
  fecha     date not null,
  hora      text not null check (hora ~ '^[0-9]{2}:[0-9]{2}$'),
  nota      text check (char_length(nota) <= 500),
  estado    text not null default 'pendiente' check (estado in ('pendiente', 'confirmada', 'rechazada'))
);

create index if not exists reservas_fecha_idx on public.reservas (fecha, hora);

-- Seguridad: activar RLS (sin políticas, nadie puede hacer nada)
alter table public.reservas enable row level security;

-- La web pública (anon) SOLO puede crear reservas pendientes de hoy en adelante.
-- No puede leer, cambiar ni borrar reservas.
drop policy if exists "web crea reservas" on public.reservas;
create policy "web crea reservas" on public.reservas
  for insert to anon
  with check (estado = 'pendiente' and fecha >= current_date and fecha <= current_date + 90);

-- El restaurante (usuario con login) puede ver y cambiar el estado.
drop policy if exists "restaurante lee" on public.reservas;
create policy "restaurante lee" on public.reservas
  for select to authenticated using (true);

drop policy if exists "restaurante actualiza" on public.reservas;
create policy "restaurante actualiza" on public.reservas
  for update to authenticated using (true) with check (true);

grant insert on public.reservas to anon;
grant select, update on public.reservas to authenticated;

-- Avisos en tiempo real en el panel cuando entra una reserva
alter publication supabase_realtime add table public.reservas;
